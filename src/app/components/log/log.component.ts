import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  constructor(private userService: UserService) { }

  logStr: string;


  ngOnInit() {
    this.getLog();
  }

  getLog() {
    this.userService.getLogStr().subscribe(
      l => this.logStr = l
    );
  }

}
