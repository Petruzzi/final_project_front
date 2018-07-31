import { Component, OnInit } from '@angular/core';
import { Schedule } from '../../../models/Schedule';
import { ActivatedRoute } from '@angular/router';
import { SubjectService } from '../../../services/subject.service';
import {Location} from '@angular/common';



@Component({
  selector: 'app-schedule-view',
  templateUrl: './schedule-view.component.html',
  styleUrls: ['./schedule-view.component.css']
})
export class ScheduleViewComponent implements OnInit {



  schedule: Schedule;



  constructor(private location: Location,
              private route: ActivatedRoute,
              private subjectService: SubjectService) { }



  ngOnInit() {
    this.getSchedule();
  }
















  getSchedule() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.subjectService.getScheduleById(id).subscribe(
      s => {this.schedule = s;
      console.log(s);
      }
    );
  }



  deleteSchedule() {
    this.subjectService.deleteSchedule(this.schedule.id).subscribe(
      () => this.goBack()
    );
  }



  goBack(): void {
    this.location.back();
  }









}
