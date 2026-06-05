function AuthVisual() {
  return (
    <section className="visual-panel">
      {/* Floating decorative cards */}
      <div className="visual-cards">
        <div className="floating-card">
          <h3>Design System</h3>
          <p>Create beautiful interfaces with our modern design components</p>
          <div className="task-status">
            <span className="done">12 Done</span>
            <span className="pending">3 Pending</span>
          </div>
        </div>
        <div className="floating-card">
          <h3>API Integration</h3>
          <p>Seamless backend connections with REST and GraphQL support</p>
          <div className="task-status">
            <span className="done">8 Done</span>
            <span className="pending">1 Pending</span>
          </div>
        </div>
        <div className="floating-card">
          <h3>User Testing</h3>
          <p>Comprehensive testing suite for all user flows</p>
          <div className="task-status">
            <span className="done">5 Done</span>
            <span className="pending">2 Pending</span>
          </div>
        </div>
      </div>

      {/* Progress circle */}
      <div className="visual-progress">
        <div className="progress-circle">
          <span>75%</span>
        </div>
      </div>

      {/* Main content */}
      <div className="visual-content">
        <h2>TaskFlow</h2>
        <p>Manage your tasks efficiently with our intuitive kanban board and real-time collaboration tools.</p>
      </div>
    </section>
  )
}

export default AuthVisual
