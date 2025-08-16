import { AuthorType } from "./UserTypes";

export interface BlogPostType {
    id: number;
    title: string;
    description: string;
    content: string;
    author: AuthorType;
    coverImageUrl: string; 
}

export interface FormErrorStateType {
    errors: {
        title?: string,
        description?: string,
        coverImageUrl?: string,
        content?: string,
    }
}