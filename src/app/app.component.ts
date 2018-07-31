import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { User } from './models/User';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {


  activeUser: User = null;

  constructor(private loginService: LoginService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.loginService.getToken()) {
      this.loginService.getActiveUser().subscribe(u => {
        this.activeUser = u;
        this.router.navigate(['/profile/0']);
      });
    } else {
      this.router.navigate(['login']);
    }
  }
}
