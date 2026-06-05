function StatCard({ title, value, label }) {
  return (
    <article>
      <p>{title}</p>
      <strong>{value}</strong>
      <span>{label}</span>
    </article>
  )
}

function StatsGrid({ total, completed, pending, progress }) {
  return (
    <section className="stats-grid">
      <StatCard title="Total Tasks" value={total} label="all projects" />
      <StatCard title="Completed Tasks" value={completed} label="done" />
      <StatCard title="Running Tasks" value={pending} label="pending" />
      <StatCard title="Progress" value={`${progress}%`} label="overall" />
    </section>
  )
}

export default StatsGrid
