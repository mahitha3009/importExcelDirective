import { Component, OnInit, Inject } from '@angular/core';
import { HeadersService } from '../headers.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CdkDragDrop} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.css']
})
export class MappingComponent implements OnInit {
  public headers = [];
  public preview = false;
  displayedColumns: string[] = ["header", "column"];
  constructor(private _headersService: HeadersService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.headers = this._headersService.getHeaders();
  }


  DataFromEventEmitter(data) {
    console.log(data);
  }
  loadpreview() {
    this.preview = true;
  }


  drop(event: CdkDragDrop<string[]>) {
    let oldtarget = this.headers[event.previousIndex].column;
    this.headers[event.previousIndex].column = this.headers[event.currentIndex].column;
    this.headers[event.currentIndex].column = oldtarget;

    let prevCol = event.previousIndex;
    let currCol = event.currentIndex;
    for(let i=0; i<this.data.length; i++){
      let temp = this.data[i][prevCol];
      this.data[i][prevCol] = this.data[i][currCol];
      this.data[i][currCol] = temp;
    }
  }


}

