import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddBlogPostModel } from '../Model/add-blog-post.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { BlogPostModel } from '../Model/blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostServiceService {

  constructor(private http: HttpClient) { }

  GetALLblogpost(): Observable<BlogPostModel[]> {
    console.log("Blog post data fetched");
    return this.http.get<BlogPostModel[]>(`${environment.apiBaseUrl}/GenericBlogPost`).pipe();
  }

  addblogpost(model: AddBlogPostModel): Observable<BlogPostModel> {
    return this.http.post<BlogPostModel>(`${environment.apiBaseUrl}/GenericBlogPost`, model);
  }


}
