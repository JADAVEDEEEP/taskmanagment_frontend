import { FaSearch, FaTimes } from 'react-icons/fa'

function Topbar({ search, setSearch, setPage, userName, resultCount }) {
  return (
    <header className="topbar">
      <div>
        <h1>Dashboard</h1>
        <p>{search ? `${resultCount} task result found` : 'Monitor all of your projects and tasks here'}</p>
      </div>
      <div className="top-actions">
        <div className="search-box">
          <FaSearch />
          <input
            value={search}
            onChange={(event) => {
              setSearch(event.target.value)
              setPage(1)
            }}
            placeholder="Search title or description"
          />
          {search && (
            <button
              type="button"
              className="clear-search"
              onClick={() => {
                setSearch('')
                setPage(1)
              }}
              aria-label="Clear search"
            >
              <FaTimes />
            </button>
          )}
        </div>
        <button>Ctrl K</button>
        <div className="avatar">{userName.charAt(0).toUpperCase()}</div>
      </div>
    </header>
  )
}

export default Topbar
