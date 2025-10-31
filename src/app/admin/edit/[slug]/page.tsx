import PostForm from '../../components/PostForm';
import { getPostBySlug } from '@/lib/db/posts';

export default async function EditPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Post no encontrado</h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Editar Post</h1>
      <PostForm initialData={post} isEditing={true} />
    </div>
  );
}