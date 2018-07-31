import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { LoginService } from './services/login.service';
import { StudentListComponent } from './components/student/student-list/student-list.component';
import { EditProfileComponent } from './components/home/edit-profile/edit-profile.component';
import { StudentMarksComponent } from './components/student/student-marks/student-marks.component';
import { ClassListComponent } from './components/class/class-list/class-list.component';
import { ClassDetailsComponent } from './components/class/class-details/class-details.component';
import { ProfessorListComponent } from './components/professor/professor-list/professor-list.component';
import { ParentListComponent } from './components/parent/parent-list/parent-list.component';
import { ProfileComponent } from './components/home/profile/profile.component';
import {  FormsModule } from '@angular/forms';
import { ListComponent } from './components/home/list/list.component';
import { LoginComponent } from './components/login/login.component';
import { ClassEditComponent } from './components/class/class-edit/class-edit.component';
import * as $ from 'jquery';
import { MarkViewComponent } from './components/student/student-marks/mark-view/mark-view.component';
import { AddMarkComponent } from './components/student/student-marks/add-mark/add-mark.component';
import { AddUserComponent } from './components/home/add-user/add-user.component';
import { SubjectListComponent } from './components/subject/subject-list/subject-list.component';
import { SubjectViewComponent } from './components/subject/subject-view/subject-view.component';
import { SubjectEditComponent } from './components/subject/subject-edit/subject-edit.component';
import { ScheduleListComponent } from './components/schedule/schedule-list/schedule-list.component';
import { ScheduleEditComponent } from './components/schedule/schedule-edit/schedule-edit.component';
import { ScheduleViewComponent } from './components/schedule/schedule-view/schedule-view.component';
import { MessageComponent } from './components/message/message.component';
import { MarkViewProfComponent } from './components/student/student-marks/mark-view-prof/mark-view-prof.component';
import { LogComponent } from './components/log/log.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StudentListComponent,
    EditProfileComponent,
    StudentMarksComponent,
    ClassListComponent,
    ClassDetailsComponent,
    ProfessorListComponent,
    ParentListComponent,
    ProfileComponent,
    ListComponent,
    LoginComponent,
    ClassEditComponent,
    MarkViewComponent,
    MarkViewProfComponent,
    AddMarkComponent,
    AddUserComponent,
    SubjectListComponent,
    SubjectViewComponent,
    SubjectEditComponent,
    ScheduleListComponent,
    ScheduleEditComponent,
    ScheduleViewComponent,
    MessageComponent,
    LogComponent,

  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
