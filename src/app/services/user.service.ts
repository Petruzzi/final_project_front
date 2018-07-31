import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/User';
import { Mark } from '../models/Mark';
import { TokensPrivremeno } from '../models/TokenStore';
import { LoginService } from './login.service';
import { PassChange } from '../models/PassChange';
import { MessageService } from './message/message.service';
import { map, catchError, tap } from 'rxjs/operators';
import { Message } from '../models/Message';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/';

  // student
  private studentBaseUrl = this.baseUrl + 'student/';
  private studentBase_studentUrl = this.baseUrl + 'student/student/';
  private getStudentsByParentTokenUrl = this.baseUrl + 'parent/parent/find_students/';
  private getStudentByStrUrl = this.baseUrl + 'student/find_by_string/';


  // prof
   private professorBaseUrl = this.baseUrl + 'professor/';
   private professorBase_profUrl = this.baseUrl + 'professor/professor/';


  // parent
  private parentBaseUrl = this.baseUrl + 'parent/';
  private parentBase_parentUrl = this.baseUrl + 'parent/parent/';

  // admin
  private adminBaseUrl = this.baseUrl + 'admin/';
  private resetPassword_adminUrl = this.baseUrl + 'admin/reset_password/';

  // user
  private getUserUrl = this.baseUrl + 'user/';
  private getUser_adminUrl = this.baseUrl + 'user/admin/';
  private changeUserPassByTokenUrl = this.baseUrl + 'user/change_password/';


  // log
  private downloadLogUrl = this.baseUrl + 'admin/log_download/';
  private showLogUrl = this.baseUrl + 'admin/log/';


  constructor(private http: HttpClient,
              private loginService: LoginService,
              private router: Router,
              private messageService: MessageService) { }


  getStudents(): Observable<User[]> {
    if (this.loginService.getRole() === 'ROLE_ADMIN') { // get all students
      return this.http.get<User[]>(this.studentBaseUrl , {headers: this.loginService.getAuthHeader()})
      .pipe(
        tap(x => {
                  this.consoleLog(`Fetched All Students`);
                }),
        catchError(this.handleError('getStudents', undefined ))
      );

    } else if (this.loginService.getRole() === 'ROLE_PARENT') {
      return this.http.get<User[]>(this.getStudentsByParentTokenUrl , {headers: this.loginService.getAuthHeader()})
      .pipe(
        tap(x => {
                  this.consoleLog(`Fetched Students by Parent`);
                }),
        catchError(this.handleError('getStudents', undefined ))
      );


    }
  }

  getParents(): Observable<User[]> {
    return this.http.get<User[]>(this.parentBaseUrl , {headers: this.loginService.getAuthHeader()})
    .pipe(
      tap(x => {
                this.consoleLog(`Fetched All Parents`);
              }),
      catchError(this.handleError('getParents', undefined ))
    );
  }


  searchStudentsByStr(str: string): Observable<User[]> {
    return this.http.get<User[]>(this.getStudentByStrUrl + str , {headers: this.loginService.getAuthHeader()})
    .pipe(
      tap(x => {
                this.consoleLog(`Fetched students by string`);
              }),
      catchError(this.handleError('searchStudentsByStr', undefined ))
    );
  }



  getUser(id: number): Observable<User> {
    if ( id > 0 ) {
      if (this.loginService.getRole() === 'ROLE_ADMIN') {
        return  this.http.get<User>(this.getUser_adminUrl + id , {headers: this.loginService.getAuthHeader()})
        .pipe(
          tap(x => {
                        this.consoleLog(`Fetched User - id:${x.id}`);
                  }),
          catchError(this.handleError('getUser', undefined ))
        );

      } else {
        return  this.http.get<User>(this.getUserUrl + id , {headers: this.loginService.getAuthHeader()})
        .pipe(
          tap(x => {
            console.log(x);
                      this.consoleLog(`Fetched User - id:${x.id}`);
                  }),
          catchError(this.handleError('getUser', undefined ))
        );
      }
    }  else {
         return this.http.get<User>(this.getUserUrl, {headers: this.loginService.getAuthHeader()})
         .pipe(
          tap(x => {
                      this.consoleLog(`Fetched User - id:${x.id}`);
                  }),
          catchError(this.handleError('getUser', undefined ))
        );
     }
   }

  getAllProfessors(): Observable<User[]> {
    return this.http.get<User[]>(this.professorBaseUrl , {headers: this.loginService.getAuthHeader()})        .pipe(
      tap(x => {
                this.consoleLog(`Fetched All Professors`);
              }),
      catchError(this.handleError('getAllProfessors', undefined ))
    );
  }


  updateProfile(u: any): Observable<User> {
    let url: string;
 //   u.class = u.class.id;

    if ( this.loginService.getRole() === 'ROLE_ADMIN') {
      if (u.role.name === 'ROLE_ADMIN') {
        url = this.adminBaseUrl;
      } else if (u.role.name === 'ROLE_PROFESSOR') {
        url = this.professorBaseUrl;
      } else if (u.role.name === 'ROLE_PARENT') {
        url = this.parentBaseUrl;
      } else if (u.role.name === 'ROLE_STUDENT') {
        url = this.studentBaseUrl;
      }


    } else {

      if (u.role.name === 'ROLE_STUDENT') {
        url = this.studentBase_studentUrl;
      } else if (u.role.name === 'ROLE_PROFESSOR') {
        url = this.professorBase_profUrl;
      } else if (u.role.name === 'ROLE_PARENT') {
        url = this.parentBase_parentUrl;
      }

    }
    return this.http.put<User>(url + u.id , u, {headers: this.loginService.getAuthHeader()})
  .pipe(
      tap(x => { this.log(`Successfully updated user`);
                this.consoleLog(`Successfully updated user - id:${x.id}`);
              }),
      catchError(this.handleError('updateProfile', undefined ))
    );
  }


  addUser(u: any): Observable<User> {
    if (u.role === 2) {
      return this.http.post<User>(this.professorBaseUrl , u, {headers: this.loginService.getAuthHeader()})
      .pipe(
        tap(x => { this.log(`Professor successfully added`);
                  this.consoleLog(`Professor successfully added - id:${x.id}`);
                }),
        catchError(this.handleError('addUser', undefined ))
      );
    } else if (u.role === 3) {
      return this.http.post<User>(this.studentBaseUrl , u, {headers: this.loginService.getAuthHeader()})
      .pipe(
        tap(x => { this.log(`Student successfully added`);
                  this.consoleLog(`Student successfully added - id:${x.id}`);
                }),
        catchError(this.handleError('addUser', undefined ))
      );
    } else if (u.role === 4) {
      return this.http.post<User>( this.parentBaseUrl , u, {headers: this.loginService.getAuthHeader()})
      .pipe(
        tap(x => { this.log(`Parent successfully added`);
                  this.consoleLog(`Parent successfully added - id:${x.id}`);
                }),
        catchError(this.handleError('addUser', undefined ))
      );
    }

  }

  updatePassword(pass: PassChange): Observable<User> {
    return this.http.put<User>(this.changeUserPassByTokenUrl , pass, {headers: this.loginService.getAuthHeader()})
    .pipe(
      tap(x => { this.log(`Password successfully updated`);
                this.consoleLog(`Password successfully updated`);
              }),
      catchError(this.handleError('updatePassword', undefined ))
    );

  }

  deleteUser(id: number, role: string): Observable<User> {
    if (role === 'ROLE_STUDENT') {
      return this.http.delete<User>(this.studentBaseUrl + id, {headers: this.loginService.getAuthHeader()})
      .pipe(
        tap(x => { this.log(`Student successfully deleted`);
                  this.consoleLog(`Student successfully deleted - id:${x.id}`);
                }),
        catchError(this.handleError('deleteUser', undefined ))
      );
    } else if (role === 'ROLE_PARENT') {
      return this.http.delete<User>(this.parentBaseUrl + id, {headers: this.loginService.getAuthHeader()})
      .pipe(
        tap(x => { this.log(`Parent successfully deleted`);
                  this.consoleLog(`Parent successfully deleted - id:${x.id}`);
                }),
        catchError(this.handleError('deleteUser', undefined ))
      );
    } else if (role === 'ROLE_PROFESSOR') {
      return this.http.delete<User>(this.professorBaseUrl + id, {headers: this.loginService.getAuthHeader()})
      .pipe(
        tap(x => { this.log(`Professor successfully deleted`);
                  this.consoleLog(`Professor successfully deleted - id:${x.id}`);
                }),
        catchError(this.handleError('deleteUser', undefined ))
      );
    }
  }

  resetUserPassword(id: number): Observable<string>  {
    return this.http.put<string>(this.resetPassword_adminUrl + id,
      {'test': 'stavljeno samo kao body zato sto PUT primorava'}, {headers: this.loginService.getAuthHeader()})
    .pipe(
      tap(x => { this.log(x);
                this.consoleLog(x);
              }),
      catchError(this.handleError('resetUserPassword', undefined ))
    );
  }




  // ########################################################################################################
  // ################################## LOG METHODS ############################################
  // #########################################################################################################



downloadLog(): void {
  window.location.href = this.downloadLogUrl + '?access_token=' + this.loginService.getToken();
}


getLogStr(): Observable<string> {
  return this.http.get<string>(this.showLogUrl, {headers: this.loginService.getAuthHeader()})
  .pipe(
    tap(x => { this.log('Fetched log');
              this.consoleLog('Fetched log');
            }),
    catchError(this.handleError('getLogStr', undefined ))
  );
}




  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error.error) {
        this.log(`${operation} failed: ${error.error.code}. ${error.error.message}`); //
      }
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add('UserService: ' + message);
  }

  private consoleLog(message: string) {
    console.log('UserService: ' + message);
  }


}
