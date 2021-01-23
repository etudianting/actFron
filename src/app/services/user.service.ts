import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { SocialAuthService , GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const API_URL = 'http://localhost:8090/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  auth = false;
  private serverurl = environment.SERVER_URL;
  private user;
  authState$ = new BehaviorSubject<boolean>(this.auth);
  userData$ = new BehaviorSubject<SocialUser  | object>(null);
  loginMessage$ = new BehaviorSubject<string>(null);
  userRole: number;



  constructor(private http: HttpClient  , private authService: SocialAuthService,
   ) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }



//  Login User with Email and Password
loginUser(email: string, password: string): any {

  this.http.post(`${this.serverurl}/auth/login`, {email, password})
    .pipe(catchError((err: HttpErrorResponse) => of(err.error.message)))
    .subscribe((data) => {
      if (typeof (data) === 'string') {
        this.loginMessage$.next(data);
      } else {
        this.auth = data.auth;
        this.userRole = data.role;
        this.authState$.next(this.auth);
        this.userData$.next(data);
      }
    });
}

//  Google Authentication
googleLogin(): any {
  this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
}

logout(): any {
  this.authService.signOut();
  this.auth = false;
  this.authState$.next(this.auth);
}

registerUser(formData: any, photoUrl?: string, typeOfUser?: string): Observable<{ message: string }> {
  const {fname, lname, email, password} = formData;
  console.log(formData);
  return this.http.post<{ message: string }>(`${this.serverurl}/auth/register`, {
    email,
    lname,
    fname,
    typeOfUser,
    password,
    photoUrl: photoUrl || null
  });
}


}