import { Component, OnInit } from '@angular/core';
import { ReadexcelDirective } from '../directives/readexcel.directive';
import { Input } from '@angular/core';

@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.css']
})
export class MappingComponent implements OnInit {
  @Input() headers: string[];
  constructor() { }
  ngOnInit(): void {
  }
 status: string ="h";
 getvalue()
 {
   this.status="i";
   return this.status;

 }
 DataFromEventEmitter(data)
 {
   console.log(data);
 }
}
