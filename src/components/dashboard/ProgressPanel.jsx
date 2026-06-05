function ProgressPanel({ progress }) {
  return (
    <article className="analytics-panel">
      <div className="panel-head">
        <h2>Project Progress</h2>
        <button>+</button>
      </div>
      <div className="progress-ring" style={{ '--progress': `${progress * 3.6}deg` }}>
        <span>{progress}%</span>
        <small>Progress</small>
      </div>
      <div className="legend">
        <span></span> Complete <span></span> Pending
      </div>
    </article>
  )
}

export default ProgressPanel
