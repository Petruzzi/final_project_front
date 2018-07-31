import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService ,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

  }


  login(email, pass) {
  this.loginService.generateToken(email, pass , 'profile/0');

  }


}
