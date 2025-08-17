"use server"

import { CREATE_POST_URL } from "@/lib/constants";
import { getAuthCookie, getErrorMessage, getZodIssues } from "@/lib/utils";
import { FormErrorStateType } from "@/types/BlogPostType";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const createPostSchema = z.object({
    title: z.string({ error: "Invalid title" }).min(2).max(100),
    description: z.string({ error: "Invalid description" }).min(2).max(300),
    content: z.string({ error: "Invalid content" }).min(10).max(4000),
    coverImageUrl: z.optional(z.url())
});

export async function createPostAction(prevState: any, data: FormData): Promise<FormErrorStateType | undefined> {
    const result = createPostSchema.safeParse({
        title: data.get("title"),
        description: data.get("description"),
        content: data.get("content"),
        coverImageUrl: data.get("coverImageUrl") === "" ? undefined : data.get("coverImageUrl"),
    });

    // Return early if parse not successful
    if (!result.success) {
        const errors = getZodIssues(result.error.issues);
        console.error("Validation failed:");
        console.error(errors);
        return {
            errors
        };
    }

    // Gets authentication cookie to authenticate user to backend
    const authCookie = await getAuthCookie();

    const { title, description, content, coverImageUrl } = result.data;
    const reqBody = JSON.stringify({
        title,
        description,
        content,
        coverImageUrl
    })

    try {
        const res = await fetch(CREATE_POST_URL, {
            method: "POST",
            body: reqBody,
            headers: {
                "Content-Type": "application/json",
                "Cookie": authCookie
                    ? `${authCookie.name}=${authCookie.value}` : "",
            },

        });
        console.log(res.status);
        if (!res.ok) {
            const errorData = await res.text();
            console.error("Error occurred while creating post:", errorData);
        } else {
            console.log("Post created successfully");
            // Force revalidation of cache to display the created post
            revalidateTag("posts");
        }

    } catch (error) {
        console.error(
            "Error occurred while creating post:",
            getErrorMessage(error)
        );
    }
}
