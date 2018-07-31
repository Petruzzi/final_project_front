import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SubjectService } from '../../../services/subject.service';
import { Subject } from '../../../models/Subject';
import { LoginService } from '../../../services/login.service';


@Component({
  selector: 'app-subject-view',
  templateUrl: './subject-view.component.html',
  styleUrls: ['./subject-view.component.css']
})
export class SubjectViewComponent implements OnInit {


  subject: Subject;


  constructor(private location: Location,
              private route: ActivatedRoute,
              private subjectService: SubjectService,
              private loginService: LoginService) { }

  ngOnInit() {
    this.getSubject();
  }



  getSubject() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.subjectService.getSubjectById(id).subscribe(
      s => this.subject = s
    );
  }


  deleteSubject() {
    this.subjectService.deleteSubject(this.subject.id).subscribe(
      () => this.goBack()
    );
  }


  getRole() {
    return this.loginService.getRole();
  }



  goBack(): void {
    this.location.back();
  }


}
