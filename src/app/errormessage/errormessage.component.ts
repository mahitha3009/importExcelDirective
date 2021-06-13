import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import * as Excel from "exceljs/dist/exceljs.min.js";
import * as fs from 'file-saver';

@Component({
  selector: 'app-errormessage',
  templateUrl: './errormessage.component.html',
  styleUrls: ['./errormessage.component.css']
})
export class ErrormessageComponent implements OnInit {
  public headerarrobject = {};
  public tabdata;
  constructor(public dialogRef: MatDialogRef<ErrormessageComponent>, @Inject(MAT_DIALOG_DATA) public data) {

  }

  ngOnInit(): void {
    this.dialogRef.updatePosition({ top: `20px` });
    this.headerarrobject = this.data.headerarrayobject;
    this.tabdata = this.data.tabledata;
  }
  fileName: string = 'Faultyreport.xlsx';


  export(): void {

    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet('Faulty Report');
    for (let j = 0; j <= this.tabdata.length; j++) {
      const row = worksheet.addRow(this.tabdata[j]);
    }
    for (let i = 0; i < Object.keys(this.headerarrobject).length; i++) {
      var d = (this.headerarrobject[i].datatype);
      for (let j = 1; j < this.tabdata.length; j++) {
        var row = worksheet.getRow(j + 1);
        let isfaulty = false;
        if (this.tabdata[j][i] != null) {
          if (d != typeof this.tabdata[j][i] && d === 'string') {
            isfaulty = true;
          }
          if (d != typeof this.tabdata[j][i] && d === 'number') {
            isfaulty = true;
          }
          if(d==='date')
          {
            let dateformat = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/; 
  if(this.tabdata[j][i].match(dateformat)){      
    let operator = this.tabdata[j][i].split('/');      
  
    // Extract the string into month, date and year      
    let datepart = [];      
    if (operator.length>1){      
        datepart = this.tabdata[j][i].split('/');      
    }      
    let month= parseInt(datepart[1]);      
    let day = parseInt(datepart[0]);      
    let year = parseInt(datepart[2]);      
          
    // Create list of days of a month      
    let ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31];      
    if (month==1 || month>2){      
        if (day>ListofDays[month-1]){      
            ///This check is for Confirming that the date is not out of its range      
            isfaulty = true;    
        }      
    }else if (month==2){      
        let leapYear = false;      
        if ( (!(year % 4) && year % 100) || !(year % 400)) {      
            leapYear = true;      
        }      
        if ((leapYear == false) && (day>=29)){      
          isfaulty = true;    
        }else      
        if ((leapYear==true) && (day>29)){           
            isfaulty = true;      
        }      
    }      
}else{          
    isfaulty = true;      
}      
      
          }
        }
        if (this.headerarrobject[i].validation) {
              if (this.tabdata[j][i] == '') {
                isfaulty = true;
                break;
              }
        }
        if (isfaulty) {
          const qty = row.getCell(i + 1);
          let color = 'FFCC0000';
          qty.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: color }
          };
        }
      }

    }


    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'faultyreport.xlsx');
    });

  }
}
