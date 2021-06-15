import { Component, OnInit, Input} from '@angular/core';
import {DetailsComponent} from '../details/details.component';
import {MatDialog} from '@angular/material/dialog';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-informative-icon',
  templateUrl: './informative-icon.component.html',
  styleUrls: ['./informative-icon.component.css']
})
export class InformativeIconComponent implements OnInit {

  constructor(public dialog :MatDialog) { }
 @Input() headArr;
  ngOnInit(): void {
  }
  opendetails()
  {
    let dialogRef= this.dialog.open(DetailsComponent,{
      data: this.headArr
    });
  }

}
