import { Directive, HostListener, Input, Output, EventEmitter, Inject, ElementRef} from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import * as XLSX from 'xlsx';
import {MatDialog} from '@angular/material/dialog';
import { MappingComponent } from '../mapping/mapping.component';
import {ErrormessageComponent} from '../errormessage/errormessage.component';


@Directive({
  selector: '[appReadexcel]',
  exportAs : 'readexcel' ,
})
 
export class ReadexcelDirective {
  excelObservable: Observable<any>;
  @Output() eventEmitter = new EventEmitter();
 @Input('appReadexcel') name : string;
 @Input() headArr : {};
 public keys;
 public headerarrayobject = {};
 constructor(private elementRef: ElementRef, public dialog :MatDialog) {
 }

 ngOnInit() {
  console.log("headArr", this.headArr);
}

openDialog(data) 
{
  if(Object.keys(this.headArr).length==data.tableData[0].length && data.tableData.length<100)
  {
  let dialogRef = this.dialog.open( MappingComponent,{
    width: '1000px',
    height:'600px',
   panelClass: 'custom-dialog-container',
    data: data
});
  }
  else if(Object.keys(this.headArr).length!=data.tableData[0].length)
  {
    var etitle="Header mismatch!";
  var emsg="The number of fields in the file are not equal to the number of given headers. Click on the informative icon to know the instructions on uploading a file.";
  let dialogRef= this.dialog.open(ErrormessageComponent,{
    data: {error: emsg,
    etitle: etitle} 
  });
  }
  else
  {
    var etitle = "Rows Exceeding limit";
    var emsg = "The file contains more than 100 rows";
    let dialogRef= this.dialog.open(ErrormessageComponent,{
      data: {error: emsg,
      etitle: etitle} 
    });
  }
 }


  @HostListener('change', ['$event.target'])
  onChange(target: HTMLInputElement) {
    const file = target.files[0];
    this.excelObservable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });

    this.excelObservable.subscribe((d) => {
      this.eventEmitter.emit(d);
    });
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const fileReader = new FileReader();
    var Ext= file.name.split('.')[1]; 
    //read a .csv file
    if( Ext == "csv")
    {
    fileReader.readAsText(file);
    fileReader.onload = (e) => {
    const bufferArray = e.target.result;
     
    const wb: XLSX.WorkBook = XLSX.read(bufferArray, { type: 'binary',cellDates:true, dateNF:'DD-MM-YYYY'});
    const wsname: string = wb.SheetNames[0];

    const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    const data = XLSX.utils.sheet_to_json(ws, {raw:false});
    
    
    let arr= new Set()
    data.map(d=>{
      Object.keys(d).map(key =>{
        arr.add(key)
      })
    })
    let Arr= [...arr]

    data.map(d=>{
      Arr.map(key=>{
        if(!d.hasOwnProperty(`${key}`)){
          d[`${key}`]=""
        }
      })
    })

//converts the array of objects into array of array
    var output = data.map(function(obj) {
      let arr=[]
      Arr.map(key=>{
        let isnum = /^\d+$/.test(obj[`${key}`]);
        if(isnum)
        {
          obj[`${key}`]=parseInt(obj[`${key}`])
        }
        arr.push(obj[`${key}`])
      })
      return arr
    });
   

    this.keys = Object.keys(data[0]);
    output.unshift(this.keys);
    
//console.log("data",output);
    subscriber.next(output);
    subscriber.complete();

    //columns array
    let columns =[]; 
    for(let i=1;i<=Object.keys(this.headArr).length;i++)
    {
     columns.push(`col${i}`);
    }
  

    //header arraay
    let headerArray=[];
    for(let i=0; i<Object.keys(this.headArr).length;i++ )
    {
      headerArray.push(this.headArr[i].hname);
    }
    this.openDialog({tableData: output, headers : headerArray , columns : columns, headArr: this.headArr});
    
  };
}
//read an .xlsx file 
    else if(Ext=="xlsx")
    {
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
    
       const wb: XLSX.WorkBook = XLSX.read(bufferArray, { type: 'buffer', cellDates:true, dateNF:'dd/mm/yyyy'});

      const wsname: string = wb.SheetNames[0];

      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws, {raw:false});
      let arr= new Set()
      data.map(d=>{
        Object.keys(d).map(key =>{
          arr.add(key)
        })
      })
      let Arr= [...arr]
  
      data.map(d=>{
        Arr.map(key=>{
          if(!d.hasOwnProperty(`${key}`)){
            d[`${key}`]=""
          }
        })
      })

  //convert the array of objects to array of array
      var output = data.map(function(obj) {
        let arr=[]
        Arr.map(key=>{
          let isnum = /^\d+$/.test(obj[`${key}`]);
        if(isnum)
        {
          obj[`${key}`]=parseInt(obj[`${key}`])
        }
          arr.push(obj[`${key}`])
        })
        return arr
      });
      
     var keys = Object.keys(data[0]);
      output.unshift(keys);

//console.log("data",output);
      subscriber.next(output);
      subscriber.complete();

      //columns array
      let columns=[];
      for(let i=1;i<=Object.keys(this.headArr).length;i++)
      {
       columns.push(`col${i}`);
      }
      

      //header array
      let headerArray=[];
      for(let i=0; i<Object.keys(this.headArr).length;i++ )
      {
        headerArray.push(this.headArr[i].hname);
      }
     
          this.openDialog({tableData: output, headers : headerArray , columns : columns, headArr: this.headArr});
      
    };
  }
  else
  {
    var etitle="File-type mismatch";
      var emsg="The uploaded file is not in the csv or excel format";
      let dialogRef= this.dialog.open(ErrormessageComponent,{
        data: {error: emsg,
        etitle: etitle} 
  });
}

}
}

   
