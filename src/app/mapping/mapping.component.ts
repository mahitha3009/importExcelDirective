import { Component, OnInit, EventEmitter, Inject, ViewChild, ContentChildren, QueryList} from '@angular/core';
import { ReadexcelDirective } from '../directives/readexcel.directive';
import { Input } from '@angular/core';
import { HeadersService } from '../headers.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import {AppComponent} from '../app.component';
import {Observable, Subscriber} from 'rxjs';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList} from '@angular/cdk/drag-drop';
import { MatTable, MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.css']
})
export class MappingComponent implements OnInit {
  public headers = [];
  public preview = false ;
  public readexcel;
  dataSource;
  displayedColumns: string[] = ["header", "column"];
  public data1;
  public display;
  constructor(private  _headersService: HeadersService, public dialog :MatDialog, @Inject(MAT_DIALOG_DATA) public data: Observable<any>) { }
  
  ngOnInit(): void {
    this.headers=this._headersService.getHeaders();
    this.readexcel = this.data;
    console.log(this.data);
    //this.dataSource = new MatTableDataSource(this.headers);
    //console.log("datasource",this.dataSource);
  }
 

 DataFromEventEmitter(data)
 {
   console.log(data);
 } 
 loadpreview()
 {
   this.preview= true;   
   
 }


 drop(event: CdkDragDrop<string[]>) {
  /*if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(event.previousContainer.data,
                      event.container.data,
                      event.previousIndex,
                      event.currentIndex);
  }*/
  
  //moveItemInArray(this.headers, event.previousIndex, event.currentIndex);
  let oldtarget = this.headers[event.previousIndex].column;
  this.headers[event.previousIndex].column = this.headers[event.currentIndex].column;
  this.headers[event.currentIndex].column = oldtarget;
 
  console.log(event.container.data);
  console.log("previous", event.previousIndex);
  console.log("current", event.currentIndex);
  console.log("after array", this.headers);
  console.log(this.headers[event.currentIndex].column);
  var s=this.headers[event.currentIndex].column;
  var num = Number(s.match(/\d+/g));
  console.log(num);
  console.log(this.data);

 this.readexcel.excelObservable.subscribe( (data1 , subscriber: Subscriber<any>) => {
    console.log("before change", data1);
    console.log(data1.length);
  for(var i=0;i<data1.length;i++)
  {
    var temp= data1[i][event.previousIndex];
    data1[i][event.previousIndex]=data1[i][event.currentIndex];
    data1[i][event.currentIndex]= temp;
  }
  console.log("after change",data1);
  this.display=data1;

 subscriber.next(data1);
 subscriber.complete();

 }); 
 /*this.readexcel.excelObservable.subscribe( this.data1 ,subscriber => {
  console.log("before change", this.data1);
  console.log(this.data1.length);
for(var i=0;i<this.data1[0].length;i++)
{
  var temp= this.data1[i][event.previousIndex-1];
  this.data1[i][event.previousIndex]=this.data1[i][event.currentIndex];
  this.data1[i][event.currentIndex]= temp;
}
console.log("after change",this.data1);
this.display=this.data1;
subscriber.next(this.data1);

}); */
  
}


}



