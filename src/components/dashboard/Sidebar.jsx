function Sidebar({ onLogout }) {
  return (
    <aside className="sidebar">
      <div className="app-logo">
        <span>*</span> Task Z
      </div>
      <div className="workspace">
        <div className="workspace-icon">O</div>
        <strong>Opndoo Studio</strong>
      </div>
      <nav>
        <p>Main Menu</p>
        <button className="active">Dashboard</button>
        <button>Tasks</button>
        <button>Calendar</button>
        <button>Analytics</button>
        <button>Team</button>
      </nav>
      <nav>
        <p>General</p>
        <button>Setting</button>
        <button>Help</button>
      </nav>
      <button className="logout-btn" onClick={onLogout}>
  <span className="logout-icon">↩</span>
  Logout
</button>
    </aside>
  )
}

export default Sidebar
