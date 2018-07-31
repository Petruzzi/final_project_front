import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { LoginService } from '../../../services/login.service';
import { ClassService } from '../../../services/class.service';
import { Class } from '../../../models/Class';
import { Subject } from '../../../models/Subject';
import {Location} from '@angular/common';
import { SubjectService } from '../../../services/subject.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  user: any = {
      'id': null,
      'name': null,
      'lastname': null,
      'username': null,
      'email': null,
      'role': null,
      'students': null,
      'class': null,
      'subjects': null
    };

  subjectsList: Subject[];
  studentList: User[];
  allClasses: Class[];

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private loginService: LoginService,
              private subjectService: SubjectService,
              private location: Location,
              private classService: ClassService) { }

  ngOnInit() {
    this.user.role = +this.route.snapshot.paramMap.get('opt');


    this.getAllStudents();
    this.getAllSubjects();
    this.getAllClasses();


  }





  addUser(email: string, username: string, name: string, lastname: string, cls: any ) {
    this.user.email = email;
    this.user.username = username;
    this.user.name = name;
    this.user.lastname = lastname;

    if ( cls !== '' && this.user.role === 3) {
      const arr = cls.split('.');
      this.user.class = arr[0];
    }

    if (this.user.students   && this.user.role === 4) {
      const arr: Array<string> = [];
      for (const  s of this.user.students) {
        arr.push(s.id);
      }
      this.user.students = arr;
    }

    if (this.user.subjects  && this.user.role === 2) {
      const arr: Array<string> = [];
      for (const  s of this.user.subjects) {
        arr.push(s.id);
      }
      this.user.subjects = arr;
    }

    this.userService.addUser(this.user).subscribe(
      () => this.location.back()
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

  getAllClasses() {
    this.classService.getAllClasses().subscribe(
     c => this.allClasses = c
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
    goBack(): void {
      this.location.back();
    }



}

