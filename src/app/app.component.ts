import { Component} from '@angular/core';
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
  public display = false;
 
  DataFromEventEmitter(data) {
    this.display= true;
    this.openDialog(data);
  }
  loadpreview()
  {
    this.preview= true;
  }
 openDialog(data) 
  {
    let dialogRef = this.dialog.open( MappingComponent,{
      width: '1000px',
      height:'600px',
     panelClass: 'custom-dialog-container',
      data: data
    });
    dialogRef.afterClosed().subscribe(result =>
      {
        // console.log(`Dialog result: ${result}`);
      });
  }
  
}