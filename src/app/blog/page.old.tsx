// app/blog/page.tsx
import Link from "next/link";
import { getAllPosts } from "../../lib/db/posts";

export default async function BlogPage() {
  try {
    console.log('📖 Cargando página del blog...');
    const posts = await getAllPosts();
    console.log('✅ Posts cargados correctamente');
    
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
                  className="group p-6 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 bg-white"
                >
                  <div className="h-full flex flex-col">
                    <Link href={`/blog/${post.slug}`} className="block flex-grow">
                      <h2 className="text-2xl font-semibold mb-2 text-purple-700 group-hover:text-purple-500 transition-colors line-clamp-2">
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

                      <p className="text-gray-700 line-clamp-2 mb-4 group-hover:text-gray-900">
                        {post.excerpt}
                      </p>
                    </Link>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {post.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-purple-50 text-purple-800 px-3 py-1 rounded-full font-medium hover:bg-purple-100 transition-colors border border-purple-100 cursor-default"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    );
  } catch (error) {
    console.error('❌ Error cargando los posts:', error);
    return (
      <div className="py-12 text-center">
        <h1 className="text-4xl font-bold mb-4 text-red-600">Error</h1>
        <p className="text-gray-600">Lo sentimos, ha ocurrido un error al cargar los posts.</p>
      </div>
    );
  }
}
  } catch (error) {
    console.error('❌ Error al cargar los posts:', error);
    return (
      <main className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-12 text-purple-800 text-center">
            Blog de SherpApp
          </h1>
          <div className="text-center">
            <p className="text-red-600 text-lg">Ocurrió un error al cargar las publicaciones.</p>
          </div>
        </div>
      </main>
    );
  }
}