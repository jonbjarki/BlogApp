import BlogPost from "@/components/BlogPost";
import PostList from "@/components/PostList";

export default function Home() {
  return (
    <div>
      <ul className="flex items-center justify-center mt-4">
        <PostList />
      </ul>
    </div>
  );
}
