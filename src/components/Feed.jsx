import { useEffect, useState } from 'react'

function Card({ title, meta, children }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-white font-semibold">{title}</h3>
        {meta && <span className="text-xs text-blue-200/80">{meta}</span>}
      </div>
      <div className="text-sm text-blue-100/90 space-y-2">
        {children}
      </div>
    </div>
  )
}

function Feed() {
  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [news, setNews] = useState([])
  const [events, setEvents] = useState([])
  const [vacancies, setVacancies] = useState([])

  useEffect(() => {
    const load = async () => {
      try {
        const [n, e, v] = await Promise.all([
          fetch(`${base}/api/news`).then(r => r.json()),
          fetch(`${base}/api/events`).then(r => r.json()),
          fetch(`${base}/api/vacancies`).then(r => r.json()),
        ])
        setNews(n)
        setEvents(e)
        setVacancies(v)
      } catch (e) {
        console.error(e)
      }
    }
    load()
  }, [])

  return (
    <section className="py-10 grid lg:grid-cols-3 gap-4">
      <Card title="Latest News" meta={`${news.length} items`}>
        {news.length === 0 ? <p>No news yet.</p> : news.slice(0,5).map(n => (
          <div key={n._id} className="border-b border-white/10 pb-2">
            <div className="font-semibold text-white/90">{n.title}</div>
            <div className="text-xs text-blue-200/70">{n.department || 'General'} • {new Date(n.published_at || n.created_at).toLocaleDateString()}</div>
          </div>
        ))}
      </Card>

      <Card title="Upcoming Events" meta={`${events.length} items`}>
        {events.length === 0 ? <p>No events yet.</p> : events.slice(0,5).map(ev => (
          <div key={ev._id} className="border-b border-white/10 pb-2">
            <div className="font-semibold text-white/90">{ev.title}</div>
            <div className="text-xs text-blue-200/70">{ev.location} • {new Date(ev.start_date || ev.created_at).toLocaleDateString()}</div>
          </div>
        ))}
      </Card>

      <Card title="Open Vacancies" meta={`${vacancies.length} items`}>
        {vacancies.length === 0 ? <p>No vacancies yet.</p> : vacancies.slice(0,5).map(v => (
          <div key={v._id} className="border-b border-white/10 pb-2">
            <div className="font-semibold text-white/90">{v.title}</div>
            <div className="text-xs text-blue-200/70">{v.department} • Closes {new Date(v.closing_date || v.created_at).toLocaleDateString()}</div>
          </div>
        ))}
      </Card>
    </section>
  )
}

export default Feed
