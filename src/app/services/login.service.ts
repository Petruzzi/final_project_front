import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, pipe } from 'rxjs';
import { catchError , map , tap } from 'rxjs/operators';
import { User } from '../models/User';
import {Router} from '@angular/router';
import { Message } from '../models/Message';
import { TokensPrivremeno } from '../models/TokenStore';
import { PassChange } from '../models/PassChange';
import { MessageService } from './message/message.service';



@Injectable({
  providedIn: 'root'
})
export class LoginService {



  activeUser: Observable <User> = null;


  private getUserUrl = 'http://localhost:8080/user/';


  constructor(private http: HttpClient,
              private router: Router,
              private messageService: MessageService) {

   }

  generateToken( username: string, password: string, r?: any): void {
    const generateTokenUrl = 'http://localhost:8080/oauth/token?grant_type=password&username=' + username + '&password=' + password;
    const head = {headers: new HttpHeaders({'Authorization': 'Basic dXNlcjpwYXNz'})}; // dXNlcjpwYXNz
    this.http.post<any>(generateTokenUrl , head)
    .pipe(
      tap(x => { // this.loginLog(`Successfully logged in`);
                this.consoleLog(`Token generated successfully - token: ${x.access_token}`);
              }),
      catchError(this.handleError_login( undefined ))
    )
    .subscribe(
      tt => {
        if (tt) {
            this.setToken(tt.access_token);
            this.getActiveUser().subscribe(
              (u) => {
                this.setPass(password);
                this.setRole(u.role.name);
                if (r !== undefined) {
                  if (r === 'profile/0') {
                    this.loginLog(`Successfully logged in`);
                  }
                  this.router.navigate([r]);
                }
              }
            );
        }
      }
    );
  }


   setToken(token: string) {
    localStorage.setItem('user_token', token);
   }


   getToken(): string {
    return localStorage.getItem('user_token');
   }

   setRole(r: string) {
    localStorage.setItem('user_role', r);
   }


   getRole(): string {
    return localStorage.getItem('user_role');
   }

   setPass(r: string) {
    localStorage.setItem('user_pass', btoa(r));
   }


   getPass(): string {
    return atob(localStorage.getItem('user_pass'));
   }


   logout() {
     this.activeUser = null;
     localStorage.removeItem('user_token');
     localStorage.removeItem('user_role');
     localStorage.removeItem('user_pass');
     this.router.navigate(['login']);
     this.loginLog(`Successfully logged out`);
   }


   getActiveUser(): Observable <User> {
    this.activeUser = this.http.get<User>(this.getUserUrl,
      {headers: this.getAuthHeader()}
    )
    .pipe(
      tap(x => {
                this.consoleLog(`Fetched active user - id:${x.id}`);
              }),
      catchError(this.handleError('getActiveUser', undefined ))
    );
    return this.activeUser;
   }

   getAuthHeader(): any {
    return new HttpHeaders(
      {'Authorization': 'Bearer ' + localStorage.getItem('user_token')});
    }


    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        if (error.error) {
          this.log(`${operation} failed: ${error.error.code}. ${error.error.message}`); //
        }
        return of(result as T);
      };
    }

    private handleError_login<T>( result?: T) {
      return (error: any): Observable<T> => {
        this.loginLog(`${error.error.error_description}`);
        return of(result as T);
      };
    }

    private loginLog(message: string) {
      this.messageService.add(message);
    }

    private log(message: string) {
      this.messageService.add('LoginService: ' + message);
    }

    private consoleLog(message: string) {
      console.log('LoginService: ' + message);
    }
 }

