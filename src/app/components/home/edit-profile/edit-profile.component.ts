import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { User } from '../../../models/User';
import { LoginService } from '../../../services/login.service';
import { PassChange } from '../../../models/PassChange';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ClassService } from '../../../services/class.service';
import { Class } from '../../../models/Class';
import { Subject } from '../../../models/Subject';
import { SubjectService } from '../../../services/subject.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user: User;

  activeUser: User;
  studentClass: Class;
  allClasses: Class[];
  subjectsList: Subject[];
  studentList: User[];

  constructor(private location: Location,
              private router: Router,
              private userService: UserService,
              private loginService: LoginService,
              private subjectService: SubjectService,
              private classService: ClassService,
              private route: ActivatedRoute) { }



  ngOnInit() {
    this.getActiveUser();
    this.getUser();
  }

  getActiveUser(): void {
        this.loginService.getActiveUser().subscribe(
        u => {
          this.activeUser = u;
        }
    );
  }


  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id).subscribe(
      val => {
        this.user = val;
        if ( val.role.name === 'ROLE_STUDENT') {
          this.getStudentClass();
        }
        if ( val.role.name === 'ROLE_STUDENT' && this.activeUser.role.name === 'ROLE_ADMIN') {
          this.getAllClasses();
        }
        if (val.role.name === 'ROLE_PARENT' && this.activeUser.role.name === 'ROLE_ADMIN') {
          this.getAllStudents();
        }
        if (val.role.name === 'ROLE_PROFESSOR' && this.activeUser.role.name === 'ROLE_ADMIN') {
          this.getAllSubjects();
        }

      }
    );
  }

  getStudentClass() {
    this.classService.getClassById(this.user.id, 'by_class_id').subscribe(
      c => this.studentClass = c
    );
  }

  getAllSubjects() {
    this.subjectService.getAllSubjects().subscribe(
      s => this.subjectsList = s
    );
  }


  getAllStudents() {
    this.userService.getStudents().subscribe(
      s => this.studentList = s
    );
  }


 updateProfile(cls: any) {
  const userBody = {
    'id': this.user.id,
    'name': this.user.name,
    'lastname': this.user.lastname,
    'username': this.user.username,
    'email': this.user.email,
    'role': this.user.role,
    'students': null,
    'class': null,
    'subjects': null
  };

  if (cls.value && this.user.role.name === 'ROLE_STUDENT') { // zbog studenta
    const arr = cls.value.split('.');
    userBody.class = arr[0];
  }

  const subIdArr: any[] =  new Array() ;
  if ( this.user.subjects) { // zbog prof
    for (const sub of  this.user.subjects) {
      subIdArr.push(sub.id);
    }
    userBody.subjects = subIdArr;
  }

  if ( this.user.students) { // zbog parenta
    for (const stu of  this.user.students) {
      subIdArr.push(stu.id);
    }
    userBody.students = subIdArr;
  }


    this.userService.updateProfile(userBody).subscribe(
      v => {this.user = v;
            if (this.user.id === this.activeUser.id) {
              this.loginService.generateToken(this.user.email, this.loginService.getPass(), '/edit_profile/' + this.user.id);
            }
      }
    );
 }

 getAllClasses() {
   this.classService.getAllClasses().subscribe(
    c => this.allClasses = c
   );
 }


 updatePassword(oldP: string, newP: string, repP: string) {
  const pass: PassChange = {
    'oldPassword' : oldP,
    'newPassword' : newP,
    'repeatNewPassword' : repP,
  };

    this.userService.updatePassword(pass).subscribe(
      x => {this.loginService.generateToken(this.user.email, newP , '/edit_profile/' + this.user.id);
      }
    );
 }




 addSubject(sub: string) {
 const stuArr: any[] = sub.split('.');
  stuArr[0] = + stuArr[0];

    if (!this.user.subjects ) {// prilikom kreiranja nove problem stvara jer je undefined
        for (const s of this.subjectsList) {
          if (s.id === stuArr[0]) {
            this.user.subjects = [s];
          }
        }
    } else {
        for (const s of this.subjectsList) {
          if (s.id === stuArr[0]) {
            let x = false;
            for (const stu1 of this.user.subjects) {
              if (stu1.id === s.id) {
                x = true;
              }
            }
            if (x === false) {
              this.user.subjects.push(s);
            }
          }
        }

    }

}



addStudent(student: string) {
  const stuArr: any[] = student.split('.');
  stuArr[0] = + stuArr[0];

  if (this.user.students === null) {// prilikom kreiranja nove problem stvara jer je undefined
    for (const s of this.studentList) {
      if (s.id === stuArr[0]) {
        this.user.students = [s];
      }
    }
  } else {
    for (const stu of this.studentList) {
      if (stu.id === stuArr[0]) {
        let x = false;
        for (const stu1 of this.user.students) {
          if (stu1.id === stu.id) {
            x = true;
          }
        }
        if (x === false) {
          this.user.students.push(stu);
        }
      }
    }
  }
}



 removeSubject(sub: Subject) {
  for (let i = 0 ; i < this.user.subjects.length ; i++) {
    if (sub.id === this.user.subjects[i].id) {
      this.user.subjects.splice(i, 1);
    }
  }
}


removeStudent(stu: User) {
  for (let i = 0 ; i < this.user.students.length ; i++) {
    if (stu.id === this.user.students[i].id) {
      this.user.students.splice(i, 1);
    }
  }
}

  resetUserPassword() {
    this.userService.resetUserPassword(this.user.id).subscribe(

      x => console.log(x)
    );
  }

  getRole(): string {
    return this.loginService.getRole();
  }
  goBack(): void {
    this.location.back();
  }





}
