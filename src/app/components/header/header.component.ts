import { Component, OnInit } from '@angular/core';
import { CartModelServer } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartData: CartModelServer;
  cartTotal: number;
  authState: boolean;
  connected = false;

  constructor(public cartService: CartService,private authService: AuthService, private tokenStorageService: TokenStorageService,
    private router: Router,
              public userService: UserService) { }

  ngOnInit(): void {
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);

    this.cartService.cartDataObs$.subscribe(data => this.cartData = data);

    this.userService.authState$.subscribe(authState => this.authState = authState);




    
  }


  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
    this.router.navigate(['login']);
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
