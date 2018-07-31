import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Subject } from '../models/Subject';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { Schedule } from '../models/Schedule';
import { MessageService } from './message/message.service';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private baseUrl = 'http://localhost:8080/';




  // subject
  private getSubjectsByStudentIdUrl = this.baseUrl + 'subject_grade/get_subject_by_student_id/';
  private baseSubjectGrades_userUrl = this.baseUrl + 'subject_grade/user/';
  private baseSubjectGradesUrl = this.baseUrl + 'subject_grade/';
  private baseSubjectUrl = this.baseUrl + 'subject/';


  // schedule
  private baseScheduleUrl = this.baseUrl + 'schedule/';
  private getSchedulesByStudentIdUrl = this.baseUrl + 'schedule/user/get_schedules_by_student_id/';

  constructor(private http: HttpClient,
              private loginService: LoginService,
              private messageService: MessageService) { }



  getAllSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.baseSubjectGradesUrl, {headers: this.loginService.getAuthHeader()})
    .pipe(
      tap(x => {
                this.consoleLog(`Fetched subjects`);
              }),
      catchError(this.handleError('getAllSubjects', undefined ))
    );
  }

  getAllSubjectNames(): Observable<any[]> {
    return this.http.get<any[]>(this.baseSubjectUrl, {headers: this.loginService.getAuthHeader()})
    .pipe(
      tap(x => {
                this.consoleLog(`Fetched subject names`);
              }),
      catchError(this.handleError('getAllSubjectNames', undefined ))
    );
  }

  getSubjectsByStudentId(id: number): Observable<Subject[]>  {
    return this.http.get<Subject[]>(this.getSubjectsByStudentIdUrl + id, {headers: this.loginService.getAuthHeader()})
    .pipe(
      tap(x => {
                this.consoleLog(`Fetched subjects by student id`);
              }),
      catchError(this.handleError('getSubjectsByStudentId', undefined ))
    );
  }

  getSubjectById(id: number): Observable<Subject> {
    return this.http.get<Subject>(this.baseSubjectGradesUrl + id, {headers: this.loginService.getAuthHeader()})
    .pipe(
      tap(x => {
                this.consoleLog(`Fetched subject by id - id:${x.id}`);
              }),
      catchError(this.handleError('getSubjectById', undefined ))
    );
  }

  saveSubject(s: Subject): Observable<Subject> {
    if (s.id > 0) {
      return this.http.put<Subject>(this.baseSubjectGradesUrl + s.id, s, {headers: this.loginService.getAuthHeader()})
      .pipe(
        tap(x => { this.log(`Subject successfully updated`);
                  this.consoleLog(`Subject successfully updated - id:${x.id}`);
                }),
        catchError(this.handleError('saveSubject', undefined ))
      );

    } else {
      return this.http.post<Subject>(this.baseSubjectGradesUrl, s, {headers: this.loginService.getAuthHeader()})
      .pipe(
        tap(x => { this.log(`Subject successfully added`);
                  this.consoleLog(`Subject successfully added - id:${x.id}`);
                }),
        catchError(this.handleError('saveSubject', undefined ))
      );
    }
  }



  deleteSubject(id: number): Observable<Subject> {
    return this.http.delete<Subject>(this.baseSubjectGradesUrl + id, {headers: this.loginService.getAuthHeader()})
    .pipe(
      tap(x => { this.log(`Subject successfully deleted`);
                this.consoleLog(`Subject successfully deleted - id:${x.id}`);
              }),
      catchError(this.handleError('deleteSubject', undefined ))
    );
  }

// ##############################################################################################
// ############################## SCHEDULES ################################################################
// ###################################################################################################

  getAllSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.baseScheduleUrl , {headers: this.loginService.getAuthHeader()})
    .pipe(
      tap(x => {
                this.consoleLog(`Fetched all schedules`);
              }),
      catchError(this.handleError('getAllSchedules', undefined ))
    );
  }


  getScheduleById(id: number): Observable<Schedule> {
    return this.http.get<Schedule>(this.baseScheduleUrl + id, {headers: this.loginService.getAuthHeader()})
    .pipe(
      tap(x => {
                this.consoleLog(`Fetched schedule - id:${x.id}`);
              }),
      catchError(this.handleError('getScheduleById', undefined ))
    );
  }

  saveSchedule(s: Schedule): Observable<Schedule> {
    if (s.id > 0) {
      return this.http.put<Schedule>(this.baseScheduleUrl + s.id, s, {headers: this.loginService.getAuthHeader()})
      .pipe(
        tap(x => { this.log(`Schedule successfully updated`);
                  this.consoleLog(`Schedule successfully updated - id:${x.id}`);
                }),
        catchError(this.handleError('saveSchedule', undefined ))
      );

    } else {
      return this.http.post<Schedule>(this.baseScheduleUrl, s, {headers: this.loginService.getAuthHeader()})
      .pipe(
        tap(x => { this.log(`Schedule successfully added`);
                  this.consoleLog(`Schedule successfully added - id:${x.id}`);
                }),
        catchError(this.handleError('saveSchedule', undefined ))
      );
    }
  }


  deleteSchedule(id: number): Observable<Schedule> {
    return this.http.delete<Schedule>(this.baseScheduleUrl + id, {headers: this.loginService.getAuthHeader()})
    .pipe(
      tap(x => { this.log(`Schedule successfully deleted`);
                this.consoleLog(`Schedule successfully deleted - id:${x.id}`);
              }),
      catchError(this.handleError('deleteSchedule', undefined ))
    );
  }

  getSchedulesByStudentId(id: number): Observable<Schedule[]>  {
    return this.http.get<Schedule[]>(this.getSchedulesByStudentIdUrl + id, {headers: this.loginService.getAuthHeader()})
    .pipe(
      tap(x => {
                this.consoleLog(`Fetched schedules by student id`);
              }),
      catchError(this.handleError('getSchedulesByStudentId', undefined ))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.error.code}. ${error.error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add('SubjectService: ' + message);
  }

  private consoleLog(message: string) {
    console.log('SubjectService: ' + message);
  }

}
