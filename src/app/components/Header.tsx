import Link from 'next/link'

const Header = () => {
  return (
    <header className="border-b border-slate-200 bg-white py-4 px-8">
      <nav className="mx-auto max-w-4xl flex items-center justify-between">
        <Link 
          href="/" 
          className="text-xl font-bold text-slate-900 hover:text-slate-700 no-underline"
        >
          SherpApp Blog
        </Link>
        <div className="flex gap-6">
          <Link 
            href="/blog" 
            className="text-slate-600 hover:text-slate-900 no-underline"
          >
            Blog
          </Link>
          <Link 
            href="/about" 
            className="text-slate-600 hover:text-slate-900 no-underline"
          >
            Sobre Nosotros
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header