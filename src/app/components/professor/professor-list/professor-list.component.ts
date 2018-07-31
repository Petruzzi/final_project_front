import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/User';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-professor-list',
  templateUrl: './professor-list.component.html',
  styleUrls: ['./professor-list.component.css']
})
export class ProfessorListComponent implements OnInit {

  professors: User[];

  constructor(private userService: UserService,
              private loginService: LoginService) { }

  ngOnInit() {
    this.getAllProfessors();
  }

  getAllProfessors() {
    this.userService.getAllProfessors().subscribe(
      x => this.professors = x
    );
  }

  getRole(): string {
    return  this.loginService.getRole();
  }

}
