import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, ɵEmptyOutletComponent } from '@angular/router';
import { AuthService } from '../../../Features/Auth/services/auth.service';
import { User } from '../../../Features/Auth/Model/user.model';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, ɵEmptyOutletComponent,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  user?:User;

  constructor(private authService:AuthService,private cookieService:CookieService,private router:Router) { }
  ngOnInit(): void {
    this.authService.user().subscribe({
      next:(user)=>{
        console.log("Navbar User:",user);
        this.user=user;
      }
    });

    this.user=this.authService.getUser();
  }

  Onlogout():void
  {
    this.authService.logOut();
    this.router.navigateByUrl('/');
  }

}
