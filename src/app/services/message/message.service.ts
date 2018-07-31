import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {


  message: string;
 // message = 'teasatra';
  constructor() { }



  add(message: string) {
     this.message = message;
      setTimeout(() => {
          this.message = '';
      }, 5000);
  }



}



// $(function() {
//   $("#button").click( function () {
//       alert('button clicked');
//       setTimeout(function(){
//           alert('setTimeout');
//           document.getElementById('clearTxt').value = "";
//       }, 5000);
//   });
// });
