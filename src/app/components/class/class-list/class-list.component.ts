import { Component, OnInit } from '@angular/core';
import { ClassService } from '../../../services/class.service';
import { Class } from '../../../models/Class';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit {


  classes: Class[];

  constructor(private route: ActivatedRoute,
              private classService: ClassService,
              private loginService: LoginService) { }

  ngOnInit() {
    if (this.loginService.getRole() === 'ROLE_ADMIN') {
      this.getAllClasses();
    } else if (this.loginService.getRole() === 'ROLE_PROFESSOR') {
      this.getClassesByProfId();
    }

  }



  getClassesByProfId(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.classService.getClassesByProfId(id).subscribe(
      val => this.classes = val
    );
  }

  getAllClasses() {
    this.classService.getAllClasses().subscribe(
      c => this.classes = c
    );
  }

  getRole(): string {
    return this.loginService.getRole();
  }

}
