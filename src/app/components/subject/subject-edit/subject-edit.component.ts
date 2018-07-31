import { Component, OnInit } from '@angular/core';
import { Subject } from '../../../models/Subject';
import { ActivatedRoute } from '@angular/router';
import { SubjectService } from '../../../services/subject.service';
import {Location} from '@angular/common';



@Component({
  selector: 'app-subject-edit',
  templateUrl: './subject-edit.component.html',
  styleUrls: ['./subject-edit.component.css']
})
export class SubjectEditComponent implements OnInit {

  subjectNames: any[];
  subject: Subject;


  constructor(private route: ActivatedRoute,
              private location: Location,
              private subjectService: SubjectService) { }

  ngOnInit() {
    this.getSubject();
    this.getSubjectNames();
  }




  getSubject() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id > 0) {
        this.subjectService.getSubjectById(id).subscribe(
          c => this.subject = c
        );
    } else {
      this.subject = {
        'id': 0,
        'subjectStatus': null,
        'affectAvg': null,
        'classLoad': null,
        'grade': null,
        'schedules': null,
        'subject': null,
        'professors': null
      };
    }
  }


    getSubjectNames() {
      this.subjectService.getAllSubjectNames().subscribe(
        s => this.subjectNames = s
      );
    }


updateSubject(subjectStatus?: string, affectAvg?: string, classLoad?: number, subjectGrade?: string, sub?: string) {

  if (this.subject.id === 0 ) {
    this.subject.subjectStatus = subjectStatus;
    this.subject.affectAvg = affectAvg;
    this.subject.classLoad = classLoad;
    this.subject.grade = subjectGrade;
    this.subject.subject = sub;
  } else {
    this.subject.grade = this.subject.grade.id;
    this.subject.subject = this.subject.subject.id;
  }

this.subjectService.saveSubject(this.subject).subscribe(
  _ => this.goBack()
);

}

  goBack() {
    this.location.back();
  }

}




