import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  
  // Get token from cookie or local storage
  const token = cookieService.get('Authorization');

  const shouldAttachAuthHeader = (request: HttpRequest<any>): boolean => {
    // Example logic: attach header only if ?addAuth=true is in the URL
    return request.urlWithParams.indexOf('addAuth=true',0) > -1 ? true : false;
  };

  // Clone request and attach Authorization header if token exists
  if (token && shouldAttachAuthHeader(req)) {
    console.log("Auth Interceptor attaching token to request:", token);
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: token
      }
    });
    return next(clonedReq);
  }

  // If no token, just forward request
  return next(req);
 
};

