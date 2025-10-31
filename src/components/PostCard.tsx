import Link from 'next/link';
import { PostMeta } from '../lib/posts';

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
      {/* Título */}
      <Link href={`/blog/${post.slug}`}>
        <h2 className="text-xl font-semibold text-purple-700 group-hover:text-purple-600 mb-3 line-clamp-2">
          {post.title}
        </h2>
      </Link>

      {/* Fecha y Autor */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        {post.date && (
          <time dateTime={new Date(post.date).toISOString()}>
            {new Date(post.date).toLocaleDateString('es-ES', {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            })}
          </time>
        )}
        {post.author && (
          <>
            <span>·</span>
            <span className="italic">{post.author}</span>
          </>
        )}
      </div>

      {/* Extracto */}
      {post.excerpt && (
        <Link href={`/blog/${post.slug}`} className="block mb-4">
          <p className="text-gray-600 line-clamp-2 group-hover:text-gray-900">
            {post.excerpt}
          </p>
        </Link>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span
              key={tag}
              className="text-xs px-3 py-1 bg-purple-50 text-purple-700 rounded-full font-medium border border-purple-100"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
