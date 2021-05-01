import { Component, OnInit, Inject, Input} from '@angular/core';
import { HeadersService } from '../headers.service';
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
  public headerArray= [];
  public columns=[];
  public preview = false;
  public newdata;
  public values;
  displayedColumns: string[] = ["header", "column"];
 
  constructor(private _headersService: HeadersService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data) {
  
   }

  ngOnInit(): void {
    this.values = this._headersService.getheaders(this.headerArray);
    this.headers=this.values[0];
    this.columns=this.values[1];
    this.newdata=this.data.slice(0,6);
  }


  DataFromEventEmitter(data) {
    console.log(data);
  }
  readHeaders(event)
  {
    console.log(event);
    var columns=[];
    for(let i=1;i<=event.length;i++)
    {
     columns.push(`col${i}`);
    }
    console.log(columns);
  }
  loadpreview() {
    this.preview = true;
  }


  drop(event: CdkDragDrop<string[]>) {
    let oldtarget = this.headers[event.previousIndex];
    this.headers[event.previousIndex] = this.headers[event.currentIndex];
    this.headers[event.currentIndex] = oldtarget;
    let prevCol = event.previousIndex;
    let currCol = event.currentIndex;
    for(let i=0; i<this.newdata.length; i++){
      let temp = this.newdata[i][prevCol];
      this.newdata[i][prevCol] = this.newdata[i][currCol];
      this.data[i][currCol] = temp;

    }
  }


}

