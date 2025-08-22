import CreatePostButton from "@/components/CreatePostButton";
import CreatePostForm from "@/components/CreatePostForm";
import PostList from "@/components/PostList";
import { redirect } from "next/navigation";

export default async function PostsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const showForm = (await searchParams).showForm;

    return (
        <main className="mt-4 mb-10 flex max-w-4xl flex-col items-center">
            <div className="w-full flex flex-row justify-between items-center mb-4">
                {!showForm && <h1 className="text-4xl font-bold">Posts</h1>}
                {!showForm ? <CreatePostButton /> : <CreatePostForm />}
            </div>
            <PostList />
        </main>
    );
}
