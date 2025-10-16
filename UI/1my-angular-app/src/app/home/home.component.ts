import { Component, OnInit } from '@angular/core';
import { BlogPostServiceService } from '../Features/Blog-post/BlogPost-Services/blog-post.service.service';
import { Observable } from 'rxjs';
import { BlogPostModel } from '../Features/Blog-post/Model/blog-post.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']   // ✅ fixed
})
export class HomeComponent implements OnInit{

  blogPostList$?:Observable<BlogPostModel[]>;

  constructor(private blogPostService:BlogPostServiceService) {}

  ngOnInit(): void {
    this.blogPostList$=this.blogPostService.GetALLblogpost();
  }


 }