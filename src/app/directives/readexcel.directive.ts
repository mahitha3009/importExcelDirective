import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { Directive, HostListener, Output, EventEmitter, ElementRef, ɵCompiler_compileModuleAndAllComponentsSync__POST_R3__} from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import * as XLSX from 'xlsx';

@Directive({
  selector: '[appReadexcel]',
  exportAs : 'readexcel' ,
})
 
export class ReadexcelDirective {
  excelObservable: Observable<any>;
  @Output() eventEmitter = new EventEmitter();
 
   
 constructor() {}
 headers: Array <string> = ["Id","Description","Display pic","document attachments","Group", "location"," name", "price","product model number","purchased on"," Retire", "Retired on", "salvage value"," sub group","vendor"];
 //columns : Array <string> =[];


// var columns:string[];


 /*for(let i=0; i < headers.length(); i++)
  {
    columns.push('col'+{i} );
      
  }
*/
  headerArray: Array <string> = [];

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

 /* getHeaderArray(keys) {
    let headerArray = [];
    for( let j=0; j< keys.length; j++)
    {
    headerArray.push(keys[j]);
    }
    console.log("Hello",this.myArray);
    return headerArray;
  }*/

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
    
 
    var keys = Object.keys(data[0]);
    output.unshift(keys);

    console.log("headers",keys);
    
  for( let j=0; j< keys.length; j++)
    {
    this.headerArray.push(keys[j]);
    }
   
    console.log("headerarray" ,this.headerArray);
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

   
