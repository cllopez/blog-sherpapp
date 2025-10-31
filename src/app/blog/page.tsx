import Link from "next/link";
import { getAllPostsMeta } from "../../lib/posts";

export const dynamic = "force-static"; // genera estático

export default function BlogPage() {
  const posts = getAllPostsMeta();

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-slate-800">
      <h1 className="text-4xl font-extrabold text-green-800 mb-8">Blog de SherpApp</h1>

      <ul className="space-y-6">
        {posts.map((p) => (
          <li key={p.slug} className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">


            <Link
              href={`/blog/${p.slug}`}
              className="text-xl font-semibold text-green-700 hover:underline transition-all duration-150"
            >
              {p.title}
            </Link>
            {p.date && (
              <div className="text-sm text-slate-500 mt-1">
                {new Date(p.date).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
