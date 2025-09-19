import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AddCategoryRequestModel } from '../Models/add-category-request.model';
import { CategoryService } from '../../Services/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnDestroy {

  modelAddCt:AddCategoryRequestModel;
  private addSubscription? : Subscription;

  constructor(private categoryService:CategoryService,private router:Router) {
    this.modelAddCt = {
      name: '',
      urlHandel: ''
    }
  }
  
  onFormSubmit(data:any){
    
    this.addSubscription = this.categoryService.addCategory(this.modelAddCt).subscribe({
      next:(resp)=>{
        alert('Category Added Successfully');
        console.log(resp);
        this.router.navigateByUrl('/admin/category');
      },
      error:(err)=>{
        console.log(err);
        alert('Error while adding category');
      }
    })
    //console.log(data); // it will give all form details from ng form
    //console.log(data.form.value.categoryName); //this is how you can access form values
    //console.log(data.form.value.categoryUrlHandel);
  }

  ngOnDestroy(): void {
    this.addSubscription?.unsubscribe();
  }


}
