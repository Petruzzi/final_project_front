import { Component, OnInit, Input , AfterViewInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/User';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {

   activeUser: User;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    const x = this.loginService.getActiveUser();
     if (x !== null) {
       x.subscribe(u => this.activeUser = u);
     }

  }





  logout() {
    this.loginService.logout();
  }
}
