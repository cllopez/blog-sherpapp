// app/blog/page.tsx
import Link from "next/link";
import { getAllPosts } from "../../lib/db/posts";

export default async function BlogPage() {
  const posts = await getAllPosts();
  
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Blog de SherpApp</h1>
      {posts.length === 0 ? (
        <p className="text-gray-600">No hay publicaciones aún.</p>
      ) : (
        <ul className="space-y-8">
          {posts.map((post) => (
            <li key={post.slug} className="border-b pb-6">
              <Link href={`/blog/${post.slug}`} className="block group">
                <h2 className="text-2xl font-semibold text-purple-700 group-hover:text-purple-500 transition-colors">
                  {post.title}
                </h2>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{post.author}</span>
                </div>
                <p className="mt-3 text-gray-600">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex gap-2">
                  {post.tags.map(tag => (
                    <Link 
                      key={tag} 
                      href={`/blog/tags/${tag}`}
                      className="text-sm px-3 py-1 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}