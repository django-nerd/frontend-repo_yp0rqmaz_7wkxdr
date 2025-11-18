import { useEffect, useMemo, useState } from 'react'

function Stat({ label, value }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-5">
      <div className="text-sm text-blue-100/80">{label}</div>
      <div className="text-2xl text-white font-bold">{value}</div>
    </div>
  )
}

function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="block text-sm text-blue-100/80 mb-1">{label}</span>
      <input {...props} className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </label>
  )
}

function Textarea({ label, ...props }) {
  return (
    <label className="block">
      <span className="block text-sm text-blue-100/80 mb-1">{label}</span>
      <textarea {...props} className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]" />
    </label>
  )
}

function Admin() {
  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [stats, setStats] = useState({})
  const [message, setMessage] = useState('')

  const loadStats = async () => {
    const res = await fetch(`${base}/api/admin/stats`)
    const data = await res.json()
    setStats(data)
  }

  const seedDepartments = async () => {
    const res = await fetch(`${base}/api/admin/seed-departments`, { method: 'POST' })
    const data = await res.json()
    setMessage(data.message || `Seeded: ${data.count}`)
    await loadStats()
  }

  useEffect(() => { loadStats() }, [])

  const submit = async (path, payload) => {
    const res = await fetch(`${base}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const data = await res.json()
    setMessage(`Saved with id ${data.id || 'N/A'}`)
    await loadStats()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <a href="/" className="text-blue-200 hover:text-white">Back to site</a>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Stat label="Employees" value={stats.employees ?? '—'} />
          <Stat label="Complaints" value={stats.complaints ?? '—'} />
          <Stat label="Departments" value={stats.departments ?? '—'} />
          <Stat label="News" value={stats.news ?? '—'} />
          <Stat label="Events" value={stats.events ?? '—'} />
          <Stat label="Vacancies" value={stats.vacancies ?? '—'} />
        </div>

        {message && (
          <div className="mb-6 p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-200">{message}</div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-xl bg-white/5 border border-white/10 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">Departments</h2>
              <button onClick={seedDepartments} className="px-3 py-1.5 rounded bg-blue-600 text-white text-sm">Seed 30 Departments</button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); const f = e.target; submit('/api/admin/departments', { name: f.name.value, description: f.description.value, services: f.services.value.split(',').map(s=>s.trim()).filter(Boolean) }) }} className="space-y-3">
              <Field label="Name" name="name" placeholder="Department of ..." required />
              <Textarea label="Description" name="description" placeholder="What does this department do?" required />
              <Field label="Services (comma separated)" name="services" placeholder="Citizen Support, Policy, ..." />
              <button className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-white">Add Department</button>
            </form>
          </div>

          <div className="rounded-xl bg-white/5 border border-white/10 p-5 space-y-6">
            <div>
              <h2 className="text-white font-semibold mb-2">Publish News</h2>
              <form onSubmit={(e) => { e.preventDefault(); const f = e.target; submit('/api/admin/news', { title: f.title.value, body: f.body.value, department: f.department.value || null }) }} className="space-y-3">
                <Field label="Title" name="title" required />
                <Textarea label="Body" name="body" required />
                <Field label="Department (optional)" name="department" />
                <button className="px-4 py-2 rounded bg-blue-600 text-white">Publish</button>
              </form>
            </div>

            <div>
              <h2 className="text-white font-semibold mb-2">Create Event</h2>
              <form onSubmit={(e) => { e.preventDefault(); const f = e.target; submit('/api/admin/events', { title: f.etitle.value, description: f.edesc.value, location: f.elocation.value, start_date: f.estart.value }) }} className="space-y-3">
                <Field label="Title" name="etitle" required />
                <Textarea label="Description" name="edesc" required />
                <Field label="Location" name="elocation" required />
                <Field label="Start Date" name="estart" type="datetime-local" required />
                <button className="px-4 py-2 rounded bg-blue-600 text-white">Add Event</button>
              </form>
            </div>

            <div>
              <h2 className="text-white font-semibold mb-2">Post Vacancy</h2>
              <form onSubmit={(e) => { e.preventDefault(); const f = e.target; submit('/api/admin/vacancies', { title: f.vtitle.value, department: f.vdepartment.value, description: f.vdesc.value, location: f.vlocation.value, closing_date: f.vclose.value }) }} className="space-y-3">
                <Field label="Title" name="vtitle" required />
                <Field label="Department" name="vdepartment" required />
                <Textarea label="Description" name="vdesc" required />
                <Field label="Location" name="vlocation" required />
                <Field label="Closing Date" name="vclose" type="date" required />
                <button className="px-4 py-2 rounded bg-blue-600 text-white">Post Vacancy</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
