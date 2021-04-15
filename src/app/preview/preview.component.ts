import { Component, OnInit } from '@angular/core';
import { ReadexcelDirective } from '../directives/readexcel.directive';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
