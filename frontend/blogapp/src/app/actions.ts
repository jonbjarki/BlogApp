import { CREATE_POST_URL } from "@/lib/constants";
import { getErrorMessage } from "@/lib/utils";
import { z } from "zod";

const schema = z.object({
    title: z.string({ error: "Invalid title" }).min(2).max(100),
    description: z.string({ error: "Invalid description" }).min(2).max(300),
    content: z.string({ error: "Invalid content" }).min(2).max(10000),
    coverImageUrl: z.url({ error: "Invalid cover image URL" }),
});

export async function createPostAction(data: FormData) {
    "use server";
    const validatedField = schema.safeParse({
        title: data.get("title"),
        description: data.get("description"),
        content: data.get("content"),
        coverImageUrl: data.get("coverImageUrl"),
    });

    // Return early if parse not successful
    if (!validatedField.success) {
        console.error("Validation failed:", z.treeifyError(validatedField.error));
        return;
    }

    const { title, description, content, coverImageUrl } = validatedField.data;
    try {
        const res = await fetch(CREATE_POST_URL, {
            method: "POST",
            body: JSON.stringify({
                title,
                description,
                content,
                coverImageUrl,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error("Error occurred while creating post:", errorData);
        }

    } catch (error) {
        console.error(
            "Error occurred while creating post:",
            getErrorMessage(error)
        );
    }
}
