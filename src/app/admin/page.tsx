import Link from 'next/link';
import { getAllPosts } from '../../lib/db/posts';
import DeleteButton from './components/DeleteButton';

export default async function AdminPage() {
  const posts = await getAllPosts();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        <Link 
          href="/admin/new" 
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Nuevo Post
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="grid grid-cols-[1fr,200px,150px,100px] gap-4 p-4 font-semibold border-b">
          <div>Título</div>
          <div>Fecha</div>
          <div>Estado</div>
          <div>Acciones</div>
        </div>
        
        {posts.map((post) => (
          <div 
            key={post.id} 
            className="grid grid-cols-[1fr,200px,150px,100px] gap-4 p-4 border-b hover:bg-gray-50"
          >
            <div className="font-medium">{post.title}</div>
            <div>{new Date(post.date).toLocaleDateString()}</div>
            <div>
              <span className={`px-2 py-1 rounded-full text-sm ${
                post.isPublished 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {post.isPublished ? 'Publicado' : 'Borrador'}
              </span>
            </div>
            <div className="flex gap-2">
              <Link 
                href={`/admin/edit/${post.slug}`}
                className="text-blue-600 hover:text-blue-800"
              >
                Editar
              </Link>
              <DeleteButton slug={post.slug} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}