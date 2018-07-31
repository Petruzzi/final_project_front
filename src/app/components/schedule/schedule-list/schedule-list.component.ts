import { Component, OnInit } from '@angular/core';
import { Schedule } from '../../../models/Schedule';
import { SubjectService } from '../../../services/subject.service';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {

  allSchedules: Schedule[];


  constructor(private subjectService: SubjectService) { }

  ngOnInit() {
    this.getAllSchedules();

  }




  getAllSchedules() {
    this.subjectService.getAllSchedules().subscribe(
      s => this.allSchedules = s
    );
  }

}
