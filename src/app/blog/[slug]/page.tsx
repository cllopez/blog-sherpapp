// app/blog/[slug]/page.tsx
import { getPostBySlug, getAllPosts } from "../../../lib/db/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    return posts.map((post) => ({ 
      slug: post.slug 
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  if (!slug) return notFound();
  
  const post = await getPostBySlug(slug);
  if (!post) return notFound();

  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      {post.date && (
        <p className="text-sm text-gray-500 mb-6">{new Date(post.date).toLocaleDateString()}</p>
      )}
      <article className="prose">
        <MDXRemote source={post.content} />
      </article>
    </main>
  );
}



