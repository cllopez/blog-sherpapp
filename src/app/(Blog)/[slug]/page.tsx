import { getPostBySlug } from '@/lib/db/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="py-12">
      <article className="max-w-4xl mx-auto px-4">
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
  );
}