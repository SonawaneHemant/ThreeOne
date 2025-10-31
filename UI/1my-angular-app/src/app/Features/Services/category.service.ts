import { Injectable } from '@angular/core';
import { AddCategoryRequestModel } from '../Category/Models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GetCategoryResponceModel } from '../Category/Models/get-category-responce.model';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient,private cookieService:CookieService) { }


  addCategory(model:AddCategoryRequestModel):Observable<void>{

    return this.http.post<void>(`${environment.apiBaseUrl}/GenericCategory?addAuth=true`,model);
  }

  getAllCategory():Observable<GetCategoryResponceModel[]>{

    return this.http.get<GetCategoryResponceModel[]>(`${environment.apiBaseUrl}/GenericCategory`);
  }

  getCategoryById(id:number):Observable<GetCategoryResponceModel>{
    // also use like this return this.http.get<GetCategoryResponceModel>(`${environment.apiBaseUrl}/GenericCategory/${id}`);
    return this.http.get<GetCategoryResponceModel>(`${environment.apiBaseUrl}/GenericCategory` + `/${id}`);
  }

 UpdateCategory(id:number,model:AddCategoryRequestModel):Observable<void>{
    // also use like this return this.http.get<GetCategoryResponceModel>(`${environment.apiBaseUrl}/GenericCategory/${id}`);
    return this.http.put<void>(`${environment.apiBaseUrl}/GenericCategory` + `/${id}?addAuth=true`,model);
  }

  //way to pass header with request
  // UpdateCategory(id:number,model:AddCategoryRequestModel):Observable<void>{
  //   // also use like this return this.http.get<GetCategoryResponceModel>(`${environment.apiBaseUrl}/GenericCategory/${id}`);
  //   return this.http.put<void>(`${environment.apiBaseUrl}/GenericCategory` + `/${id}`,model,{
  //     headers: { 'Authorization': this.cookieService.get('Authorization') }
  //   });
  // }

  DeleteCategory(id:number):Observable<void>{
    // also use like this return this.http.get<GetCategoryResponceModel>(`${environment.apiBaseUrl}/GenericCategory/${id}`);
    return this.http.delete<void>(`${environment.apiBaseUrl}/GenericCategory?addAuth=true` + `/${id}`);
  }
}
