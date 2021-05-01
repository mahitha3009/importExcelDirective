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
  
  constructor(public dialog :MatDialog) {}
  title = 'importexcel';
  public preview = false ;
  public display = false;
  public headArr = [];
  public columns =[];
  

  DataFromEventEmitter(data) {
   // this.display= true;
   var filecolumns=data[0].length;
   console.log(filecolumns);
   if(this.headArr.length==filecolumns)
   {
     this.display=true;
     console.log('true');
   }
   else{
     this.display=false;
     console.log('false');
   }
    this.openDialog( { tableData: data, headers :this.headArr, columns : this.columns , display: this.display} );
    
    
  }
  loadpreview()
  {
    this.preview= true;
  }
 openDialog(data) 
  {
    if(this.display)
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
    else{
      console.log('error msg'); 
    alert('The number of fields in the file are not equal to the given number of headers')   }
  }
  readHeaders(event)
  {
    console.log(event);
this.headArr=event;
    for(let i=1;i<=event.length;i++)
    {
     this.columns.push(`col${i}`);
    }
    console.log(this.columns);
  }

}