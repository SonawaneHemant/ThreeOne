import { inject, Injectable } from '@angular/core';
import { LoginReq } from '../Model/login-req.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRes } from '../Model/login-res.Model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { User } from '../Model/user.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user=new BehaviorSubject<User|undefined>(undefined);
  constructor(private http:HttpClient,private cookieService:CookieService) { }

  login(LoginReq:LoginReq):Observable<LoginRes>
  {
    return this.http.post<LoginRes>(`${environment.apiBaseUrl}/Auth/login`, LoginReq);
  }

  setUser(user:User):void
  {
    this.$user.next(user);
    localStorage.setItem('user-emil',user.email);
    localStorage.setItem('user-roles',user.roles.join(','));
    //localStorage.setItem('user-roles',JSON.stringify(user.roles));
  }

  user():Observable<User|undefined>
  {
    return this.$user.asObservable();
  }

  getUser():User|undefined
  {
    const email=localStorage.getItem('user-emil');
    const rolesStr=localStorage.getItem('user-roles');

    if(email && rolesStr) 
    {
      const user:User={email:email,roles:rolesStr?.split(',')};
      return user;
    }

    return undefined;
  }


  logOut():void
  {
    this.$user.next(undefined);
    localStorage.removeItem('user-emil');
    localStorage.removeItem('user-roles');
    this.cookieService.delete('Authorization','/');
  }
}
