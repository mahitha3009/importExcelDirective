import { Component, OnInit, Inject, Input, Output } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ReadexcelDirective } from '../directives/readexcel.directive';
import { ErrormessageComponent } from '../errormessage/errormessage.component';


@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.css']
})
export class MappingComponent implements OnInit {
  public headers = [];
  public columns = [];
  public preview = false;
  public submit = true;
  public newdata;
  public headerarrayobject = {};
  public tabdata;
  displayedColumns: string[] = ["header", "column"];

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit(): void {
    this.headers = this.data.headers;
    this.columns = this.data.columns;
    this.tabdata = this.data.tableData;
    this.newdata = this.data.tableData.slice(0, 6);
    this.headerarrayobject = this.data.headArr;
  }

  loadpreview() {
    this.preview = true;
  }


  drop(event: CdkDragDrop<string[]>) {
    let oldtarget = this.columns[event.previousIndex];
    this.columns[event.previousIndex] = this.columns[event.currentIndex];
    this.columns[event.currentIndex] = oldtarget;
    let prevCol = event.previousIndex;
    let currCol = event.currentIndex;


    for (let i = 0; i < this.tabdata.length; i++) {
      let temp = this.tabdata[i][prevCol];
      this.tabdata[i][prevCol] = this.tabdata[i][currCol];
      this.tabdata[i][currCol] = temp;
    }
  }
  openDialog(data) {
    let dialogRef = this.dialog.open(ErrormessageComponent, {
      data: data
    });
  }
 validatedate(dateString)
 {
let dateformat = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/; 
  
  if(dateString.match(dateformat)){      
    let operator = dateString.split('/');      
  
    // Extract the string into month, date and year      
    let datepart = [];      
    if (operator.length>1){      
        datepart = dateString.split('/');      
    }      
    let month= parseInt(datepart[1]);      
    let day = parseInt(datepart[0]);      
    let year = parseInt(datepart[2]);      
          
    // Create list of days of a month      
    let ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31];      
    if (month==1 || month>2){      
        if (day>ListofDays[month-1]){      
            ///This check is for Confirming that the date is not out of its range      
            return false;      
        }      
    }else if (month==2){      
        let leapYear = false;      
        if ( (!(year % 4) && year % 100) || !(year % 400)) {      
            leapYear = true;      
        }      
        if ((leapYear == false) && (day>=29)){      
            return false;      
        }else      
        if ((leapYear==true) && (day>29)){      
            console.log('Invalid date format!');      
            return false;      
        }      
    }      
}else{      
    console.log("Invalid date format!");      
    return false;      
}      
return true;      
}   
 

  onsubmit() {

  kk:  for (let i = 0; i < Object.keys(this.headerarrayobject).length; i++) {
      var d = (this.headerarrayobject[i].datatype);
      for (let j = 1; j < this.tabdata.length; j++) {
        if (this.tabdata[j][i] != "") {
          if (d != typeof this.tabdata[j][i] && d === 'string') {

            var emsg = "The column mapped to " + this.headerarrayobject[i].hname + " is not a text ";
            var etitle = "Datatype mismatch!"
            this.openDialog({ error: emsg, etitle: etitle, tabledata: this.data.tableData, headerarrayobject: this.headerarrayobject });
            break kk;
          }

          if (d != typeof this.tabdata[j][i] && d === 'number') {
           
            var emsg = "The column mapped to " + this.headerarrayobject[i].hname + " is not a number ";
            var etitle = "Datatype mismatch!"
            this.openDialog({ error: emsg, etitle: etitle, tabledata: this.data.tableData, headerarrayobject: this.headerarrayobject });
            break kk;
          }

          if(d=== 'date')
          {
           if(this.validatedate(this.tabdata[j][i])==false)
           {
             console.log(this.tabdata[j][i]);
            var emsg = "The column mapped to " + this.headerarrayobject[i].hname + "doesn't have the date in correct format ";
            var etitle = "incorrect date format!"
            this.openDialog({ error: emsg, etitle: etitle, tabledata: this.data.tableData, headerarrayobject: this.headerarrayobject });
            break kk;
           }
           
          }
        }

        if (this.headerarrayobject[i].validation) {
          if (this.tabdata[j][i] === "") {
            var etitle = "validation rule mismatch";
            var emsg = "The values in column  mapped to " + this.headerarrayobject[i].hname + "  does not satisfy the validation condition";
            this.openDialog({ error: emsg, etitle: etitle, tabledata: this.data.tableData, headerarrayobject: this.headerarrayobject });
            break kk;
          }
        }

      }
    }
    /*
    this.eflag=false;
    for(let i=0; i<Object.keys(this.headerarrayobject).length;i++)
    {
      var d=(this.headerarrayobject[i].datatype);
     for(let j=0;j<this.newdata[0].length;j++)
     {
       if(this.headerarrayobject[i].hname.toUpperCase() === this.newdata[0][j].toUpperCase())
       {
          this.t=j;
       }
     }
     if(this.eflag)
     {
       break;
     }
    for(let j=1;j<this.tabdata.length;j++)
      {
      if(this.tabdata[j][this.t]!= "")
       {
        if(d!=typeof this.tabdata[j][this.t] && d==='string')
        {
          this.eflag=true;
           var emsg = "The column mapped to " + this.headerarrayobject[i].hname + " is not a text ";
           var etitle= "Datatype mismatch!"
            this.openDialog({error: emsg ,etitle:etitle, tabledata: this.data.tableData, headerarrayobject : this.headerarrayobject});
          break;
        }
      
        if(d!=typeof this.tabdata[j][this.t] && d==='number')
        {
         this.eflag=true;
            var emsg = "The column mapped to " + this.headerarrayobject[i].hname + " is not a number "; 
            var etitle= "Datatype mismatch!"
            this.openDialog({error: emsg ,etitle:etitle, tabledata: this.data.tableData, headerarrayobject : this.headerarrayobject});
          break;
        }
     }
     if(this.eflag)
     {
       break;
     }
  
     if(this.headerarrayobject[i].validation)
     {
      var v= this.headerarrayobject[i].validation;
     for(let k=0;k<v.length;k++)
       {
        if( v[k] === 'required')
        {
          if(this.tabdata[j][this.t] === "")
          {
            this.eflag=true;
            var etitle="validation rule mismatch";
            var  emsg ="The values in column  mapped to " + this.headerarrayobject[i].hname + "  do not satisfy the '" +v[k]+ "' validation condition";
            this.openDialog({error: emsg ,etitle: etitle, tabledata: this.data.tableData, headerarrayobject : this.headerarrayobject});
            break;
          }
        }
  
      }
     
    }
    
   
    }
  
  }*/
  }

}