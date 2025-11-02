import Link from 'next/link';
import { getAllPosts } from '@/lib/db/posts';
import { BLOG_COLORS } from '@/lib/constants/colors';
import { CalendarDays, BookOpen, Brain, Laptop } from 'lucide-react';

const CATEGORY_ICON: Record<string, React.ComponentType<any>> = {
  Productividad: CalendarDays,
  Estudio: BookOpen,
  Bienestar: Brain,
  Tecnología: Laptop,
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  // Normaliza tags a minúsculas para contar categorías de forma robusta
  const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const countByCategory = (cat: string) =>
    (posts ?? []).filter((p) =>
      (p.tags ?? []).map(norm).some((t: string) => t === norm(cat))
    ).length;

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-w-7xl mx-auto px-6  py-24">
        {/* Hero */}
        <section className="relative text-center mb-20 py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(46,108,93,0.08),_transparent_70%)]"
          />

          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs text-emerald-700 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
            Novedades
          </span>

          <h1 className="text-5xl font-bold mt-6 text-gray-900 leading-snug tracking-tight">
            Blog de{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-700 bg-clip-text text-transparent">
              SherpApp
            </span>
          </h1>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            Consejos, producto y aprendizaje real para academias y estudiantes.
          </p>
        </section>


        <div className="grid gap-10 md:grid-cols--[2fr_1fr]">
          {/* Posts Recientes */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Posts recientes</h3>
            </div>
            <div className="p-6">
              {!posts || posts.length === 0 ? (
                <div className="flex items-center justify-center h-52">
                  <p className="text-gray-500">No hay publicaciones disponibles</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {posts.slice(0, 3).map((post) => (
                    <article
                      key={post.slug}
                      className="group p-5 bg-gray-50 rounded-2xl border border-gray-200 hover:bg-white hover:shadow-md transition-all duration-300"
                    >
                      <Link href={`/blog/${post.slug}`} className="block">
                        <h2 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2 mb-1">
                          {post.title}
                        </h2>

                        <p className="text-sm text-gray-500 mb-2">
                          {new Date(post.date).toLocaleDateString("es-ES", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                          {" · "}
                          <span className="italic">{post.author}</span>
                        </p>

                        {post.excerpt && (
                          <p className="text-gray-600 line-clamp-2 mb-3 group-hover:text-gray-900">
                            {post.excerpt}
                          </p>
                        )}

                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs bg-white text-gray-600 px-3 py-1 rounded-full font-medium border border-gray-200"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </Link>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Categorías populares */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Categorías populares</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {["Productividad", "Estudio", "Bienestar", "Tecnología"].map((category) => {
                  const Icon = CATEGORY_ICON[category];
                  const total = countByCategory(category);
                  return (
                    <div
                      key={category}
                      className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4"
                    >
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                        <Icon className="h-5 w-5" aria-hidden />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900">{category}</h4>
                        <p className="text-xs text-gray-600">
                          <span className="font-semibold text-primary-600">{total}</span> artículos
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Lista completa de posts */}
        <section className="mt-12">
          <h3 className="sr-only">Todos los artículos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(posts ?? []).map((post) => (
              <article
                key={post.slug}
                className="group bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="p-6">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <h2 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2 mb-1">
                      {post.title}
                    </h2>

                    <p className="text-sm text-gray-500 mb-2">
                      {new Date(post.date).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                      {" · "}
                      <span className="italic">{post.author}</span>
                    </p>

                    {post.excerpt && (
                      <p className="text-gray-600 line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                  </Link>

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-50 text-gray-700 px-3 py-1 rounded-full font-medium border border-gray-200"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}