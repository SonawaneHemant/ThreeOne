import { Routes } from '@angular/router';
// import { HomeComponent } from './home/home.component';
// import { AboutComponent } from './about/about.component';
// import { CategoryListComponent } from './Features/Category/category-list/category-list.component';
// import { AddCategoryComponent } from './Features/Category/category-list/add-category.component';
import { EditCategoryComponent } from './Features/Category/edit-category/edit-category.component';

export const routes: Routes = [
 { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'about', loadComponent: () => import('./about/about.component').then(m => m.AboutComponent) },
  { path: 'admin/category', loadComponent: () => import('./Features/Category/category-list/category-list.component').then(m => m.CategoryListComponent) },
  { path: 'admin/categories/add', loadComponent: () => import('./Features/Category/add-category/add-category.component').then(m => m.AddCategoryComponent) },
   { path: 'admin/categories/edit/:id', component: EditCategoryComponent},
];
