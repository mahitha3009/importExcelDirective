import { Component, EventEmitter, Output } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MappingComponent } from './mapping/mapping.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(public dialog :MatDialog) {}
  title = 'importexcel';
  public headArr = [{hname : "id", datatype: "number", validation: "required"},
                      {hname : "name", datatype: "string", validation : "not null"},
                      {hname : "location", datatype : "string", validation:"required"}
];
 
  DataFromEventEmitter(data) {
   console.log(data);
  }

  
 
}