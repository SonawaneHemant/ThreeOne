import { Injectable } from '@angular/core';
import { AddCategoryRequestModel } from '../Category/Models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GetCategoryResponceModel } from '../Category/Models/get-category-responce.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }


  addCategory(model:AddCategoryRequestModel):Observable<void>{

    return this.http.post<void>(`${environment.apiBaseUrl}/GenericCategory`,model);
  }

  getAllCategory():Observable<GetCategoryResponceModel[]>{

    return this.http.get<GetCategoryResponceModel[]>(`${environment.apiBaseUrl}/GenericCategory`);
  }
}
