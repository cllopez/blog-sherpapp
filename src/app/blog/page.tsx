// app/blog/page.tsx
import Link from "next/link";
import { getAllPosts } from "../../lib/db/posts";

export default async function BlogPage() {
  const posts = await getAllPosts();
  
  return (
    <main className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12 text-purple-800 text-center">
          Blog de SherpApp
        </h1>
        
        {posts.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 text-lg">No hay publicaciones aún.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article 
                key={post.slug} 
                className="group bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
              >
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  {/* Categoría y Fecha */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    <span className="text-sm text-purple-600">{post.author}</span>
                  </div>

                  {/* Título */}
                  <h2 className="text-xl font-semibold text-purple-700 group-hover:text-purple-500 mb-3 line-clamp-2 transition-colors duration-300">
                    {post.title}
                  </h2>

                  {/* Extracto */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {post.tags.map(tag => (
                      <Link
                        key={tag}
                        href={`/blog/tags/${tag}`}
                        className="text-xs px-3 py-1 bg-purple-50 text-purple-700 rounded-full 
                                 hover:bg-purple-100 transition-colors duration-200
                                 border border-purple-100"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}