import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPostModel } from '../Model/add-blog-post.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BlogPostServiceService } from '../BlogPost-Services/blog-post.service.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { CategoryService } from '../../Services/category.service';
import { GetCategoryResponceModel } from '../../Category/Models/get-category-responce.model';
import { ImageSelectorComponent } from "../../../shared/components/image-selector/image-selector.component";
import { ImageService } from '../../../shared/components/image-selector/image.service';


@Component({
  selector: 'app-add-blogpost',
  standalone: true,
  imports: [MarkdownModule, FormsModule, CommonModule, ImageSelectorComponent],
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent implements OnInit,OnDestroy{

  modelAddBlogPost:AddBlogPostModel;
  private addBlogSubscription? : Subscription;
  categoriesList$?:Observable<GetCategoryResponceModel[]>;
   isImageSelectorVisible :boolean=false;
     ImageSelectSubscription?: Subscription;

  constructor(private blogpostService:BlogPostServiceService,private router:Router,
    private categoryService:CategoryService,private imageService:ImageService) {
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
  ngOnInit(): void {
    this.categoriesList$= this.categoryService.getAllCategory();

    //this is comming from the image Component
        this.ImageSelectSubscription=this.imageService.onSelectImage().subscribe({
          next:responce => {
            if(this.modelAddBlogPost){
              this.modelAddBlogPost.featuredImageUrl=responce.url;
              this.modelAddBlogPost.urlHandel=responce.fileName;
              this.closeImageSelector();
            }
          }
        })
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

  openImageSelector(): void {
    this.isImageSelectorVisible=true;
  }

  closeImageSelector(): void {
    this.isImageSelectorVisible=false;
  }

  ngOnDestroy(): void {
    this.addBlogSubscription?.unsubscribe();
    this.ImageSelectSubscription?.unsubscribe();
  }
}
