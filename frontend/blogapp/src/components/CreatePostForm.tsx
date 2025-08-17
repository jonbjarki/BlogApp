"use client";

import { useActionState, useState } from "react";
import { createPostAction } from "@/app/actions";
import { useRouter } from "next/navigation";
import { FormErrorStateType } from "@/types/BlogPostType";

const initialState: FormErrorStateType = {
    errors: {
        title: "",
        content: "",
        description: "",
        coverImageUrl: "",
    },
};

export default function CreatePostForm() {
    const [postTitle, setPostTitle] = useState("");
    const [postDescription, setPostDescription] = useState("");
    const [postContent, setPostContent] = useState("");
    const [postCoverImageUrl, setPostCoverImageUrl] = useState("");
    const [state, formAction, isPending] = useActionState(
        createPostAction,
        initialState
    );

    const router = useRouter();

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     try {
    //         const res = await axios.post(
    //             CREATE_POST_URL,
    //             {
    //                 title: postTitle,
    //                 description: postDescription,
    //                 content: postContent,
    //                 coverImageUrl: postCoverImageUrl,
    //             },
    //             {
    //                 headers: { "Content-Type": "application/json" },
    //                 withCredentials: true,
    //             }
    //         );

    //         console.log("Post created successfully:", res.data);
    //         setPostContent("");
    //         setPostTitle("");
    //         setPostDescription("");
    //         setPostCoverImageUrl("");
    //         handleCancel();
    //     } catch (error: unknown) {
    //         const message = getErrorMessage(error);
    //         console.error("Error occurred with message: ", message);
    //     }
    // };

    const handleChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        if (e.target.name == "title") {
            setPostTitle(e.target.value);
        } else if (e.target.name == "description") {
            setPostDescription(e.target.value);
        } else if (e.target.name == "content") {
            setPostContent(e.target.value);
        } else if (e.target.name == "coverImageUrl") {
            setPostCoverImageUrl(e.target.value);
        }
    };

    const handleCancel = () => {
        router.push("/posts");
    };

    return (
        <div className="relative w-full">
            <button
                onClick={handleCancel}
                className="rounded absolute top-1 right-2 cursor-pointer"
            >
                x
            </button>

            <form
                // onSubmit={handleSubmit}
                action={formAction}
                className="rounded-md p-4 shadow-sm bg-surface flex flex-col gap-4 w-full"
            >
                <div className="flex flex-col gap-2">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={postTitle}
                        onChange={handleChange}
                        required
                        minLength={2}
                        maxLength={100}
                        className={
                            "border p-2 rounded-md " +
                            (state?.errors.title
                                ? "border-red-500"
                                : "border-primary")
                        }
                    />
                    {state?.errors.title && (
                        <p className="text-red-500">{state.errors.title}</p>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        name="description"
                        value={postDescription}
                        onChange={handleChange}
                        required
                        className={
                            "border p-2 rounded-md " +
                            (state?.errors.description
                                ? "border-red-500"
                                : "border-primary")
                        }
                    />
                    {state?.errors.description && (
                        <p className="text-red-500">
                            {state.errors.description}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="coverImageUrl">Cover Image URL</label>
                    <input
                        type="url"
                        name="coverImageUrl"
                        value={postCoverImageUrl}
                        onChange={handleChange}
                        className={
                            "border p-2 rounded-md " +
                            (state?.errors.coverImageUrl
                                ? "border-red-500"
                                : "border-primary")
                        }
                    />
                    {state?.errors.coverImageUrl && (
                        <p className="text-red-500">
                            {state.errors.coverImageUrl}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="content">Content</label>
                    <textarea
                        name="content"
                        value={postContent}
                        onChange={handleChange}
                        required
                        minLength={10}
                        maxLength={4000}
                        className={
                            "border p-2 rounded-md h-54 " +
                            (state?.errors.coverImageUrl
                                ? "border-red-500"
                                : "border-primary")
                        }
                    />
                    {state?.errors.content && (
                        <p className="text-red-500">{state.errors.content}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="bg-primary text-white rounded-md p-2 cursor-pointer disabled:bg-primary/50 disabled:cursor-not-allowed"
                    disabled={isPending}
                >
                    Create
                </button>
                <button
                    type="button"
                    onClick={handleCancel}
                    disabled={isPending}
                    className="border p-2 rounded-md border-red-500 cursor-pointer disabled:border-red-500/50 disabled:cursor-not-allowed"
                >
                    Cancel
                </button>
            </form>
        </div>
    );
}
