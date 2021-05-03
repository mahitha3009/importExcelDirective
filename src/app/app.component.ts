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
  public preview = false ;
  public headArr = ["id","name","loc"];
 

  DataFromEventEmitter(data) {
   console.log(data);
  }

  loadpreview()
  {
    this.preview= true;
  }
 
}