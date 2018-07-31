import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/User';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-parent-list',
  templateUrl: './parent-list.component.html',
  styleUrls: ['./parent-list.component.css']
})
export class ParentListComponent implements OnInit {


  parents: User[];

  constructor(private userService: UserService,
              private loginService: LoginService) { }

  ngOnInit() {
    this.getParents();

  }


  getParents(): void {
    this.userService.getParents().subscribe(
      x => this.parents = x
    );
  }



  getRole(): string {
    return this.loginService.getRole();
  }
}
