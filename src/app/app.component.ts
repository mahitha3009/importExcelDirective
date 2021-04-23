import { Component, EventEmitter, Inject } from '@angular/core';
import { ReadexcelDirective } from './directives/readexcel.directive';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { MappingComponent } from './mapping/mapping.component';
import { delay } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import {Observable, Subscriber} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public dialog :MatDialog) {}
  public readexcel;
  title = 'importexcel';
  public preview = false ;
  public display = false;
 
  DataFromEventEmitter(data) {
    console.log(data);
    this.display= true;
  }
  loadpreview()
  {
    this.preview= true;
  }
//setTimeout(openDialog(ReadexcelDirective),3000);
 openDialog(readexcel) 
  {
  //const dialogConfig= new MatDialogConfig();
  // dialogConfig.width="70%";
    let dialogRef = this.dialog.open( MappingComponent,{
      width: '1000px',
      height:'600px',
      data: readexcel
    });
    dialogRef.afterClosed().subscribe(result =>
      {
        console.log(`Dialog result: ${result}`);
      });
  }
  
}

