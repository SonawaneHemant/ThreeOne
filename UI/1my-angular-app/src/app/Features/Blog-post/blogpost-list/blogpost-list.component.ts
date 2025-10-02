import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlogPostModel } from '../Model/blog-post.model';
import { Observable } from 'rxjs';
import { BlogPostServiceService } from '../BlogPost-Services/blog-post.service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blogpost-list',
  imports: [RouterModule,CommonModule],
  templateUrl: './blogpost-list.component.html',
  styleUrl: './blogpost-list.component.css'
})
export class BlogpostListComponent implements OnInit {

  getBlogPostList$? : Observable<BlogPostModel[]>;

  constructor(private blogpostService:BlogPostServiceService) {
  }

  ngOnInit(): void {
    this.getBlogPostList$=this.blogpostService.GetALLblogpost();

    // this.getBlogPostList$=this.blogpostService.GetALLblogpostAny();
    this.getBlogPostList$.forEach(element => {
      console.log(element);
    });


  }

}
