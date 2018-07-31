import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Class } from '../models/Class';
import { TokensPrivremeno } from '../models/TokenStore';
import { LoginService } from './login.service';
import { Subject } from '../models/Subject';
import { MessageService } from './message/message.service';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClassService {


  private baseUrl = 'http://localhost:8080/';

  // class
  private getClassesByProf_profUrl = this.baseUrl + 'class/professor/by_prof/';
  private getClassesByProf_adminUrl = this.baseUrl + 'class/by_prof/';
  private getClassByHeadTeacherUrl = this.baseUrl + 'class/professor/by_head_teacher/';
  private getClassById_userUrl = this.baseUrl + 'class/user/';
  private getClassByIdUrl = this.baseUrl + 'class/';
  private getClassByStudentIdUrl = this.baseUrl + 'class/user/by_student_id/';
  private baseClassUrl = this.baseUrl + 'class/';




  constructor(private http: HttpClient,
              private loginService: LoginService,
              private messageService: MessageService) { }



  getAllClasses(): Observable<Class[]> {
    return this.http.get<Class[]>(this.baseClassUrl , {headers: this.loginService.getAuthHeader()})
    .pipe(
      tap(x => {
                this.consoleLog(`Fetched all classes`);
              }),
      catchError(this.handleError('getAllClasses', undefined ))
    );
  }


  getClassesByProfId(id: number): Observable<Class[]> {
    if (id > 0) {
      if (this.loginService.getRole() === 'ROLE_PROFESSOR') {
          return this.http.get<Class[]>(this.getClassesByProf_profUrl + id, {headers: this.loginService.getAuthHeader()})
          .pipe(
            tap(x => {
                      this.consoleLog(`Fetched all classes by prof id`);
                    }),
            catchError(this.handleError('getClassesByProfId', undefined ))
          );
      } else if (this.loginService.getRole() === 'ROLE_ADMIN') {
          return this.http.get<Class[]>(this.getClassesByProf_adminUrl + id, {headers: this.loginService.getAuthHeader()})
          .pipe(
            tap(x => {
                      this.consoleLog(`Fetched all classes by prof id`);
                    }),
            catchError(this.handleError('getClassesByProfId', undefined ))
          );
      }
    } else  {
       return this.http.get<Class[]>(this.getClassesByProf_profUrl, {headers: this.loginService.getAuthHeader()})
       .pipe(
        tap(x => {
                  this.consoleLog(`Fetched all classes by prof id`);
                }),
        catchError(this.handleError('getClassesByProfId', undefined ))
      );
    }
  }

  getClassByStudentId(id: number): Observable<Class> {
    return this.http.get<Class>(this.getClassByStudentIdUrl + id, {headers: this.loginService.getAuthHeader()})
    .pipe(
      tap(x => {
                this.consoleLog(`Fetched class by student id - id:${x.id}`);
              }),
      catchError(this.handleError('getClassByStudentId', undefined ))
    );
  }

  getClassById(id: number, options: string): Observable<Class> {
    if ( options === 'by_head_teacher') {
      return this.http.get<Class>(this.getClassByHeadTeacherUrl + id, {headers: this.loginService.getAuthHeader()})
      .pipe(
        tap(x => {
                    this.consoleLog(`Fetched class - id:${x.id}`);
                }),
        catchError(this.handleError('getClassById', undefined ))
      );
    } else if ( options === 'by_class_id') {
      if (this.loginService.getRole() === 'ROLE_ADMIN') {
        return this.http.get<Class>(this.getClassByIdUrl + id, {headers: this.loginService.getAuthHeader()})
        .pipe(
          tap(x => {
                    this.consoleLog(`Fetched class - id:${x.id}`);
                  }),
          catchError(this.handleError('getClassById', undefined ))
        );
      } else {
        return this.http.get<Class>(this.getClassById_userUrl + id, {headers: this.loginService.getAuthHeader()})
        .pipe(
          tap(x => {
                    this.consoleLog(`Fetched class - id:${x.id}`);
                  }),
          catchError(this.handleError('getClassById', undefined ))
        );
      }
    }

  }

  updateClass(cls: any): Observable<Class> {
    if (cls.id > 0) {
      return this.http.put<Class>(this.baseClassUrl + cls.id, cls, {headers: this.loginService.getAuthHeader()})
      .pipe(
        tap(x => { this.log(`Class successfully updated`);
                  this.consoleLog(`Class successfully updated - id:${x.id}`);
                }),
        catchError(this.handleError('updateClass', undefined ))
      );
    } else {
      return this.http.post<Class>(this.baseClassUrl, cls, {headers: this.loginService.getAuthHeader()})
      .pipe(
        tap(x => { this.log(`Class successfully added`);
        console.log(x);
                  this.consoleLog(`Class successfully added - id:${x.id}`);
                }),
        catchError(this.handleError('updateClass', undefined ))
      );
    }
  }


  deleteClass(id: number): Observable<Class> {
    return this.http.delete<Class>(this.baseClassUrl + id, {headers: this.loginService.getAuthHeader()})
    .pipe(
      tap(x => { this.log(`Class successfully deleted`);
                this.consoleLog(`Class successfully deleted - id:${x.id}`);
              }),
      catchError(this.handleError('deleteClass', undefined ))
    );
  }



  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
     // console.log(error);
      this.log(`${operation} failed: ${error.error.code}. ${error.error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add('ClassService: ' + message);
  }

  private consoleLog(message: string) {
    console.log('ClassService: ' + message);
  }



}


