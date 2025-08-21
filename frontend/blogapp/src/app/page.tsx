import BlogPost from "@/components/PostListItem";
import PostList from "@/components/PostList";
import { redirect } from "next/navigation";

export default function Home() {
    return redirect("/posts");
}
