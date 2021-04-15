import { Component, OnInit, EventEmitter, Inject} from '@angular/core';
import { ReadexcelDirective } from '../directives/readexcel.directive';
import { Input } from '@angular/core';
import { HeadersService } from '../headers.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import {AppComponent} from '../app.component';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.css']
})
export class MappingComponent implements OnInit {
  public headers = [];
  public preview = false ;
  public readexcel;
  constructor(private  _headersService: HeadersService, public dialog :MatDialog, @Inject(MAT_DIALOG_DATA) public data: Observable<any>) { }
  ngOnInit(): void {
    this.headers=this._headersService.getHeaders();
    this.readexcel = this.data;
  }
 DataFromEventEmitter(data)
 {
   console.log(data);
 }
 loadpreview()
 {
   this.preview= true;
 }

}

