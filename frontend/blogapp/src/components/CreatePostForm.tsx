"use client";

import { useState } from "react";

interface CreatePostFormProps {
    onCancel: () => void;
}

export default function CreatePostForm({ onCancel }: CreatePostFormProps) {
    const [postTitle, setPostTitle] = useState("");
    const [postDescription, setPostDescription] = useState("");
    const [postContent, setPostContent] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name == "title") {
            setPostTitle(e.target.value);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={onCancel}
                className="rounded absolute top-1 right-2 cursor-pointer"
            >
                x
            </button>

            <form
                onSubmit={handleSubmit}
                className="rounded-md p-4 shadow-sm grid grid-cols-2 bg-surface"
            >
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    value={postTitle}
                    onChange={handleChange}
                />
                <button type="submit">Create</button>
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            </form>
        </div>
    );
}
