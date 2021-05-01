import { Directive, HostListener, Input, Output, EventEmitter, Inject, ElementRef} from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import * as XLSX from 'xlsx';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';

@Directive({
  selector: '[appReadexcel]',
  exportAs : 'readexcel' ,
})
 
export class ReadexcelDirective {
  excelObservable: Observable<any>;
  @Output() eventEmitter = new EventEmitter();
  @Output() headerEvent  = new EventEmitter();
  
 @Input('appReadexcel') name : string;
 @Input() textInput : string;
 
 public keys;
 public headerArray;
 public headerarrayobject = {};
 constructor(private elementRef: ElementRef) {}
 ngOnInit() {
  console.log(this.textInput);
}

  @HostListener('change', ['$event.target'])
  onChange(target: HTMLInputElement) {
    console.log(this.textInput);

    if(this.textInput)
    {
      const headerObject= target.value;
      console.log(target.value)
      var headerinput=target.value
      this.headerArray=headerinput.split(',');
    
      console.log(this.headerArray);
      var columns=[];
      for(let i=1;i<=this.headerArray.length;i++)
      {
       columns.push(`col${i}`);
      }
      console.log(columns);
      this.headerEvent.emit(this.headerArray);
    }

    else
    {
    const file = target.files[0];
    this.excelObservable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });

    this.excelObservable.subscribe((d) => {
      this.eventEmitter.emit(d);
    });
  }
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
    };
  }
}
}

   
