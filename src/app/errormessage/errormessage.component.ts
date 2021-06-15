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
      
      for (let j = 1; j < this.tabdata.length; j++) {
        var row = worksheet.getRow(j + 1);
        let isfaulty = false;
        if (this.tabdata[j][i] != "") {
          if(this.headerarrobject[i].datatype)
          {
            var d = (this.headerarrobject[i].datatype);
         
          if (d != typeof this.tabdata[j][i] && d === 'number') {
            isfaulty = true;
          }
          if(d==='date')
          {
            //let dateformat=/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
            let dateformat = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/; 
            let operator = this.tabdata[j][i].split('/');      
  
            // Extract the string into month, date and year      
            let datepart = [];      
            if (operator.length>1){      
                datepart = this.tabdata[j][i].split('/');      
            }      
            let month= parseInt(datepart[1]);      
            let day = parseInt(datepart[0]);      
            let year = parseInt(datepart[2]); 
  if(!(this.tabdata[j][i].match(dateformat) && month<13)){      
            isfaulty=true;
        
          }
        }
        }
        if (typeof this.tabdata[j][i] != 'string') {
          isfaulty = true;
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
