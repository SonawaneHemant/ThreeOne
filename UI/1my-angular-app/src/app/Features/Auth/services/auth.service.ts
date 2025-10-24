import { inject, Injectable } from '@angular/core';
import { LoginReq } from '../Model/login-req.model';
import { Observable } from 'rxjs';
import { LoginRes } from '../Model/login-res.Model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(LoginReq:LoginReq):Observable<LoginRes>
  {
    return this.http.post<LoginRes>(`${environment.apiBaseUrl}/Auth/login`, LoginReq);
  }
}
