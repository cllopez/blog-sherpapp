import { getAllPublishedPosts, type PostMeta } from '@/lib/posts';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function Home() {
  const [t, blogT] = await Promise.all([
    getTranslations('home'),
    getTranslations('blog')
  ]);
  const posts = await getAllPublishedPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="w-full py-20 text-center mb-12 relative">
          {/* Fondo decorativo suave */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(124,58,237,0.08),rgba(16,185,129,0.06)_45%,transparent)]"
          />
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-100 bg-primary-50 px-3 py-1 text-xs text-primary-700 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-600" />
            SherpApp
          </span>
          <h1 className="text-5xl font-bold mt-6 text-gray-900 leading-snug tracking-tight">
            {t('hero.title')}{' '}
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              {t('hero.titleHighlight')}
            </span> 
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            {t('hero.subtitle')}
          </p>
        </section>

        {/* Blog Posts Section */}
        <main className="pb-12">
          <h2 className="text-2xl font-semibold mb-8 text-center text-gray-900">
             {t('blog.latestTitle')}
          </h2>

          <div className="space-y-6">
            {posts.slice(0, 3).map((post) => (
              <article
                key={post.slug}
                className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 p-6"
              >
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-sm text-gray-500 mb-2">
                  {new Date(post.date).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                  {' · '}
                   <span className="italic">{post.author || blogT('post.defaultAuthor')}</span>
                </p>

                {post.excerpt && (
                  <p className="text-gray-600 line-clamp-2 mb-3 group-hover:text-gray-900">
                    {post.excerpt}
                  </p>
                )}

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-50 text-gray-700 px-3 py-1 rounded-full font-medium border border-gray-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link 
              href="/blog" 
              className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-primary-600 rounded-full hover:bg-primary-700 hover:scale-105 transition-all duration-300 shadow-sm hover:shadow"
            >
                             {t('blog.viewAll')}
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}