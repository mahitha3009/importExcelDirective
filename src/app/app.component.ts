import { Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MappingComponent } from './mapping/mapping.component';
import { HeadersService } from './headers.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(public dialog :MatDialog, private _headersService: HeadersService) {
   //this.headArr = [];
   // this._headersService.myMethod(this.headArr);
  }
  title = 'importexcel';
  public preview = false ;
  public display = false;
  public headArr = [];
  
 //public headerArray= getheaders();

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
  readHeaders(event)
  {
    console.log(event);
    var columns=[];
    for(let i=1;i<=event.length;i++)
    {
     columns.push(`col${i}`);
    }
    console.log(columns);
  }


}