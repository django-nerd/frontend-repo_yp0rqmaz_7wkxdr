import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Departments from './components/Departments'
import Feed from './components/Feed'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Hero />
        <div id="departments">
          <Departments />
        </div>
        <Feed />
      </main>
      <footer className="border-t border-white/10 py-6 text-center text-blue-200/70">
        © {new Date().getFullYear()} Government Services Portal
      </footer>
    </div>
  )
}

export default App
