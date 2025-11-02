import { getPostBySlug, getAllPosts } from "../../../lib/db/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: {
    slug: string;
  };
}

// Esta función se ejecuta en build time para generar las rutas estáticas
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  // Esperamos a que los parámetros estén disponibles
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="py-12">
      <Link 
        href="/blog"
        className="inline-block mb-6 text-primary-600 hover:text-primary-800"
      >
        ← Volver al blog
      </Link>
      
      <article>
        <h1 className="text-3xl font-bold text-primary-700 mb-4">{post.title}</h1>
        
        <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
          <span>{new Date(post.date).toLocaleDateString()}</span>
          <span>•</span>
          <span>{post.author}</span>
        </div>

        {post.excerpt && (
          <p className="text-lg text-gray-600 mb-8">
            {post.excerpt}
          </p>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex gap-2 mb-8">
            {post.tags.map(tag => (
              <Link 
                key={tag} 
                href={`/blog/tags/${tag}`}
                className="text-sm px-3 py-1 bg-primary-100 text-primary-700 rounded-full hover:bg-primary-200 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
        
        <div className="prose prose-purple max-w-none">
          <MDXRemote source={post.content} />
        </div>
      </article>
    </main>
  );
}



