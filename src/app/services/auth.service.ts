import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/User';
import { Router } from '@angular/router';
const AUTH_API = 'http://localhost:8090/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  //dec
public currentUserSubject: BehaviorSubject<User>;
public currentUser: Observable<User>;

// POUR LJWT, 
roles: Array<string>;
jwt:string;
  username:string;

  constructor(private http: HttpClient,  private router: Router) {


   }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
    
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }


  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(["/login"]);
  }




  isAdmin() {
    return this.roles.indexOf('ADMIN')>=0;
  }

  isUser() {
    return this.roles.indexOf('USER')>=0;

  }

  isAuthentificated (){
  
    return this.roles && (this.isAdmin() || this.isUser()) ;
    
    }

    

    logOut(){
     localStorage.removeItem('currentUser'); 
     this.jwt= undefined;
     this.username= undefined;
     this.roles= undefined;

    }


}