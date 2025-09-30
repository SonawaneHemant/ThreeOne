import { GetCategoryResponceModel } from "../../Category/Models/get-category-responce.model";

export interface BlogPostModel {
    id: number;
  title: string;
  shortDescription: string;
  content: string;
  featuredImageUrl: string;
  urlHandel: string;
  publishedDate: Date;   // use string for Angular forms (ISO date format) 
  auther: string;
  isVisible: boolean;
  categorysList:GetCategoryResponceModel[];
  categoriesIDList:number[];
}