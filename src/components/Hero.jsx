function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.25),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(20,184,166,0.2),transparent_35%)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Access government services and information in one place
            </h1>
            <p className="mt-4 text-blue-100/90 text-lg">
              Explore departments, stay updated with news and events, and find the latest vacancies.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a href="#departments" className="px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition">Explore Departments</a>
              <a href="/admin" className="px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition">Admin Dashboard</a>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 rounded-lg bg-white/5">
                <div className="text-3xl font-bold text-white">30</div>
                <div className="text-xs text-blue-100/70">Departments</div>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <div className="text-3xl font-bold text-white">News</div>
                <div className="text-xs text-blue-100/70">Stay informed</div>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <div className="text-3xl font-bold text-white">Events</div>
                <div className="text-xs text-blue-100/70">Never miss out</div>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <div className="text-3xl font-bold text-white">Vacancies</div>
                <div className="text-xs text-blue-100/70">Work with us</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
