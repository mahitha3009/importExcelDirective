import { Component, EventEmitter } from '@angular/core';
import { ReadexcelDirective } from './directives/readexcel.directive';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
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
  DataFromEventEmitter(data) {
    console.log(data);
  }
  loadpreview()
  {
    this.preview= true;
  }
 openDialog(readexcel) 
  {
  //const dialogConfig= new MatDialogConfig();
  // dialogConfig.width="70%";
    let dialogRef = this.dialog.open( MappingComponent,{
      width: '800px',
      height:'800px',
      data: readexcel
    });
    dialogRef.afterClosed().subscribe(result =>
      {
        console.log(`Dialog result: ${result}`);
      });
  }
}

