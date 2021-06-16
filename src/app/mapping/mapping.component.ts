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
  public newdata;
  public headerarrayobject = {};
  public tabdata;
  public flag=false;
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
    //check the year in the date and get the 4-digit date
    for (let i = 0; i < Object.keys(this.headerarrayobject).length; i++)
      {
          if(this.headerarrayobject[i].datatype==='date')
          {
            for(let j=0; j< this.tabdata.length;j++)
            {
              var dateformat=/^([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2})$/
              if(this.tabdata[j][i].match(dateformat))
              {
               let operator = this.tabdata[j][i].split('/');      
                  
              let datepart = [];      
              if (operator.length>1){      
                  datepart = this.tabdata[j][i].split('/');      
              }            
              let year = parseInt(datepart[2]); 
              let month = parseInt(datepart[1]);
              let day = parseInt(datepart[0]);
              var str=new Date().getFullYear().toString().substr(2, 2);
               var cy=parseInt(str);
              if(year>=0 && year <=cy)
              {
                year=(2*1000)+year;
                console.log(year);
                this.tabdata[j][i]=`${day}/${month}/${year}`;
                console.log(this.tabdata[j][i]);
                
              }
              else
              {
                year=(19*100)+year;
                console.log(year);
                this.tabdata[j][i]=`${day}/${month}/${year}`;
                console.log(this.tabdata[j][i]);
              }

            }
          }
      }
    }
  }

//drag and drop functionality of the columns table
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

  //date validation 
 validatedate(dateString)
 {
  let dateformat = /^([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2,4})$/; 
  if(dateString.match(dateformat))
  {
    let operator = dateString.split('/');      
  
    // Extract the string into month, date and year      
    let datepart = [];      
    if (operator.length>1){      
        datepart = dateString.split('/');      
    }      
    let month= parseInt(datepart[1]);      
    let day = parseInt(datepart[0]);      
    let year = parseInt(datepart[2]);      
                
    let ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31];  
    if(month>12)
    return false    
    if (month==1 || month>2){      
        if (day>ListofDays[month-1]){         
            return false;      
        }      
    }else if (month==2){      
        let leapYear = false;      
        if ( (!(year % 4) && year % 100) || !(year % 400)) {      
            leapYear = true;      
        }      
        if ((leapYear == false) && (day>=29)){      
            return false;      
        }
        else if ((leapYear==true) && (day>29)){          
            return false;      
        }      
    }      
}else{           
    return false;      
}      
return true;   

}   
 
//validate the table data on submit 
  onsubmit() {
 
  kk:  for (let i = 0; i < Object.keys(this.headerarrayobject).length; i++) {
  
      for (let j = 1; j < this.tabdata.length; j++) {
        if (this.tabdata[j][i] != "") {
          if(this.headerarrayobject[i].datatype)
          {
            var d = (this.headerarrayobject[i].datatype);
         
          if (d != typeof this.tabdata[j][i] && d === 'number') {
          this.flag=true;
            var emsg = "The column mapped to " + this.headerarrayobject[i].hname + " is not a number ";
            var etitle = "Datatype mismatch!"
            this.openDialog({ error: emsg, etitle: etitle, tabledata: this.data.tableData, headerarrayobject: this.headerarrayobject });
            break kk;
          }

          if(d=== 'date')
          {
            var b=this.validatedate(this.tabdata[j][i])
           if(b==false)
           {
             this.flag=true;
             console.log(this.tabdata[j][i]);
            var emsg = "The column mapped to " + this.headerarrayobject[i].hname + " doesn't have the date in correct format i.e 'dd/mm/yyyy' or the date is invalid. ";
            var etitle = "Incorrect date format!"
            this.openDialog({ error: emsg, etitle: etitle, tabledata: this.data.tableData, headerarrayobject: this.headerarrayobject });
            break kk;
           }
           
          }
        }
        if (typeof this.tabdata[j][i] != 'string') {
this.flag=true;
          var emsg = "The column mapped to " + this.headerarrayobject[i].hname + " is not a text ";
          var etitle = "Datatype mismatch!"
          this.openDialog({ error: emsg, etitle: etitle, tabledata: this.data.tableData, headerarrayobject: this.headerarrayobject });
          break kk;
        }
        }
        if (this.headerarrayobject[i].validation) {
          if(this.headerarrayobject[i].validation.required)
          {
          if (this.tabdata[j][i] === "") {
            this.flag=true;
            var etitle = "validation rule mismatch";
            var emsg = "The values in column  mapped to " + this.headerarrayobject[i].hname + "  does not satisfy the validation condition";
            this.openDialog({ error: emsg, etitle: etitle, tabledata: this.data.tableData, headerarrayobject: this.headerarrayobject });
            break kk;
          }
        }
      }
      }
    }
    if(this.flag==false)
    {
      return this.tabdata;
    }
  
   
   
  }

}