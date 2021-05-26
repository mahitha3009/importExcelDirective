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
  public headArr = [{hname : "item Name", datatype: "string", validation: ["required"]},
                      {hname : "Lifespan", datatype: "string", validation : ["required"]},
                      {hname : "Reason to discontinue", datatype : "string", validation:["required"]},
                      {hname : "Breakdowns", datatype : "string", validation:["required"]}
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