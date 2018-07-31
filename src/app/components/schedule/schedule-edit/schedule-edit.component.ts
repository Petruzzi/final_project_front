import { Component, OnInit } from '@angular/core';
import { Schedule } from '../../../models/Schedule';
import { ActivatedRoute } from '@angular/router';
import { SubjectService } from '../../../services/subject.service';
import { User } from '../../../models/User';
import { Subject } from '../../../models/Subject';
import { Class } from '../../../models/Class';
import { ClassService } from '../../../services/class.service';
import { UserService } from '../../../services/user.service';
import {Location} from '@angular/common';



@Component({
  selector: 'app-schedule-edit',
  templateUrl: './schedule-edit.component.html',
  styleUrls: ['./schedule-edit.component.css']
})
export class ScheduleEditComponent implements OnInit {

  schedule: Schedule;
  allTeachers: User[];
  allSubjects: Subject[];
  allClasses: Class[];



  constructor(private route: ActivatedRoute,
              private subjectService: SubjectService,
              private classService: ClassService,
              private location: Location,
              private userService: UserService) { }

  ngOnInit() {
    this.getSchedule();
    this.getAllClasses();
    this.getAllSubjects();
    this.getAllTeachers();
  }

  getSchedule() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id > 0) {
        this.subjectService.getScheduleById(id).subscribe(
          c => this.schedule = c
        );
    } else {
      this.schedule = {
        'id': 0,
        'teacher': null,
        'subject': null,
        'schoolYear': null,
        'classEntity': null
      };
    }

  }


  getAllClasses() {
    this.classService.getAllClasses().subscribe(
      c => this.allClasses = c
    );
  }

  getAllTeachers() {
    this.userService.getAllProfessors().subscribe(
      c => this.allTeachers = c
    );
  }
  getAllSubjects() {
    this.subjectService.getAllSubjects().subscribe(
      c => this.allSubjects = c
      );
  }



editSchedule(teacher?: string, subject?: string, cls?: string) {

  if (this.schedule.id === 0) {
    this.schedule.teacher = teacher;
    this.schedule.subject = subject;
    this.schedule.classEntity = cls;
  } else { // ulazi ako radi put
    this.schedule.teacher = this.schedule.teacher.id;
    this.schedule.subject = null;
    this.schedule.classEntity = null;
  }

  this.subjectService.saveSchedule(this.schedule).subscribe(
    _ => this.goBack()
  );

}


goBack() {
  this.location.back();
}

}
