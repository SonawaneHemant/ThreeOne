import { Component, OnDestroy } from '@angular/core';
import { AddBlogPostModel } from '../Model/add-blog-post.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BlogPostServiceService } from '../BlogPost-Services/blog-post.service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-blogpost',
  imports: [FormsModule,CommonModule],
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent implements OnDestroy{

  modelAddBlogPost:AddBlogPostModel;
  private addBlogSubscription? : Subscription;

  constructor(private blogpostService:BlogPostServiceService) {
    this.modelAddBlogPost = {
      title: '',
      shortDescription: '', 
      content: '',
      featuredImageUrl: '',
      urlHandel: '',
      publishedDate: new Date(),
      auther: '',
      isVisible: true
    }
  }
  

  onAddBlogpostSubmit(data:any){
    console.log(data);
    console.log(this.modelAddBlogPost);

    this.addBlogSubscription=this.blogpostService.addblogpost(this.modelAddBlogPost).subscribe({
      next:(resp)=>{
        alert('Blog Post Added Successfully');
        console.log(resp);
      },
      error:(err)=>{
        console.log(err);
        alert('Error while adding blog post');
      }
    })
  }


  ngOnDestroy(): void {
    this.addBlogSubscription?.unsubscribe();
  }
}
