import { getAllPublishedPosts, type PostMeta } from '@/lib/posts';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function Home() {
  const t = await getTranslations();
  const posts = await getAllPublishedPosts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f3f3f3] to-white">
      {/* Hero Section */}
      <div className="w-full py-20 text-center px-6 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-blue">
          {t('home.hero.title')}
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          {t('home.hero.subtitle')}
        </p>
      </div>

      {/* Blog Posts Section */}
      <main className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-3xl font-bold mb-10 text-center text-primary-blue">
          {t('home.blog.latestTitle')}
        </h2>

        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group p-6 rounded-2xl border border-gray-100 shadow-sm 
                       hover:shadow-md hover:border-primary-blue/20 transition-all 
                       duration-300 bg-white"
            >
              <Link href={`/blog/${post.slug}`}>
                <h3 className="text-2xl font-semibold text-primary-blue mb-2 
                           group-hover:text-primary-purple transition-colors">
                  {post.title}
                </h3>
              </Link>

              <p className="text-sm text-gray-500 mb-3">
                {new Date(post.date).toLocaleDateString('es-ES', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
                {' · '}
                <span className="italic text-primary-purple">{post.author || t('blog.post.defaultAuthor')}</span>
              </p>

              <p className="text-gray-700 mb-4 line-clamp-2">{post.excerpt}</p>

              <div className="flex flex-wrap gap-2">
                {post.tags?.map((tag: string) => {
                  // Determinar el color basado en la categoría
                  const isProductivity = tag.toLowerCase().includes('productividad');
                  const isStudy = tag.toLowerCase().includes('estudio');
                  const isWellness = tag.toLowerCase().includes('bienestar');
                  const isTech = tag.toLowerCase().includes('tecnologia');

                  let bgColor = 'bg-category-productivity-bg';
                  let textColor = 'text-category-productivity-text';

                  if (isStudy) {
                    bgColor = 'bg-category-study-bg';
                    textColor = 'text-category-study-text';
                  } else if (isWellness) {
                    bgColor = 'bg-category-wellness-bg';
                    textColor = 'text-category-wellness-text';
                  } else if (isTech) {
                    bgColor = 'bg-category-technology-bg';
                    textColor = 'text-category-technology-text';
                  }

                  return (
                    <span
                      key={tag}
                      className={`text-xs px-3 py-1 rounded-full font-medium ${bgColor} ${textColor}`}
                    >
                      #{tag}
                    </span>
                  );
                })}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link 
            href="/blog" 
            className="inline-flex items-center justify-center px-6 py-3 
                     text-lg font-medium text-white bg-primary-blue 
                     rounded-full hover:bg-primary-purple transition-colors
                     duration-300"
          >
            {t('home.blog.viewAll')}
          </Link>
        </div>
      </main>
    </div>
  );
}