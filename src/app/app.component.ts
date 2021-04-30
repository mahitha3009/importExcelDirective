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
   // this._headersService.myMethod(this.headArr);
  }
  title = 'importexcel';
  public preview = false ;
  public display = false;
  public headArr=[];
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
  keyup(headerinput : string )
  {
    console.log(headerinput);
    this.headArr=headerinput.split(',');
    console.log(this.headArr);
    var columns=[];
    for(let i=1;i<=this.headArr.length;i++)
    {
     columns.push(`col${i}`);
    }
    console.log(columns);
    this._headersService.getheaders(this.headArr);
  }
 

}