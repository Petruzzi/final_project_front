import { Component, OnInit } from '@angular/core';
import { ClassService } from '../../../services/class.service';
import { Class } from '../../../models/Class';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import {Location} from '@angular/common';



@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.css']
})
export class ClassDetailsComponent implements OnInit {

  oneClass: Class;

  constructor(private route: ActivatedRoute,
              private classService: ClassService,
              private location: Location,
              private loginService: LoginService) { }

  ngOnInit() {
    this.getClassById();

    $('.btn').removeClass('active');
    $('#classBtn').addClass('active');
  }

  getClassById(): void {

    const id = +this.route.snapshot.paramMap.get('id');
    const options = this.route.snapshot.paramMap.get('options');
    this.classService.getClassById(id, options).subscribe(
      val => this.oneClass = val
      );
  }


  deleteClass() {
    this.classService.deleteClass(this.oneClass.id).subscribe(
      () => this.goBack()
    );
  }



  getRole(): string {
    return this.loginService.getRole();
  }


  goBack(): void {
    this.location.back();
  }

}
