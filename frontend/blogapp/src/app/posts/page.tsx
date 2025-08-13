import CreatePostButton from "@/components/CreatePostButton";
import PostList from "@/components/PostList";

export default async function PostsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const showForm = (await searchParams).showForm;

    return (
        <main className="mt-4 flex max-w-4xl flex-col items-center">
            <div className="w-full flex flex-row justify-between items-center mb-4">
                {!showForm && <h1 className="text-4xl font-bold">Posts</h1>}
                <CreatePostButton />
            </div>
            <PostList />
        </main>
    );
}
