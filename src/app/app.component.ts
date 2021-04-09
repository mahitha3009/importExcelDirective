import { Component } from '@angular/core';
import { ReadexcelDirective } from './directives/readexcel.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'importexcel';
  public preview = false ;
  DataFromEventEmitter(data) {
    console.log(data);
  }
  loadpreview()
  {
    this.preview= true;
  }
}
