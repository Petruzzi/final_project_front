import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students: User[];


  constructor(private userService: UserService,
              private loginService: LoginService) { }

  ngOnInit() {

    this.getStudents();
  }

  getStudents(): void {
    this.userService.getStudents().subscribe(
      val => this.students = val
    );
  }

  searchStudentsByStr(str: any) {
    str = str.value;
    if (str) {
      this.userService.searchStudentsByStr(str).subscribe(
        x => {this.students = x;
        }
     );
    } else {
      this.getStudents();
    }



    console.log(str);

  }

  getRole(): string {
    return this.loginService.getRole();
  }


}
