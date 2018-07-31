import { Component, OnInit } from '@angular/core';
import { Mark } from '../../../../models/Mark';
import { MarkService } from '../../../../services/mark.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LoginService } from '../../../../services/login.service';
import { User } from '../../../../models/User';

@Component({
  selector: 'app-mark-view',
  templateUrl: './mark-view.component.html',
  styleUrls: ['./mark-view.component.css']
})
export class MarkViewComponent implements OnInit {

  mark: Mark;
  activeUser: User;

  constructor(private markService: MarkService,
              private loginService: LoginService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    this.getMark();
    if (this.getRole() === 'ROLE_PROFESSOR') {
      this.getActiveUser();
    }
  }



  getMark() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.markService.getMarkById(id).subscribe(
      m =>  this.mark = m
    );
  }

  getActiveUser(): void {
    this.loginService.getActiveUser().subscribe(
      u => {this.activeUser = u;

      }
    );
  }


  deleteMark(): void {
    this.markService.deleteMark(this.mark.id).subscribe(
     _ => this.goBack()
    );
  }

  getRole(): string {
    return this.loginService.getRole();
  }

  goBack(): void {
    this.location.back();
  }
}
