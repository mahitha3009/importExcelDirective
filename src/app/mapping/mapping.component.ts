import { Component, OnInit, EventEmitter, Inject, ViewChild, ContentChildren, QueryList} from '@angular/core';
import { ReadexcelDirective } from '../directives/readexcel.directive';
import { Input } from '@angular/core';
import { HeadersService } from '../headers.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import {AppComponent} from '../app.component';
import {Observable} from 'rxjs';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList} from '@angular/cdk/drag-drop';
import { MatTable, MatTableDataSource } from '@angular/material/table';
//import { IconService } from "./services/icon.service";


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
  
  constructor(private  _headersService: HeadersService, public dialog :MatDialog, @Inject(MAT_DIALOG_DATA) public data: Observable<any>) { }
  
  ngOnInit(): void {
    this.headers=this._headersService.getHeaders();
    this.readexcel = this.data;
    this.dataSource = new MatTableDataSource(this.headers);
    console.log("datasource",this.dataSource);
  }
  

 DataFromEventEmitter(data)
 {
   console.log(data);
 }
 loadpreview()
 {
   this.preview= true;
   console.log("before array", this.headers);
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

  moveItemInArray(this.headers, event.previousIndex, event.currentIndex);
  console.log(event.container.data);
  console.log("previous", event.previousIndex);
  console.log("current", event.currentIndex);
  console.log("after array", this.headers);

}
}



