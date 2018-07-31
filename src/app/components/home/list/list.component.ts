import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../models/User';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() list: User[];

  constructor() { }

  ngOnInit() {
  }

}
