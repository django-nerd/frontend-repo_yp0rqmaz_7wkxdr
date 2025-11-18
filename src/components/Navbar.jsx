import { Link, NavLink } from 'react-router-dom'

const NavItem = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'text-white bg-blue-600' : 'text-blue-100 hover:text-white hover:bg-blue-500/20'}`}
  >
    {label}
  </NavLink>
)

function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-tr from-blue-500 to-cyan-400" />
            <span className="text-white font-semibold">Gov Portal</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <NavItem to="/" label="Home" />
            <NavItem to="/news" label="News" />
            <NavItem to="/events" label="Events" />
            <NavItem to="/vacancies" label="Vacancies" />
            <NavItem to="/admin" label="Admin" />
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar
