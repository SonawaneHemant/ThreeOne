import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ImageService } from './image.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ImagePostModel } from '../../../Features/Blog-post/Model/image-post.model';

@Component({
  selector: 'app-image-selector',
  imports: [FormsModule,CommonModule],
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.css'
})
export class ImageSelectorComponent implements OnInit {


  private imageService=inject(ImageService);
  private file?:File;
  fileName:string='';
  title:string='';
  //this is also observable bcoz its holding the responce of observable
  //when we subscribe it we can use the async pipe No need to unsubscribe 
  images$?:Observable<ImagePostModel[]>;

  @ViewChild('form',{static:false}) imageUploadForm?:NgForm;

  onFileUploadChange(event: Event):void
  {
      const element=event.currentTarget as HTMLInputElement;
      this.file=element.files?.[0];
  }

  UploadImage():void
  {
      if(this.file && this.fileName != "" && this.title != "")
      {
          this.imageService.uploadFile(this.file,this.fileName,this.title).subscribe({
            next:responce => {
              console.log(responce);
              this.imageUploadForm?.resetForm();
              this.getAllImage();
            }
          });
      }
  }

  getAllImage(){
    this.images$ = this.imageService.getALLImages();
    // this.images$.subscribe({
    //   next: (response) => {
    //     console.log(response);
    //   }
    // });
  }

  selectImages(image:ImagePostModel):void
  {
    this.imageService.selectImage(image);
  }

 
    ngOnInit(): void {
    this.getAllImage();
  }
}
