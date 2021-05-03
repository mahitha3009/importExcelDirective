import { Component, OnInit, Inject, Input} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CdkDragDrop} from '@angular/cdk/drag-drop';
import {ReadexcelDirective} from '../directives/readexcel.directive';


@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.css']
})
export class MappingComponent implements OnInit {
  public headers = [];
  public columns=[];
  public preview = false;
  public newdata;
  displayedColumns: string[] = ["header", "column"];
 
  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data) {
   }

  ngOnInit(): void {
    this.headers=this.data.headers;
    this.columns=this.data.columns;
    this.newdata=this.data.tableData.slice(0,6);
  }

  loadpreview() {
    this.preview = true;
  }


  drop(event: CdkDragDrop<string[]>) {
    let oldtarget = this.columns[event.previousIndex];
    this.columns[event.previousIndex] = this.columns[event.currentIndex];
    this.columns[event.currentIndex] = oldtarget;
    let prevCol = event.previousIndex;
    let currCol = event.currentIndex;


    for(let i=0; i<this.newdata.length; i++){
      let temp = this.newdata[i][prevCol];
      this.newdata[i][prevCol] = this.newdata[i][currCol];
      this.newdata[i][currCol] = temp;
    }
  }


}

