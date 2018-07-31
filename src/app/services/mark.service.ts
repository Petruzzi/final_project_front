import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/User';
import { Mark } from '../models/Mark';
import { TokensPrivremeno } from '../models/TokenStore';
import { LoginService } from './login.service';
import { Subject } from '../models/Subject';
import { MessageService } from './message/message.service';
import { catchError , map , tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MarkService {



  constructor(private http: HttpClient,
              private loginService: LoginService,
              private messageService: MessageService) { }


  private baseUrl = 'http://localhost:8080/';

  // marks
  private getMarkByStudentId_parentUrl = this.baseUrl + 'mark/parent/get_by_student_id/';
  private getMarkByStudentIdUrl = this.baseUrl + 'mark/student/';
  private getMarkByStudentId_profUrl = this.baseUrl + 'mark/professor/get_by_student_id/';
  private getMarkByStudentId_adminUrl = this.baseUrl + 'mark/get_by_student_id/';
  private getMarkId_userUrl = this.baseUrl + 'mark/user/';
  private baseMark_profUrl = this.baseUrl + 'mark/professor/';
  private baseMarkUrl = this.baseUrl + 'mark/';



  // active semester
  private getActiveSemesterUrl = this.baseUrl + 'school_year/get_active_semester/';





  getMarkByStudentId(id: number): Observable<Mark[]> {

    if (this.loginService.getRole() === 'ROLE_STUDENT') {
      return this.http.get<Mark[]>(this.getMarkByStudentIdUrl + id, {headers: this.loginService.getAuthHeader()})
      .pipe(
        tap(x => {
                  this.consoleLog(`Fetched marks by student id`);
                }),
        catchError(this.handleError('getMarkByStudentId', undefined ))
      );


    } else if (this.loginService.getRole() === 'ROLE_PARENT') {
      return this.http.get<Mark[]>(this.getMarkByStudentId_parentUrl + id, {headers: this.loginService.getAuthHeader()})
      .pipe(
        tap(x => {
                  this.consoleLog(`Fetched marks by student id`);
                }),
        catchError(this.handleError('getMarkByStudentId', undefined ))
      );


    } else if (this.loginService.getRole() === 'ROLE_PROFESSOR') {
      return this.http.get<Mark[]>(this.getMarkByStudentId_profUrl + id, {headers: this.loginService.getAuthHeader()})
      .pipe(
        tap(x => {
                  this.consoleLog(`Fetched marks by student id`);
                }),
        catchError(this.handleError('getMarkByStudentId', undefined ))
      );


    } else if (this.loginService.getRole() === 'ROLE_ADMIN') {
      return this.http.get<Mark[]>( this.getMarkByStudentId_adminUrl + id, {headers: this.loginService.getAuthHeader()})
      .pipe(
        tap(x => {
                  this.consoleLog(`Fetched marks by student id`);
                }),
        catchError(this.handleError('getMarkByStudentId', undefined ))
      );

    }
  }

  getMarkById(id: number): Observable<Mark> {
    return this.http.get<Mark>( this.getMarkId_userUrl + id, {headers: this.loginService.getAuthHeader()})
    .pipe(
      tap(x => {
                this.consoleLog(`Fetched mark - id:${x.id}`);
              }),
      catchError(this.handleError('getMarkById', undefined ))
    );

  }


  addNewMark(m: any): Observable<Mark> {
    if ( this.loginService.getRole() === 'ROLE_ADMIN') {
      return this.http.post<Mark>( this.baseMarkUrl , m, {headers: this.loginService.getAuthHeader()})
      .pipe(
        tap(x => { this.log(`Mark successfully added`);
                  this.consoleLog(`Mark successfully added - id:${x.id}`);
                }),
        catchError(this.handleError('addNewMark', undefined ))
      );

    } else if (this.loginService.getRole() === 'ROLE_PROFESSOR' ) {
      return this.http.post<Mark>( this.baseMark_profUrl , m, {headers: this.loginService.getAuthHeader()})
      .pipe(
        tap(x => { this.log(`Mark successfully added`);
                  this.consoleLog(`Mark successfully added - id:${x.id}`);
                }),
        catchError(this.handleError('addNewMark', undefined ))
      );

    }
  }


  putMark(m: any): Observable<Mark> {
    console.log(m);
    if ( this.loginService.getRole() === 'ROLE_ADMIN') {
      return this.http.put<Mark>( this.baseMarkUrl + m.id , m, {headers: this.loginService.getAuthHeader()})
      .pipe(
        tap(x => { this.log(`Mark successfully updated`);
                  this.consoleLog(`Mark successfully updated - id:${x.id}`);
                }),
        catchError(this.handleError('putMark', undefined ))
      );

    } else if (this.loginService.getRole() === 'ROLE_PROFESSOR' ) {
      return this.http.put<Mark>( this.baseMark_profUrl + m.id , m, {headers: this.loginService.getAuthHeader()})
      .pipe(
        tap(x => { this.log(`Mark successfully updated`);
                  this.consoleLog(`Mark successfully updated - id:${x.id}`);
                }),
        catchError(this.handleError('putMark', undefined ))
      );
    }
 }

 deleteMark(id: number): Observable<Mark> {
  if (this.loginService.getRole() === 'ROLE_PROFESSOR') {
    return this.http.delete<Mark>( this.baseMark_profUrl + id , {headers: this.loginService.getAuthHeader()})
    .pipe(
      tap(x => { this.log(`Mark successfully deleted`);
                this.consoleLog(`Mark successfully deleted - id:${x.id}`);
              }),
      catchError(this.handleError('deleteMark', undefined ))
    );

  } else if (this.loginService.getRole() === 'ROLE_ADMIN') {
      return this.http.delete<Mark>( this.baseMarkUrl + id , {headers: this.loginService.getAuthHeader()})
      .pipe(
        tap(x => { this.log(`Mark successfully deleted`);
                  this.consoleLog(`Mark successfully deleted - id:${x.id}`);
                }),
        catchError(this.handleError('deleteMark', undefined ))
      );
  }



 }


 getActiveSemester(): Observable<number> {
  return this.http.get<number>( this.getActiveSemesterUrl, {headers: this.loginService.getAuthHeader()})
  .pipe(
    tap(x => {
              this.consoleLog(`Fetched active semester`);
            }),
    catchError(this.handleError('getActiveSemester', undefined ))
  );
 }







  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.error.code}. ${error.error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add('MarkService: ' + message);
  }

  private consoleLog(message: string) {
    console.log('MarkService: ' + message);
  }
}
