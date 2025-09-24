import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../Services/category.service';
import { Subscribable, Subscription } from 'rxjs';
import { GetCategoryResponceModel } from '../Models/get-category-responce.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  imports: [CommonModule,FormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit,OnDestroy{

  id:number=0;
  paramsSubscription?:Subscription;
  CategoryUpdateSubscription?:Subscription;

  category?:GetCategoryResponceModel;

  constructor(private route:ActivatedRoute,private categoryService:CategoryService,private router:Router) {
   
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next:(params)=>{
        this.id = params.get('id') as unknown as number;
        
        if(this.id && this.id > 0)
        {
        this.categoryService.getCategoryById(this.id).subscribe({
          next: (categoryGet) => {
            this.category = categoryGet;
          },
          error: (err) => {
            console.error(err);
          }
        });
        }

      }
    });
  }

  onEditFormSubmit(form:any)
  {
    console.log(form);
    console.log(this.category);
    if(this.id && this.id > 0 && this.category)
    {
      this.CategoryUpdateSubscription=this.categoryService.UpdateCategory(this.id,this.category).subscribe({
        next:(resp)=>{
          alert('Category Updated Successfully');
          this.router.navigateByUrl('/admin/category');
        },
        error:(err)=>{
          console.log(err);
          alert('Error while updating category');
        }

      });
  }
}

   ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.CategoryUpdateSubscription?.unsubscribe();
  }

}
