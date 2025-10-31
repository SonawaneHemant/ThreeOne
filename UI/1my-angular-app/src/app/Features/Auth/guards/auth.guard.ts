import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import {jwtDecode} from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  //cheack jwt token 
  const cookieService = inject(CookieService);
  const token = cookieService.get('Authorization');
  const router = inject(Router);
  
  const authService = inject(AuthService);
  const user=authService.getUser();

  if(token && user){

    token.replace('Bearer ','');
    const decodedToken:any=jwtDecode(token);

    //check token expiration
    const currentTime=Math.floor(Date.now()/1000);
    if(decodedToken.exp < currentTime){
      authService.logOut();
      return router.createUrlTree(['/login'],{queryParams:{returnUrl:state.url} });
    }
    else{
      if(user.roles.includes('Writer')){
        return true;
      }
      else{
        alert('Unauthorized Access - Writer role required');
        return false;
      }
    }
  }
  else{
    authService.logOut();
    return router.createUrlTree(['/login'],{queryParams:{returnUrl:state.url} });
  }
};
