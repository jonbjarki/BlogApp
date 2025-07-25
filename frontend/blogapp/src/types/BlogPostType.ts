interface AuthorType {
    name: string
}

export interface BlogPostType {
    id: number;
    title: string;
    description: string;
    content: string;
    author: AuthorType;
    coverImageUrl: string; 
}