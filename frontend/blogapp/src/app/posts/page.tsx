import CreatePostButton from "@/components/CreatePostButton";
import PostList from "@/components/PostList";

export default function PostsPage() {
    return (
        <main className="mt-4 flex flex-col items-center">
            <CreatePostButton />
            <PostList />
        </main>
    );
}
