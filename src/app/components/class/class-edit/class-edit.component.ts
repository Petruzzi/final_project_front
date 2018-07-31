import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassService } from '../../../services/class.service';
import { Class } from '../../../models/Class';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-class-edit',
  templateUrl: './class-edit.component.html',
  styleUrls: ['./class-edit.component.css']
})
export class ClassEditComponent implements OnInit {

  oneClass: Class;
  studentList: User[];
  availableHeadTeachers: User[];


  constructor(private route: ActivatedRoute,
              private classService: ClassService,
              private userService: UserService,
              private location: Location,
              private router: Router) { }

  ngOnInit() {
    this.getClass();
    this.getAllStudents();
    this.getTeachers();
  }


  getTeachers() {
    this.userService.getAllProfessors().subscribe(
      t => this.availableHeadTeachers = t
    );
  }


  updateClass(headT: any , classNumber?: string, classGrade?: string) {
    const stuIdArr: any[] =  new Array() ;

    if ( this.oneClass.students ) {
      for (const stu of this.oneClass.students) {
        stuIdArr.push(stu.id);
      }
    }

    if (this.oneClass.headTeacher) {
      if (headT + '' === this.oneClass.headTeacher.id + '') {
          headT = null;
      }
    }

    let tempGradeNumber = null;
    let tempClassNumber = null;
    if (this.oneClass.grade) {
      tempGradeNumber = this.oneClass.grade.id;
    } else if (classGrade) {
      tempGradeNumber = classGrade;
    }

    if (this.oneClass.classNumber) {
      tempClassNumber = this.oneClass.classNumber;
    } else if (classNumber) {
      tempClassNumber = classNumber;
    }

    const classBody = {
      'id': this.oneClass.id,
      'grade': tempGradeNumber,
      'headTeacher': headT,
      'classNumber': tempClassNumber,
      'students': stuIdArr
    };

    this.classService.updateClass(classBody).subscribe(
      x =>  {console.log(x);
        // this.goBack();
        if (x) {
          this.router.navigate(['/class_details/by_class_id/' + x.id]);
        }
        //
         }
    );
  }


  getClass() {
    const id = +this.route.snapshot.paramMap.get('id');
    const options = 'by_class_id';
    if (id > 0) {
        this.classService.getClassById(id, options).subscribe(
          c => this.oneClass = c
        );
    } else {
      this.oneClass = {
        'id': 0,
        'grade': null,
        'headTeacher': null,
        'classNumber': null,
        'students': null
      };
    }

  }

  getAllStudents() {
    this.userService.getStudents().subscribe(
      s => this.studentList = s
    );
  }


  addStudent(student: string) {
    const stuArr: any[] = student.split('.');
    stuArr[0] = + stuArr[0];

    if (this.oneClass.students === null) {// prilikom kreiranja nove problem stvara jer je undefined
      for (const s of this.studentList) {
        if (s.id === stuArr[0]) {
          this.oneClass.students = [s];
        }
      }
    } else {
      for (const stu of this.studentList) {
        if (stu.id === stuArr[0]) {
          let x = false;
          for (const stu1 of this.oneClass.students) {
            if (stu1.id === stu.id) {
              x = true;
            }
          }
          if (x === false) {
            this.oneClass.students.push(stu);
          }
        }
      }
    }
  }

removeStudent(stu: User) {
  for (let i = 0 ; i < this.oneClass.students.length ; i++) {
    if (stu.id === this.oneClass.students[i].id) {
      this.oneClass.students.splice(i, 1);
    }
  }
}



  goBack() {
    this.location.back();
  }

}
