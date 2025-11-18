import { useEffect, useState } from 'react'

function Section({ title, items, render }) {
  return (
    <section className="rounded-xl bg-white/5 border border-white/10 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold">{title}</h2>
        <span className="text-xs text-blue-200/70">{items.length} items</span>
      </div>
      <div className="space-y-3 text-blue-100/90">
        {items.length === 0 ? <p>No items found.</p> : items.map(render)}
      </div>
    </section>
  )
}

export function NewsPage() {
  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [items, setItems] = useState([])
  useEffect(() => { fetch(`${base}/api/news`).then(r=>r.json()).then(setItems) }, [])
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <a href="/" className="text-blue-200 hover:text-white">← Back</a>
        <Section title="News" items={items} render={(n) => (
          <div key={n._id} className="border-b border-white/10 pb-2">
            <div className="text-white font-semibold">{n.title}</div>
            <div className="text-xs text-blue-200/70">{n.department || 'General'} • {new Date(n.published_at || n.created_at).toLocaleString()}</div>
            <p className="text-sm mt-1">{n.body}</p>
          </div>
        )} />
      </div>
    </div>
  )
}

export function EventsPage() {
  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [items, setItems] = useState([])
  useEffect(() => { fetch(`${base}/api/events`).then(r=>r.json()).then(setItems) }, [])
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <a href="/" className="text-blue-200 hover:text-white">← Back</a>
        <Section title="Events" items={items} render={(e) => (
          <div key={e._id} className="border-b border-white/10 pb-2">
            <div className="text-white font-semibold">{e.title}</div>
            <div className="text-xs text-blue-200/70">{e.location} • {new Date(e.start_date || e.created_at).toLocaleString()}</div>
            <p className="text-sm mt-1">{e.description}</p>
          </div>
        )} />
      </div>
    </div>
  )
}

export function VacanciesPage() {
  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [items, setItems] = useState([])
  useEffect(() => { fetch(`${base}/api/vacancies`).then(r=>r.json()).then(setItems) }, [])
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <a href="/" className="text-blue-200 hover:text-white">← Back</a>
        <Section title="Vacancies" items={items} render={(v) => (
          <div key={v._id} className="border-b border-white/10 pb-2">
            <div className="text-white font-semibold">{v.title}</div>
            <div className="text-xs text-blue-200/70">{v.department} • Closes {new Date(v.closing_date || v.created_at).toLocaleDateString()}</div>
            <p className="text-sm mt-1">{v.description}</p>
          </div>
        )} />
      </div>
    </div>
  )
}
