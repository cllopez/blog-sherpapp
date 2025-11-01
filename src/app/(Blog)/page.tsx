import Link from 'next/link';
import { getAllPosts } from '@/lib/db/posts';
import { BLOG_COLORS } from '@/lib/constants/colors';
import { CalendarDays, BookOpen, Brain, Laptop } from 'lucide-react';

const CategoryIcons = {
  'Productividad': CalendarDays,
  'Estudio': BookOpen,
  'Bienestar': Brain,
  'Tecnología': Laptop,
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  
  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12 text-gray-900 text-center">
          Blog de SherpApp
        </h1>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Posts Recientes */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Posts Recientes
              </h3>
            </div>
            <div className="p-6">
              {!posts || posts.length === 0 ? (
                <div className="flex items-center justify-center h-52">
                  <p className="text-gray-500">No hay publicaciones disponibles</p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {posts.slice(0, 3).map((post) => (
                    <article 
                      key={post.slug} 
                      className="group p-6 bg-gray-50 rounded-lg transition-all duration-300"
                    >
                      <Link href={`/blog/${post.slug}`} className="block">
                        <h2 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2 mb-2">
                          {post.title}
                        </h2>
                        
                        <p className="text-sm text-gray-500 mb-2">
                          {new Date(post.date).toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                          {' '}·{' '}
                          <span className="italic">{post.author}</span>
                        </p>

                        <p className="text-gray-600 line-clamp-2 mb-3 group-hover:text-gray-900">
                          {post.excerpt}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {post.tags?.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-white text-gray-600 px-3 py-1 rounded-full font-medium border border-gray-200"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Categorías Populares */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Categorías Populares
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                {['Productividad', 'Estudio', 'Bienestar', 'Tecnología'].map((category) => (
                  <div key={category} className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{category}</h3>
                    <p className="text-3xl font-bold text-purple-600">
                      {posts.filter(post => post.tags?.includes(category.toLowerCase())).length}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">artículos</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Lista completa de posts */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article 
              key={post.slug} 
              className="group bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
            >
              <div className="p-6">
                <Link href={`/blog/${post.slug}`} className="block">
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2 mb-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(post.date).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                    {' '}·{' '}
                    <span className="italic">{post.author}</span>
                  </p>

                  <p className="text-gray-600 line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>
                </Link>

                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-50 text-gray-600 px-3 py-1 rounded-full font-medium border border-gray-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}