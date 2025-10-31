'use client';

import { useRouter } from '../../../hooks/useRouter';

export default function DeleteButton({ slug }: { slug: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm('¿Estás seguro de que quieres eliminar este post?')) {
      await fetch(`/api/posts/${slug}`, {
        method: 'DELETE',
      });
      router.refresh();
    }
  };

  return (
    <button
      className="text-red-600 hover:text-red-800"
      onClick={handleDelete}
    >
      Eliminar
    </button>
  );
}