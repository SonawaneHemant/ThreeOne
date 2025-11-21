import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CategoryService } from '../../Services/category.service';
import { GetCategoryResponceModel } from '../Models/get-category-responce.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [ CommonModule,RouterLink,RouterOutlet,RouterLinkActive,FormsModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit{

   //getCategoryList?:GetCategoryResponceModel[];
   getCategoryList$?:Observable<GetCategoryResponceModel[]>;
    searchTerm?:string = undefined;
    sortDirection?:string = undefined;
    sortBy?:string = 'Name';
    totalCount?:number;
    listCategoty:number[]=[];
    pageNumber=1;
    pageSize=5;

  constructor(private categoryService:CategoryService){
  }

  ngOnInit(): void {

    this.categoryService.getCategoryTotalCount().subscribe({
      next:(resp) => {
        this.totalCount=resp;
        this.listCategoty=new Array(Math.ceil(resp/this.pageSize))
        this.getCategoryList$=this.categoryService.getAllCategory(undefined,undefined,undefined,this.pageNumber,this.pageSize);
      }
    })

    //this will give observable and async pipe will subscribe and unsubscribe automatically
    //when you just want to show  data no need to do any action in from
    //this.getCategoryList$=this.categoryService.getAllCategory();

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

  SearchCategory(sortDirection?:string){
    if(this.searchTerm?.trim() === '' && !sortDirection){
      //if search term is empty, fetch all categories
      this.getCategoryList$ = this.categoryService.getAllCategory();
    } else if(sortDirection) {
      //fetch categories based on search term
      this.getCategoryList$ = this.categoryService.getAllCategory(this.searchTerm, this.sortBy, this.sortDirection);
    }
    else {
      this.getCategoryList$ = this.categoryService.getAllCategory();
    }
  }

  getPage(pageNumberGt:number)
  {
    this.getCategoryList$=this.categoryService.getAllCategory(undefined,undefined,undefined,pageNumberGt,this.pageSize);
    this.pageNumber=pageNumberGt;
  }

  getPrevPage()
  {
    if(this.pageNumber -1 < 1)
    {
      return
    }
    this.pageNumber -=1;
    this.getCategoryList$=this.categoryService.getAllCategory(undefined,undefined,undefined,this.pageNumber,this.pageSize);
    
  }

  getNextPage()
  {
    if(this.pageNumber +1 > this.listCategoty.length)
    {
      return
    }
    this.pageNumber +=1;
    this.getCategoryList$=this.categoryService.getAllCategory(undefined,undefined,undefined,this.pageNumber,this.pageSize);
     
  }
}
