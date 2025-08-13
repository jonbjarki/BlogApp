"use client";

import { CREATE_POST_URL } from "@/lib/constants";
import { getErrorMessage } from "@/lib/utils";
import axios from "axios";
import { useState } from "react";
import { createPostAction } from "@/app/actions";

interface CreatePostFormProps {
    onCancel?: () => void;
}

export default function CreatePostForm({ onCancel }: CreatePostFormProps) {
    const [postTitle, setPostTitle] = useState("");
    const [postDescription, setPostDescription] = useState("");
    const [postContent, setPostContent] = useState("");
    const [postCoverImageUrl, setPostCoverImageUrl] = useState("");

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
        if (onCancel) {
            onCancel();
        }
    };

    return (
        <div className="relative w-full">
            <button
                onClick={onCancel}
                className="rounded absolute top-1 right-2 cursor-pointer"
            >
                x
            </button>

            <form
                // onSubmit={handleSubmit}
                action={createPostAction}
                className="rounded-md p-4 shadow-sm bg-surface flex flex-col gap-4 w-full"
            >
                <div className="flex flex-col gap-2">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={postTitle}
                        onChange={handleChange}
                        className="border p-2 rounded-md border-primary"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        name="description"
                        value={postDescription}
                        onChange={handleChange}
                        className="border p-2 rounded-md border-primary"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="coverImageUrl">Cover Image URL</label>
                    <input
                        type="url"
                        name="coverImageUrl"
                        value={postCoverImageUrl}
                        onChange={handleChange}
                        className="border p-2 rounded-md border-primary"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="content">Content</label>
                    <textarea
                        name="content"
                        value={postContent}
                        onChange={handleChange}
                        className="border p-2 rounded-md border-primary h-48"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-primary text-white rounded-md p-2 cursor-pointer"
                >
                    Create
                </button>
                <button
                    type="button"
                    onClick={handleCancel}
                    className="border p-2 rounded-md border-red-500 cursor-pointer"
                >
                    Cancel
                </button>
            </form>
        </div>
    );
}
