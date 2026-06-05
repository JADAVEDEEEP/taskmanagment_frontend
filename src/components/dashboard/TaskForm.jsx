import { EMPTY_TASK } from '../../constants/tasks'
import Spinner from '../common/Spinner'

function TaskForm({ taskForm, setTaskForm, editingId, setEditingId, onSubmit, message, loading }) {
  return (
    <form className="task-form" onSubmit={onSubmit}>
      <h2>{editingId ? 'Edit Task' : 'Add Task'}</h2>
      <input
        value={taskForm.title}
        onChange={(event) => setTaskForm({ ...taskForm, title: event.target.value })}
        placeholder="Task title"
      />
      <textarea
        value={taskForm.description}
        onChange={(event) => setTaskForm({ ...taskForm, description: event.target.value })}
        placeholder="Task description"
      />
      <select value={taskForm.status} onChange={(event) => setTaskForm({ ...taskForm, status: event.target.value })}>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <button className="primary-button" type="submit" disabled={loading}>
        {loading && <Spinner small />}
        {editingId ? 'Update Task' : 'Add Task'}
      </button>
      {editingId && (
        <button
          className="ghost-button"
          type="button"
          onClick={() => {
            setEditingId('')
            setTaskForm(EMPTY_TASK)
          }}
        >
          Cancel
        </button>
      )}
      {message && <p className="form-error">{message}</p>}
    </form>
  )
}

export default TaskForm
