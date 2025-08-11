import {z } from "zod";

const schema = z.object({
    title: z.string({error: "Invalid title"}).min(2).max(100),
    description: z.string({error: "Invalid description"}).min(2).max(300),
    content: z.string({error: "Invalid content"}).min(2).max(10000),
    coverImageUrl: z.url({error: "Invalid cover image URL"})
}); 

export async function createPostAction(data: FormData) {
    "use server";
    const validatedField = schema.safeParse({
        title: data.get('title'),
        description: data.get('description'),
        content: data.get('content'),
        coverImageUrl: data.get('coverImageUrl'),
    });
    
    // Return if parse not successful
    if (!validatedField.success) {
        return {
            errors: validatedField.error.flatten().fieldErrors,
        }
    }

    

}