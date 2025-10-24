import { Component } from '@angular/core';
import { LoginReq } from '../Model/login-req.model';
import { FormsModule } from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model:LoginReq={email:'',password:''};

  constructor(private authService:AuthService,private cookieService:CookieService,private router:Router){ }

  onSubmitLogin(){
    console.log(this.model);
    this.authService.login(this.model).subscribe({
      next:(response)=>{
        console.log("Login successful",response);
        //set auth cookie or token here
        this.cookieService.set('Authorization',`Bearer ${response.token}`,
        undefined,'/',undefined,true,'Strict'
        );

        this.router.navigateByUrl('/');
      },
      error:(error)=>{
        console.log("Login failed",error);
      }
    }); 
  }

}
