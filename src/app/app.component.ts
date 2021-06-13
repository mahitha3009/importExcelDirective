import { Component, EventEmitter, Output } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MappingComponent } from './mapping/mapping.component';
import {DetailsComponent} from './details/details.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(public dialog :MatDialog) {}
  title = 'importexcel';
  public display;
  public headArr = [{hname:"id"},
  {hname : "desc", datatype: "string"},
  {hname : "dp"},
  {hname : "attach"},
  {hname : "group"},{hname : "loc"},{hname : "name"},{hname : "price"},{hname : "modelnum"},{hname : "purchasedon" , datatype:"date"},{hname : "retire"},{hname : "retiredon",datatype: "date"},{hname : "salvage"},{hname : "subgroup"},{hname : "vendor"},
  {hname: "test"},{hname: "test1"},{hname: "test2"}
 
];

  DataFromEventEmitter(data) {
   console.log(data);
  }
  opendetails()
  {
    let dialogRef= this.dialog.open(DetailsComponent,{
      data: this.headArr
    });
  }
}