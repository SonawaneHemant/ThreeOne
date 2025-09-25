import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddBlogPostModel } from '../Model/add-blog-post.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BlogPostServiceService {

  constructor(private http:HttpClient) { }


  addblogpost(model:AddBlogPostModel):Observable<void>{

    return this.http.post<void>(`${environment.apiBaseUrl}/GenericBlogPost`,model);

  }
}
