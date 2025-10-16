import { Component } from '@angular/core';
import { AddBlogPostModel } from '../Model/add-blog-post.model';
import { Observable, Subscription } from 'rxjs';
import { GetCategoryResponceModel } from '../../Category/Models/get-category-responce.model';
import { BlogPostServiceService } from '../BlogPost-Services/blog-post.service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoryService } from '../../Services/category.service';
import { BlogPostModel } from '../Model/blog-post.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarkdownComponent } from 'ngx-markdown';
import { ImageSelectorComponent } from "../../../shared/components/image-selector/image-selector.component";
import { flush } from '@angular/core/testing';
import { ImageService } from '../../../shared/components/image-selector/image.service';

@Component({
  selector: 'app-edit-blogpost',
  imports: [CommonModule, FormsModule, MarkdownComponent, RouterLink, ImageSelectorComponent],
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.css'
})
export class EditBlogpostComponent {

  id: number = 0;
  modelAddBlogPost: BlogPostModel;

  BlogPostUpdateSubscription?: Subscription;
  BlogPostDeleteSubscription?: Subscription;
  ImageSelectSubscription?: Subscription;
  categoriesList$?: Observable<GetCategoryResponceModel[]>;
  isImageSelectorVisible :boolean=false;

  modeladdBlogSubscription?: Subscription;

  constructor(private blogpostService: BlogPostServiceService, private router: Router, 
    private categoryService: CategoryService, private route: ActivatedRoute ,private imageService:ImageService) {
    this.modelAddBlogPost = {
      id: 0,
      title: '',
      shortDescription: '',
      content: '',
      featuredImageUrl: '',
      urlHandel: '',
      publishedDate: new Date(),
      auther: '',
      isVisible: true,
      categorysList: [],
      categoriesIDList: []
    }
  }

  ngOnInit(): void {
    this.modeladdBlogSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id') as unknown as number;

        if (this.id && this.id > 0) {
          this.blogpostService.getBlogPostById(this.id).subscribe({
            next: (BlogpostGet) => {
              this.modelAddBlogPost = BlogpostGet;
            },
            error: (err) => {
              console.error(err);
            }
          });
        }

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
    });

    this.categoriesList$ = this.categoryService.getAllCategory();
  }


  onEditFormSubmit(form: any) {
    console.log("Blog Post Update start");
    this.modelAddBlogPost.categorysList = [];
    console.log(this.modelAddBlogPost);
    if (this.id && this.id > 0 && this.modelAddBlogPost) {
      this.BlogPostUpdateSubscription = this.blogpostService.Updateblogpost(this.id, this.modelAddBlogPost).subscribe({
        next: (resp) => {
          alert('BlogPost Updated Successfully');
          this.router.navigateByUrl('/admin/blogpost');
        },
        error: (err) => {
          console.log(err);
          alert('Error while updating BlogPost');
        }

      });
    }
  }


  onDeleteBlogPostSubmit(form: any) {
    console.log(form);
    console.log(this.modelAddBlogPost);
    if (this.id && this.id > 0 && this.modelAddBlogPost) {
      this.BlogPostDeleteSubscription = this.blogpostService.Deleteblogpost(this.id).subscribe({
        next: (resp) => {
          alert('BlogPost Delete Successfully');
          this.router.navigateByUrl('/admin/blogpost');
        },
        error: (err) => {
          console.log(err);
          alert('Error while Deleting BlogPost');
        }
      });
    }
  }


  openImageSelector(): void {
    this.isImageSelectorVisible=true;
  }

  closeImageSelector(): void {
    this.isImageSelectorVisible=false;
  }




  ngOnDestroy(): void {
    this.BlogPostUpdateSubscription?.unsubscribe();
    this.BlogPostDeleteSubscription?.unsubscribe();
    this.modeladdBlogSubscription?.unsubscribe();
    this.ImageSelectSubscription?.unsubscribe();
  }


}
