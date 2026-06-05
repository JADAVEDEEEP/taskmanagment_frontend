import { FaCheck, FaRegClock, FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'
import Spinner from '../common/Spinner'

function TaskTable({
  search,
  filter,
  setFilter,
  visibleCount,
  paginatedTasks,
  onToggle,
  onEdit,
  onDelete,
  deletingId,
  togglingId,
  page,
  totalPages,
  setPage,
}) {
  return (
    <section className="kanban-board">
      <div className="board-toolbar">
        <div>
          <p>Design Team Board</p>
          <h2>Task CRUD Board</h2>
        </div>
        <div className="board-actions">
          <span>{visibleCount} Tasks</span>
          <select
            value={filter}
            onChange={(event) => {
              setFilter(event.target.value)
              setPage(1)
            }}
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="task-card-grid">
        {paginatedTasks.map((task) => (
          <article className="kanban-card" key={task._id}>
            <div className="card-title-row">
              <div className="task-title-block">
                <h4>{task.title}</h4>
                <span className={`mini-status ${task.status === 'completed' ? 'completed' : 'pending'}`}>
                  {task.status === 'completed' ? 'Completed' : 'Pending'}
                </span>
              </div>
              <div className="icon-actions">
                <button
                  className={`icon-action toggle ${task.status === 'completed' ? 'completed' : 'pending'}`}
                  onClick={() => onToggle(task)}
                  disabled={togglingId === task._id}
                  aria-label={task.status === 'completed' ? 'Mark task as pending' : 'Mark task as completed'}
                  title={task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
                >
                  {togglingId === task._id ? (
                    <Spinner small />
                  ) : task.status === 'completed' ? (
                    <FaRegClock />
                  ) : (
                    <FaCheck />
                  )}
                </button>
                <button className="icon-action edit" onClick={() => onEdit(task)} aria-label="Edit task" title="Edit task">
                  <FaRegEdit />
                </button>
                <button
                  className="icon-action delete"
                  onClick={() => onDelete(task._id)}
                  disabled={deletingId === task._id}
                  aria-label="Delete task"
                  title="Delete task"
                >
                  {deletingId === task._id ? <Spinner small /> : <FaRegTrashAlt />}
                </button>
              </div>
            </div>
            <p>{task.description || 'No description'}</p>
          </article>
        ))}

        {!paginatedTasks.length && (
          <div className="empty-drop blue">
            {search || filter !== 'all' ? 'No tasks match your search or filter' : 'No tasks found'}
          </div>
        )}
      </div>

      <div className="pagination board-pagination">
        <button disabled={page === 1} onClick={() => setPage((current) => current - 1)}>
          Prev
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button disabled={page === totalPages} onClick={() => setPage((current) => current + 1)}>
          Next
        </button>
      </div>
    </section>
  )
}

export default TaskTable
