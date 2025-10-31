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
    return this.http.post<BlogPostModel>(`${environment.apiBaseUrl}/GenericBlogPost?addAuth=true`, model);
  }


  getBlogPostById(id: number): Observable<BlogPostModel> {
    // also use like this return this.http.get<GetCategoryResponceModel>(`${environment.apiBaseUrl}/GenericCategory/${id}`);
    return this.http.get<BlogPostModel>(`${environment.apiBaseUrl}/GenericBlogPost` + `/${id}`);
  }

  getBlogPostByURL_AnyPropery(urlHandel: string): Observable<BlogPostModel> {
    // also use like this return this.http.get<GetCategoryResponceModel>(`${environment.apiBaseUrl}/GenericCategory/${id}`);
    return this.http.get<BlogPostModel>(`${environment.apiBaseUrl}/GenericBlogPost/url` + `/${urlHandel}`);
  }

  GetALLblogpostAny(): Observable<any[]> {
    console.log("Blog post data fetched");
    return this.http.get<any[]>(`${environment.apiBaseUrl}/GenericBlogPost`).pipe();
  }

  Updateblogpost(id: number, model: AddBlogPostModel): Observable<void> {
    // also use like this return this.http.get<GetCategoryResponceModel>(`${environment.apiBaseUrl}/GenericCategory/${id}`);
    return this.http.put<void>(`${environment.apiBaseUrl}/GenericBlogPost?addAuth=true` + `/${id}`, model);
  }

  Deleteblogpost(id: number): Observable<void> {
    // also use like this return this.http.get<GetCategoryResponceModel>(`${environment.apiBaseUrl}/GenericCategory/${id}`);
    return this.http.delete<void>(`${environment.apiBaseUrl}/GenericBlogPost?addAuth=true` + `/${id}`);
  }
}
