import { Component, EventEmitter, Output } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MappingComponent } from './mapping/mapping.component';
import {DetailsComponent} from './details/details.component';
import {InformativeIconComponent} from './informative-icon/informative-icon.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(public dialog :MatDialog) {}
  title = 'importexcel';
  //Array of objects that contain header names and their validations
  public headArr = [{hname:"itemname"},
  {hname : "lifespan", datatype: "string", validation : {required:"true", minlength:"", maxlength:""}},
  {hname : "date", datatype:"date"},
  {hname:"breakdowns"}
];
 
  DataFromEventEmitter(data) {
   console.log(data);
  }
 
}