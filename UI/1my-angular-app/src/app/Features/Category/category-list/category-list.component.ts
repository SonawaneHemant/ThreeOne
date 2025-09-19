import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CategoryService } from '../../Services/category.service';
import { GetCategoryResponceModel } from '../Models/get-category-responce.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [ CommonModule,RouterLink,RouterOutlet,RouterLinkActive],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit{

   //getCategoryList?:GetCategoryResponceModel[];
   getCategoryList$?:Observable<GetCategoryResponceModel[]>;

  constructor(private categoryService:CategoryService){
  }

  ngOnInit(): void {
    //this will give observable and async pipe will subscribe and unsubscribe automatically
    //when you just want to show  data no need to do any action in from
    this.getCategoryList$=this.categoryService.getAllCategory();

    //need to subscribe and also need to assign the value to getCategoryList and unsbscribe to memeory leak issue
    //if you wan to do any action with the data then use this approach
    // this.categoryService.getAllCategory().subscribe({
    //   next:(resp)=>{
    //     this.getCategoryList = resp;
    //     console.log(resp);
    //     console.log("my id", this.getCategoryList[0].id);
    //   },
    //   error:(err)=>{
    //     console.log(err);
    //   }
    // })
  }

}
