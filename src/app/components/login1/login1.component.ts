import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SocialAuthServiceConfig } from 'angularx-social-login';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-login1',
  templateUrl: './login1.component.html',
  styleUrls: ['./login1.component.css']
})
export class Login1Component implements OnInit {


  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  loginMessage = '';
  roles: string[] = [];



  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService,
              private route: ActivatedRoute,
              private tokenStorage: TokenStorageService,
             
              ) { }

  ngOnInit(): void {
    
        if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      localStorage.setItem('token', 'Bearer');
    }

    
  }

   signInWithGoogle(): any {
    this.userService.googleLogin();
  } 

  

  onSubmit(data) {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
        
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }




  
  isAdmin() {
    return this.authService.isAdmin();
  }

  isUser() {
    return this.authService.isUser();

  }

  isAuthentificated() {
    return this.authService.isAuthentificated();
  }









}