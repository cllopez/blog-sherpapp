import Link from 'next/link';
import { PostMeta } from '../lib/posts';

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article style={{ border: '1px solid #eee', padding: 12, borderRadius: 8 }}>
      <h3 style={{ margin: '0 0 8px 0' }}>
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      {post.date && <div style={{ fontSize: 12, color: '#666' }}>{new Date(post.date).toLocaleDateString()}</div>}
    </article>
  );
}
