import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { User } from '../../../models/User';
import { Role } from '../../../models/Role';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Class } from '../../../models/Class';
import { ClassService } from '../../../services/class.service';
import {Location} from '@angular/common';
import { Subject } from '../../../models/Subject';
import { MessageService } from '../../../services/message/message.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  activeUser: User;
  studentClass: Class; // pomocna varijabla za profil studenta
  classesTeach: Class[];

  constructor(private userService: UserService,
              private location: Location,
              private loginService: LoginService,
              private classService: ClassService,
              private messageService: MessageService,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.getUser();
    this.getActiveUser();



  }


  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id).subscribe(
      val => {this.user = val;
        if (this.user) {
          if ( this.user.role.name === 'ROLE_STUDENT') {
            this.getStudentClass();
          } else if ( this.user.role.name === 'ROLE_PROFESSOR') {
            this.getClasses();
          }
        }

      }
    );
  }


  getActiveUser(): void {
    this.loginService.getActiveUser().subscribe(
      u => this.activeUser = u
    );
  }



  getStudentClass() {
    this.classService.getClassByStudentId(this.user.id).subscribe(
      c => this.studentClass = c
    );
  }

  getClasses(): void {
    this.classService.getClassesByProfId(this.user.id).subscribe(
      c => this.classesTeach = c
    );
  }



  deleteUser() {
    this.userService.deleteUser(this.user.id, this.user.role.name).subscribe(
      u => this.goBack()
    );
  }

  downloadLog(): void {
    this.userService.downloadLog();
  }


  getRole() {
    return this.loginService.getRole();
  }





  goBack(): void {
    this.location.back();
  }



}
