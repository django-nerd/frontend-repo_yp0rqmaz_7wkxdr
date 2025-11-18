import { useEffect, useState } from 'react'

const DepartmentCard = ({ dept }) => (
  <div className="group rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-5">
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-white font-semibold text-lg">{dept.name}</h3>
      <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-200">Services: {dept.services?.length || 0}</span>
    </div>
    <p className="text-blue-100/80 text-sm line-clamp-3">{dept.description}</p>
    {dept.services && dept.services.length > 0 && (
      <ul className="mt-3 text-xs text-blue-100/70 list-disc list-inside space-y-1">
        {dept.services.slice(0,3).map((s, i) => <li key={i}>{s}</li>)}
      </ul>
    )}
  </div>
)

function Departments() {
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/api/departments`)
        const data = await res.json()
        setDepartments(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <div className="text-blue-100">Loading departments...</div>

  return (
    <section className="py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-2xl font-bold">Government Departments</h2>
        <span className="text-blue-200/80 text-sm">{departments.length} departments</span>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {departments.map((d) => (
          <DepartmentCard key={d._id} dept={d} />
        ))}
      </div>
    </section>
  )
}

export default Departments
