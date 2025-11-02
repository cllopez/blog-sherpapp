import { getPostBySlug } from '@/lib/db/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post no encontrado',
      description: 'El artículo que buscas no existe'
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date.toISOString(),
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  // Validamos que el slug no sea favicon.ico
  if (params.slug === 'favicon.ico') {
    notFound();
  }

  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="max-w-4xl mx-auto">
          <Link 
          href="/blog"
          className="inline-block mb-8 text-purple-600 hover:text-purple-800 transition-colors"
        >
          ← Volver al blog
        </Link>
        
        <h1 className="text-4xl font-bold text-purple-800 mb-6">{post.title}</h1>
        
        <div className="flex items-center gap-4 mb-8 text-sm text-gray-500">
          <time dateTime={new Date(post.date).toISOString()}>
            {new Date(post.date).toLocaleDateString('es-ES', {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            })}
          </time>
          <span>•</span>
          <span className="italic">{post.author}</span>
        </div>

        {post.excerpt && (
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-12">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="text-sm px-3 py-1 bg-purple-50 text-purple-700 rounded-full font-medium border border-purple-100"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="prose prose-purple max-w-none">
          <MDXRemote source={post.content} />
        </div>
      </article>
      </div>
    </div>
    );
  }