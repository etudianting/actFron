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
  username?: string;
  fieldTextType: boolean;
  


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

  signInWithFacebook():any {
    
  } 
  signInWithTwitter():any {
    
  } 

  

  onSubmit(data) {
    console.log("testlog");
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        const user = this.tokenStorage.getUser();
        this.roles = this.tokenStorage.getUser().roles;
        this.username = user.username;
        this.loginMessage = 'Welcome '+this.username.toUpperCase();
        this.reloadPage();
        
      },
      err => {
        this.errorMessage = "The username or the password you entered is incorrect";
        this.isLoginFailed = true;
      }
    );
  }


  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  ForgotPassword(){
    console.log("testpass");
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