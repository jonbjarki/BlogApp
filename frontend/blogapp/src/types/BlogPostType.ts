import { AuthorType } from "./UserTypes";

export interface BlogPostType {
    id: number;
    title: string;
    description: string;
    content: string;
    author: AuthorType;
    coverImageUrl: string; 
}