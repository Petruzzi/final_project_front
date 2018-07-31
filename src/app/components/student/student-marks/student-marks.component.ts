import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Mark } from '../../../models/Mark';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MarkService } from '../../../services/mark.service';
import { Subject } from '../../../models/Subject';
import { LoginService } from '../../../services/login.service';
import { SubjectService } from '../../../services/subject.service';
import { Schedule } from '../../../models/Schedule';
import { Class } from '../../../models/Class';
import { ClassService } from '../../../services/class.service';
import { User } from '../../../models/User';


@Component({
  selector: 'app-student-marks',
  templateUrl: './student-marks.component.html',
  styleUrls: ['./student-marks.component.css']
})
export class StudentMarksComponent implements OnInit {

 // subjects: Subject[];
  schedules: Schedule[];
  marks: Mark[];
  id: number; // student id
  foundFinal = false;
  activeSemester: number;

  activeUser: User;
  studentClass: Class;

  constructor(private route: ActivatedRoute,
              private markService: MarkService,
              private loginService: LoginService,
              private subjectService: SubjectService,
              private classService: ClassService,
              private location: Location) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');

    this.getActiveUser();
    this.getMarkByStudentId();
    this.getActiveSemester();


    this.getClassByStudentId();
    this.getSchedules();


    $('.btn').removeClass('active');
    $('#marksBtn').addClass('active');
  }


  getClassByStudentId(): void {
    this.classService.getClassByStudentId(this.id).subscribe(
      x => {this.studentClass = x;
      }
    );

  }

  getMarkByStudentId(): void {
    this.markService.getMarkByStudentId(this.id).subscribe(
      val =>  this.marks = val
    );
  }


  getSchedules(): void {
    this.subjectService.getSchedulesByStudentId(this.id).subscribe(
      val => {this.schedules = val;
      }
    );
  }

  finalFoundCheck(subject: any, sem: number): boolean {
    let x = false;
    for ( const mark of this.marks ) {
      if (mark.schedule.subject.id === subject.id && mark.markType.id > 3 && mark.semester === sem) {
        x = true;
      }
    }
    return x;
  }

  getActiveSemester(): void {
    this.markService.getActiveSemester().subscribe(
      s => {this.activeSemester = s;
      console.log(s);
      }
    );
  }

  getActiveUser(): void {
    this.loginService.getActiveUser().subscribe(
      u => {this.activeUser = u;

      }
    );
  }

  getRole(): string {
    return this.loginService.getRole();
  }
  goBack(): void {
    this.location.back();
  }
}
