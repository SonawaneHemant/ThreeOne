import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ImagePostModel } from '../../../Features/Blog-post/Model/image-post.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private http=inject(HttpClient);

  //to pass the value from one componenet to another by using service
  selectedImage:BehaviorSubject<ImagePostModel>=new BehaviorSubject<ImagePostModel>({
    id:0,
    fileExtention:'',
    fileName:'',
    title:'',
    url:'',
    dateCreated:new Date()
  });

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


  selectImage(image:ImagePostModel):void
  {
    this.selectedImage.next(image);
  }

  //Now Add or Edit component will use this
  onSelectImage():Observable<ImagePostModel>{
    return this.selectedImage.asObservable()
  }

}
