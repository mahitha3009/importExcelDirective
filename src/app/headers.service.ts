import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeadersService {

  constructor() { }
  getHeaders()
  {
    return [
      {"column" : "col1" , "header": "ID"},
      {"column" : "col2" , "header": "Description"},
      {"column" : "col3" , "header": "Display pic"},
      {"column" : "col4" , "header": "document attachments"},
      {"column" : "col5" , "header": "Group"},
      {"column" : "col6" , "header": "location"},
      {"column" : "col7" , "header": "name"},
      {"column" : "col8" , "header": "price"},
      {"column" : "col9" , "header": "product model number"},
      {"column" : "col10" , "header": "purchased on"},
      {"column" : "col11" , "header": " Retire"},
      {"column" : "col12" , "header": "Retired on"},
      {"column" : "col13" , "header": "salvage value"},
      {"column" : "col14" , "header": " sub group"},
      {"column" : "col15" , "header": "vendor"},
    ];
  }
}
