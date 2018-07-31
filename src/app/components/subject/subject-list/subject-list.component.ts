import { Component, OnInit } from '@angular/core';
import { Subject } from '../../../models/Subject';
import { SubjectService } from '../../../services/subject.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {

  allSubjects: Subject[];



  constructor(private subjectService: SubjectService,
              private loginService: LoginService) { }

  ngOnInit() {

    this.getAllSubjects();
  }


  getAllSubjects() {
    this.subjectService.getAllSubjects().subscribe(
      s => this.allSubjects = s
    );
  }

  getRole(): string {
    return this.loginService.getRole();
  }
}
