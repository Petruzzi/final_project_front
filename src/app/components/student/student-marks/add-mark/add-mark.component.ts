import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mark } from '../../../../models/Mark';
import { Location } from '@angular/common';
import { MarkService } from '../../../../services/mark.service';

@Component({
  selector: 'app-add-mark',
  templateUrl: './add-mark.component.html',
  styleUrls: ['./add-mark.component.css']
})
export class AddMarkComponent implements OnInit {

  mark = new Mark;
  type: number;
  opt: string;


  constructor(private route: ActivatedRoute,
              private markService: MarkService,
              private location: Location) { }

  ngOnInit() {
    this.opt = this.route.snapshot.paramMap.get('opt');
    console.log(this.opt);
    if (this.opt === 'edit') {
      console.log('usao u edit');
      const id = +this.route.snapshot.paramMap.get('id');
      this.getMarkById(id);




    } else if (this.opt === 'add') {
      console.log('usao u addd');
      this.mark.student = +this.route.snapshot.paramMap.get('stuId');
      this.mark.schedule = +this.route.snapshot.paramMap.get('schId');
      this.type = +this.route.snapshot.paramMap.get('type');
      console.log(this.mark.student);
      console.log(this.mark.schedule);
      console.log(this.type === 1);
    }




  }

  editMark() {
    console.log(this.mark.markValue);
    console.log(this.mark.markType);
    console.log(this.mark.description);

    const markBody = {
      'id': this.mark.id,
      'markValue':  this.mark.markValue,
      'markType':  this.mark.markType.id,
      'description':  this.mark.description,
   //   'dateRated': reversedDate,
  //   'student': this.mark.student,
      'schedule': this.mark.schedule.id
    };


    this.markService.putMark(markBody).subscribe(
      m => {this.mark = m;
        this.location.back();
      }
    );
  }

  addMark(markValue: any, markType: any, description: any, date: any) {
    let reversedDate = null;
    console.log(date !== false);
    if ( date !== '') {
      console.log('usao');
      reversedDate = this.reverseDate(date);
    }

    console.log(markValue);
    console.log(markType);
    console.log(markType.id);
    console.log(description);
    console.log(reversedDate);

    const markBody = {
      'markValue': markValue,
      'markType': markType,
      'description': description,
      'dateRated': reversedDate,
      'student': this.mark.student,
      'schedule': this.mark.schedule
    };
    this.markService.addNewMark(markBody).subscribe (
      () => this.location.back()
    );

  }


  reverseDate(date: string): string {
    const arr = date.split('-');
    const str = arr[0];

    arr[0] = arr[2];
    arr[2] = str;

    return arr.join('-');

  }


  getMarkById(id: number) {
    this.markService.getMarkById(id).subscribe(
      m => {this.mark = m;
 console.log(this.mark.markType);
 console.log(this.mark.markType.id === 1);
 console.log(this.mark.markType.id === '1');
      }
    );
  }


  goBack(): void {
    this.location.back();
  }







  test( ) {
// markValue: any, markType: any, description: any,

    console.log(this.mark.markValue);
    console.log(this.mark.markType);
    console.log(this.mark.description);




  }





}
