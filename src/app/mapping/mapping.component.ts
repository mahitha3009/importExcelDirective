import { Component, OnInit, Inject, Input, Output} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CdkDragDrop} from '@angular/cdk/drag-drop';
import {ReadexcelDirective} from '../directives/readexcel.directive';
import {ErrormessageComponent} from '../errormessage/errormessage.component';


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
  public t;
  public tabdata;
  public eflag=false;
  displayedColumns: string[] = ["header", "column"];
 
  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data) {
   }

  ngOnInit(): void {
    this.headers=this.data.headers;
    this.columns=this.data.columns;
    this.tabdata=this.data.tableData;
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
  openDialog(data)
  {
    let dialogRef= this.dialog.open(ErrormessageComponent,{
      data: data
    });
  }

onsubmit()
{
  this.eflag=false;
  for(let i=0; i<Object.keys(this.headerarrayobject).length;i++)
  {
    var d=(this.headerarrayobject[i].datatype);
   for(let j=0;j<this.newdata[0].length;j++)
   {
     if(this.headerarrayobject[i].hname.toUpperCase() === this.newdata[0][j].toUpperCase())
     {
        this.t=j;
     }
   }
   if(this.eflag)
   {
     break;
   }
  for(let j=1;j<this.tabdata.length;j++)
    {
    if(this.tabdata[j][this.t]!= "")
     {
      if(d!=typeof this.tabdata[j][this.t] && d==='string')
      {
        this.eflag=true;
         var emsg = "The column mapped to " + this.headerarrayobject[i].hname + " is not a text ";
         var etitle= "Datatype mismatch!"
          this.openDialog({error: emsg ,etitle:etitle, tabledata: this.data.tableData, headerarrayobject : this.headerarrayobject});
        break;
      }
    
      if(d!=typeof this.tabdata[j][this.t] && d==='number')
      {
       this.eflag=true;
          var emsg = "The column mapped to " + this.headerarrayobject[i].hname + " is not a number "; 
          var etitle= "Datatype mismatch!"
          this.openDialog({error: emsg ,etitle:etitle, tabledata: this.data.tableData, headerarrayobject : this.headerarrayobject});
        break;
      }
   }
   if(this.eflag)
   {
     break;
   }

   if(this.headerarrayobject[i].validation)
   {
    var v= this.headerarrayobject[i].validation;
   for(let k=0;k<v.length;k++)
     {
      if( v[k] === 'required')
      {
        if(this.tabdata[j][this.t] === "")
        {
          this.eflag=true;
          var etitle="validation rule mismatch";
          var  emsg ="The values in column  mapped to " + this.headerarrayobject[i].hname + "  do not satisfy the '" +v[k]+ "' validation condition";
          this.openDialog({error: emsg ,etitle: etitle, tabledata: this.data.tableData, headerarrayobject : this.headerarrayobject});
          break;
        }
      }

    }
   
  }
  
 
  }

}
}

}