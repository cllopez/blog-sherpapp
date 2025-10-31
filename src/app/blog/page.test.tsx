// app/blog/page.test.tsx
export default async function BlogPage() {
  const posts = [
    {
      id: '1',
      title: 'Post de Prueba',
      slug: 'post-de-prueba',
      excerpt: 'Este es un post de prueba para verificar el rendering',
      date: new Date(),
      author: 'Test User',
      tags: ['test', 'debug'],
      content: 'Contenido de prueba',
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  return (
    <main className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12 text-purple-800 text-center">
          Blog de SherpApp (Test)
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article 
              key={post.slug} 
              className="group p-6 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 bg-white"
            >
              <div className="h-full flex flex-col">
                <h2 className="text-2xl font-semibold mb-2 text-purple-700">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                <div className="mt-auto">
                  <div className="text-sm text-gray-500">
                    {post.author}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}