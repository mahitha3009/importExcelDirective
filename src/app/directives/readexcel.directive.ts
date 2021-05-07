import { Directive, HostListener, Input, Output, EventEmitter, Inject, ElementRef} from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import * as XLSX from 'xlsx';
import {MatDialog} from '@angular/material/dialog';
import { MappingComponent } from '../mapping/mapping.component';


@Directive({
  selector: '[appReadexcel]',
  exportAs : 'readexcel' ,
})
 
export class ReadexcelDirective {
  excelObservable: Observable<any>;
  @Output() eventEmitter = new EventEmitter();
 @Input('appReadexcel') name : string;
 @Input() headArr : {};
 public columns=[];
 public keys;
 public headerArray = [];
 public headerarrayobject = {};
 constructor(private elementRef: ElementRef, public dialog :MatDialog) {}

 ngOnInit() {
  console.log("headArr", this.headArr);
}

openDialog(data) 
{

  if(Object.keys(this.headArr).length==data.tableData[0].length)
  {
  let dialogRef = this.dialog.open( MappingComponent,{
    width: '1000px',
    height:'600px',
   panelClass: 'custom-dialog-container',
    data: data
});
  dialogRef.afterClosed().subscribe(result =>
    {
      // console.log(`Dialog result: ${result}`);
    });
  }
  else
  {
  console.log('error msg'); 
  alert('The number of fields in the file are not equal to the given number of headers');
  }
 }


  @HostListener('change', ['$event.target'])
  onChange(target: HTMLInputElement) {
   console.log(this.headArr);
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
    console.log(Ext);
    if( Ext == "csv")
    {
    fileReader.readAsText(file);
    fileReader.onload = (e) => {
    const bufferArray = e.target.result;
     
    const wb: XLSX.WorkBook = XLSX.read(bufferArray, { type: 'string' });
    const wsname: string = wb.SheetNames[0];

    const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    const data = XLSX.utils.sheet_to_json(ws);
    
    var output = data.map(function(obj) {
      return Object.keys(obj).map(function(key) { 
        return obj[key];
      });
    });
    
 
    this.keys = Object.keys(data[0]);
    output.unshift(this.keys);
    
    console.log("headers",this.keys);
    
console.log("data",output);
    subscriber.next(output);
    subscriber.complete();

    //columns array 
    for(let i=1;i<=Object.keys(this.headArr).length;i++)
    {
     this.columns.push(`col${i}`);
    }
    console.log(this.columns);

    //header arraay
    for(let i=0; i<Object.keys(this.headArr).length;i++ )
    {
      this.headerArray.push(this.headArr[i].hname);
    }
    this.openDialog({tableData: output, headers : this.headerArray , columns : this.columns, headArr: this.headArr});
    
  };
}
    else 
    {
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
    
       const wb: XLSX.WorkBook = XLSX.read(bufferArray, { type: 'buffer' });

      const wsname: string = wb.SheetNames[0];

      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws);

      var output = data.map(function(obj) {
        return Object.keys(obj).map(function(key) { 
          return obj[key];
        });
      });
     var keys = Object.keys(data[0]);
      output.unshift(keys);

console.log("data",output);
      subscriber.next(output);
      subscriber.complete();

      //columns array
      for(let i=1;i<=Object.keys(this.headArr).length;i++)
      {
       this.columns.push(`col${i}`);
      }
      console.log(this.columns);

      //header array
      for(let i=0; i<Object.keys(this.headArr).length;i++ )
      {
        this.headerArray.push(this.headArr[i].hname);
      }
     
          this.openDialog({tableData: output, headers : this.headerArray , columns : this.columns, headArr: this.headArr});
      
    };
  }
}
}

   
