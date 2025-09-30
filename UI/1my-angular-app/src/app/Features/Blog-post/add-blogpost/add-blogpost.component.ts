import { Component, OnDestroy } from '@angular/core';
import { AddBlogPostModel } from '../Model/add-blog-post.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BlogPostServiceService } from '../BlogPost-Services/blog-post.service.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';


@Component({
  selector: 'app-add-blogpost',
  standalone: true,
  imports: [MarkdownModule,FormsModule, CommonModule],
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent implements OnDestroy{

  modelAddBlogPost:AddBlogPostModel;
  private addBlogSubscription? : Subscription;

  constructor(private blogpostService:BlogPostServiceService,private router:Router) {
    this.modelAddBlogPost = {
      title: '',
      shortDescription: '', 
      content: '',
      featuredImageUrl: '',
      urlHandel: '',
      publishedDate: new Date(),
      auther: '',
      isVisible: true,
      categorysList:[],
      categoriesIDList:[]
    }
  }
  

  onAddBlogpostSubmit(data:any){
    console.log(data);
    console.log(this.modelAddBlogPost);

    this.addBlogSubscription=this.blogpostService.addblogpost(this.modelAddBlogPost).subscribe({
      next:(resp)=>{
        alert('Blog Post Added Successfully');
        console.log(resp);
        this.router.navigateByUrl('/admin/blogpost');
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
