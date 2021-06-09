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
  public headArr = [{hname : "id", datatype: "string"},
                      {hname : "description", datatype: "string", validation : ["required"]},
                      {hname : "displaypic", datatype : "string", validation:["required"]},
                      {hname : "attachments", datatype : "string", validation:["required"]},
                      {hname : "groups", datatype : "string"},
                      {hname : "location", datatype : "string"},
                      {hname : "name", datatype : "string"},
                      {hname : "price", datatype : "string"},
                      {hname : "modelnum", datatype : "string"},
                      {hname : "purchasedate", datatype : "string"},
                      {hname : "retire", datatype : "string"},
                      {hname : "retiredon", datatype : "string"},
                      {hname : "salvage", datatype : "string"},
                      {hname : "subgroup", datatype : "string"},
                      {hname : "vendor", datatype : "string"}
                     

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