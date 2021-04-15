import { Component, OnInit } from '@angular/core';
import { ReadexcelDirective } from '../directives/readexcel.directive';
import { Input } from '@angular/core';
import { HeadersService } from '../headers.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import {AppComponent} from '../app.component';
import {PreviewComponent} from '../preview/preview.component';

@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.css']
})
export class MappingComponent implements OnInit {
  public headers = [];
  public preview = false ;
  constructor(private  _headersService: HeadersService, public dialog :MatDialog) { }
  ngOnInit(): void {
    this.headers=this._headersService.getHeaders();
  }
 DataFromEventEmitter(data)
 {
   console.log(data);
 }
 loadpreview()
 {
   this.preview= true;
 }
 openDialog() 
  {
  //const dialogConfig= new MatDialogConfig();
  // dialogConfig.width="70%";
    let dialogRef = this.dialog.open( PreviewComponent,{
      width: '700px',
      height:'600px'
    });
}
}
