import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../components/home/home.component';
import { StudentListComponent } from '../components/student/student-list/student-list.component';
import { EditProfileComponent } from '../components/home/edit-profile/edit-profile.component';
import { StudentMarksComponent } from '../components/student/student-marks/student-marks.component';
import { ClassListComponent } from '../components/class/class-list/class-list.component';
import { ClassDetailsComponent } from '../components/class/class-details/class-details.component';
import { ProfessorListComponent } from '../components/professor/professor-list/professor-list.component';
import { ParentListComponent } from '../components/parent/parent-list/parent-list.component';
import { LoginComponent } from '../components/login/login.component';
import { AppComponent } from '../app.component';
import { ProfileComponent } from '../components/home/profile/profile.component';
import { ClassEditComponent } from '../components/class/class-edit/class-edit.component';
import { MarkViewComponent } from '../components/student/student-marks/mark-view/mark-view.component';
import { AddMarkComponent } from '../components/student/student-marks/add-mark/add-mark.component';
import { AddUserComponent } from '../components/home/add-user/add-user.component';
import { SubjectListComponent } from '../components/subject/subject-list/subject-list.component';
import { SubjectViewComponent } from '../components/subject/subject-view/subject-view.component';
import { SubjectEditComponent } from '../components/subject/subject-edit/subject-edit.component';
import { ScheduleListComponent } from '../components/schedule/schedule-list/schedule-list.component';
import { ScheduleViewComponent } from '../components/schedule/schedule-view/schedule-view.component';
import { ScheduleEditComponent } from '../components/schedule/schedule-edit/schedule-edit.component';
import { LogComponent } from '../components/log/log.component';

const routes: Routes = [
 // {path: 'app', component: AppComponent, children:[
    {path: 'login', component: LoginComponent},
      {path: '', component: HomeComponent, children: [

          {path: 'profile/:id', component: ProfileComponent},
          {path: 'edit_profile/:id', component: EditProfileComponent},
          {path: 'add_user/:opt', component: AddUserComponent},

          {path: 'professors', component: ProfessorListComponent},
          {path: 'parents', component: ParentListComponent},
          {path: 'students', component: StudentListComponent},


          {path: 'student_marks/:id', component: StudentMarksComponent},
          {path: 'mark/:id', component: MarkViewComponent},
          {path: 'add_mark/:opt/:stuId/:schId/:type', component: AddMarkComponent},
          {path: 'add_mark/:opt/:id', component: AddMarkComponent},

          {path: 'class_list/:id', component: ClassListComponent},
          {path: 'class_list', component: ClassListComponent},
          {path: 'class_details/:options/:id', component: ClassDetailsComponent},
          {path: 'edit_class/:id', component: ClassEditComponent},



          {path: 'subject_list', component: SubjectListComponent},
          {path: 'subject_view/:id', component: SubjectViewComponent},
          {path: 'subject_edit/:id', component: SubjectEditComponent},

          {path: 'schedule_list', component: ScheduleListComponent},
          {path: 'schedule_view/:id', component: ScheduleViewComponent},
          {path: 'schedule_edit/:id', component: ScheduleEditComponent},

          {path: 'log_view', component: LogComponent},

      ]},
      // {path: 'heroes',component:HeroesComponent},
      // {path: 'dashboard',component:DashboardComponent},
      // {path: '', redirectTo:'/dashboard', pathMatch:'full'},
      // {path: 'detail/:id',component:HeroDetailComponent},
      // {path: 'add', component: HeroAddComponent},
    ];

//  ]},







@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }




// PRIMER IZ TOH


// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule,Routes } from '@angular/router';
// import { HeroesComponent } from './heroes/heroes.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { HeroDetailComponent } from './hero-detail/hero-detail.component';
// import { HeroAddComponent } from './hero-add/hero-add.component';

// const routes : Routes=[
//   {path:'heroes',component:HeroesComponent},
//   {path:'dashboard',component:DashboardComponent},
//   {path:'',redirectTo:'/dashboard', pathMatch:'full'},
//   {path:'detail/:id',component:HeroDetailComponent},
//   {path:'add',component:HeroAddComponent},
// ];


// @NgModule({
//   imports:[RouterModule.forRoot(routes)],
//   exports:[RouterModule],
//   declarations: []
// })
// export class AppRoutingModule { }
