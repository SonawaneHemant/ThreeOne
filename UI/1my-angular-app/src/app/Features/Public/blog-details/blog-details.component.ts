import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BlogPostServiceService } from '../../Blog-post/BlogPost-Services/blog-post.service.service';
import { Observable } from 'rxjs';
import { BlogPostModel } from '../../Blog-post/Model/blog-post.model';
import { CommonModule } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-blog-details',
  imports: [CommonModule,MarkdownComponent,RouterLink],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent implements OnInit {
  
  url:string|null=null;
  blogPostData$?:Observable<BlogPostModel>;

  constructor(private route:ActivatedRoute,private blogPostService:BlogPostServiceService) {  }
  ngOnInit(): void {

    console.log('Hello Blog details');
    //Another Example of doing this just demo from another app
    //const idString = this.Activatesroute.snapshot.paramMap.get('id');
    this.route.paramMap.subscribe({
      next:responce => {
        this.url=responce.get('url')
      }
    });

    // console.log(this.url);

    // this.blogPostData$=this.blogPostService.getBlogPostByURL_AnyPropery('tenImageURL');

    if(this.url)
    {
      this.blogPostData$=this.blogPostService.getBlogPostByURL_AnyPropery(this.url);
    }
  }

  //Fetch blog details by URl

}
