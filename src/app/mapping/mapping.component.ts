import { Component, OnInit, Inject, Input, Output} from '@angular/core';
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
  public submit=true;
  public newdata;
  public headerarrayobject = {};
  displayedColumns: string[] = ["header", "column"];
 
  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data) {
   }

  ngOnInit(): void {
    this.headers=this.data.headers;
    this.columns=this.data.columns;
    this.newdata=this.data.tableData.slice(0,6);
    this.headerarrayobject= this.data.headArr;
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

onsubmit()
{
  for(let i=0; i<Object.keys(this.headerarrayobject).length;i++)
  {
    var d=(this.headerarrayobject[i].datatype);
    var v= this.headerarrayobject[i].validation;
    console.log(d);
   for(let j=1;j<this.newdata.length;j++)
    {
      console.log( typeof this.newdata[j][i]);
      if(d!=typeof this.newdata[j][i])
      {
        alert("the file columns are not of the required data type")
        break;
      }
      if(v== 'required')
      {
        if(this.newdata[j][i]== '')
        {
          alert("the fields in the file do not satisfy the validation condition");
          break;
        }
      }
      if(v=='not null')
      {
        if(this.newdata[j][i]==null)
        {
          alert("the fields in the file do not satisfy the validation condition");
          break;
        }
      }
  }
}
}

}