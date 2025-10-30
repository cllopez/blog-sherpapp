import PostCard from "./PostCard";

type Post = {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
};

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}