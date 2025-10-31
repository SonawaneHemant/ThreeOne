import { Routes } from '@angular/router';
// import { HomeComponent } from './home/home.component';
// import { AboutComponent } from './about/about.component';
// import { CategoryListComponent } from './Features/Category/category-list/category-list.component';
// import { AddCategoryComponent } from './Features/Category/category-list/add-category.component';
import { EditCategoryComponent } from './Features/Category/edit-category/edit-category.component';
import { BlogpostListComponent } from './Features/Blog-post/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './Features/Blog-post/add-blogpost/add-blogpost.component';
import { EditBlogpostComponent } from './Features/Blog-post/edit-blogpost/edit-blogpost.component'
import { HomeComponent } from './home/home.component';
import { BlogDetailsComponent } from './Features/Public/blog-details/blog-details.component';
import { LoginComponent } from './Features/Auth/login/login.component';
import { authGuard } from './Features/Auth/guards/auth.guard';

export const routes: Routes = [
   { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
   { path: 'about', loadComponent: () => import('./about/about.component').then(m => m.AboutComponent) },
   { path: 'admin/category', loadComponent: () => import('./Features/Category/category-list/category-list.component').then(m => m.CategoryListComponent),
      canActivate: [authGuard]
    },
   { path: 'admin/categories/add', loadComponent: () => import('./Features/Category/add-category/add-category.component').then(m => m.AddCategoryComponent),
       canActivate: [authGuard]
    },
   { path: 'admin/categories/edit/:id', component: EditCategoryComponent,
       canActivate: [authGuard]
    },
   { path: 'admin/blogpost', component: BlogpostListComponent,
       canActivate: [authGuard]
    },
   { path: 'admin/blogposts/add', component: AddBlogpostComponent,
       canActivate: [authGuard]
    },
   { path: 'admin/blogposts/edit/:id', component: EditBlogpostComponent, 
      canActivate: [authGuard] },
   { path: 'blog/:url', component: BlogDetailsComponent },
   { path: 'login', component: LoginComponent },
   // ** always should be in end
   { path: '**', component: HomeComponent },

];
