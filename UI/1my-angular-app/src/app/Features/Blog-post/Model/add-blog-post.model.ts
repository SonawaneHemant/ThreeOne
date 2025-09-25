export interface AddBlogPostModel {
  title: string;
  shortDescription: string;
  content: string;
  featuredImageUrl: string;
  urlHandel: string;
  publishedDate: Date;   // use string for Angular forms (ISO date format) 
  auther: string;
  isVisible: boolean;
}