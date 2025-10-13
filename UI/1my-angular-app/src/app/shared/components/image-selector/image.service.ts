import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ImagePostModel } from '../../../Features/Blog-post/Model/image-post.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private http=inject(HttpClient);

  uploadFile(file:File,fileName:string,title:string):Observable<ImagePostModel>
  {
      const formData=new FormData();
      formData.append('file',file);
      formData.append('fileName',fileName);
      formData.append('title',title);

      return this.http.post<ImagePostModel>(`${environment.apiBaseUrl}/Image`,formData);
  }

  getALLImages():Observable<ImagePostModel[]>
  {
    return this.http.get<ImagePostModel[]>(`${environment.apiBaseUrl}/Image`);
  }
}
