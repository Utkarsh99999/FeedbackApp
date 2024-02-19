export interface User {
  image: string;
  name: string;
  username: string;
}

export interface Comment {
  id: number;
  _id:string,
  content: string;
  user: User;
  replies: Comment[];
}

export interface ProductRequest {
  _id:string,
  id: number;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments: Comment[];
}

export interface Product {
  currentUser: User;
  productRequests: ProductRequest[];
}
