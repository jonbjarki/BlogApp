import { AuthorType } from "./UserTypes";

export interface BlogPostType {
    id: number;
    title: string;
    description: string;
    content: string;
    author: AuthorType;
    coverImageUrl: string; 
    dateCreated: Date;
}

export interface BlogPostFetchResponse extends Omit<BlogPostType, 'dateCreated'> {
    dateCreated: string;
}

export type FormErrorStateType = {
    errors: {
        title?: string,
        description?: string,
        coverImageUrl?: string,
        content?: string,
    }
}