import CreatePostButton from "@/components/CreatePostButton";
import PostList from "@/components/PostList";

export default function PostsPage() {
    return (
        <main className="mt-4 flex max-w-4xl flex-col items-center">
            <div className="w-full flex flex-row justify-between items-center mb-4">
                <h1 className="text-4xl font-bold">Posts</h1>
                <CreatePostButton />
            </div>
            <PostList />
        </main>
    );
}
