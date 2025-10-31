import PostForm from '../components/PostForm';

export default function NewPostPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Crear Nuevo Post</h1>
      <PostForm />
    </div>
  );
}