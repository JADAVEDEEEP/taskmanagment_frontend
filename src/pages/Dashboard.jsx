import { useCallback, useEffect, useMemo, useState } from 'react'
import Toast from '../components/common/Toast'
import ProgressPanel from '../components/dashboard/ProgressPanel'
import Sidebar from '../components/dashboard/Sidebar'
import StatsGrid from '../components/dashboard/StatsGrid'
import TaskForm from '../components/dashboard/TaskForm'
import TaskTable from '../components/dashboard/TaskTable'
import Topbar from '../components/dashboard/Topbar'
import { EMPTY_TASK, PAGE_SIZE } from '../constants/tasks'
import { apiRequest } from '../services/api'

function Dashboard({ token, userName, onLogout }) {
  const [tasks, setTasks] = useState([])
  const [taskForm, setTaskForm] = useState(EMPTY_TASK)
  const [editingId, setEditingId] = useState('')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [message, setMessage] = useState('')
  const [toast, setToast] = useState({ message: '', type: 'success' })
  const [formLoading, setFormLoading] = useState(false)
  const [deletingId, setDeletingId] = useState('')
  const [togglingId, setTogglingId] = useState('')

  const fetchTasks = useCallback(async () => {
    try {
      const data = await apiRequest('/taskapi/get-task', {}, token)
      setTasks(Array.isArray(data) ? data : data.tasks || [])
      setMessage('')
    } catch {
      setMessage('Task API ready hone ke baad tasks yaha load honge.')
    }
  }, [token])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTasks()
  }, [fetchTasks])

  const completedCount = tasks.filter((task) => task.status === 'completed').length
  const pendingCount = tasks.filter((task) => task.status !== 'completed').length
  const progress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0

  const visibleTasks = useMemo(() => {
    return tasks.filter((task) => {
      const searchableText = `${task.title} ${task.description} ${task.status}`.toLowerCase()
      const matchesSearch = searchableText.includes(search.toLowerCase())
      const matchesFilter = filter === 'all' || task.status === filter
      return matchesSearch && matchesFilter
    })
  }, [tasks, search, filter])

  const totalPages = Math.max(1, Math.ceil(visibleTasks.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paginatedTasks = visibleTasks.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  async function handleTaskSubmit(event) {
    event.preventDefault()

    if (!taskForm.title.trim()) {
      setMessage('Task title required hai.')
      return
    }

    if (!taskForm.description.trim()) {
      setMessage('Task description required hai.')
      return
    }

    try {
      setFormLoading(true)
      if (editingId) {
        const updated = await apiRequest(
          `/taskapi/update-task/${editingId}`,
          {
            method: 'PUT',
            body: JSON.stringify(taskForm),
          },
          token,
        )
        setTasks((current) => current.map((task) => (task._id === editingId ? updated.task || updated : task)))
        showToast('Task updated successfully.')
      } else {
        const created = await apiRequest(
          '/taskapi/post-task',
          {
            method: 'POST',
            body: JSON.stringify(taskForm),
          },
          token,
        )
        setTasks((current) => [created.task || created, ...current])
        showToast('Task created successfully.')
      }

      setTaskForm(EMPTY_TASK)
      setEditingId('')
      setMessage('')
    } catch (error) {
      setMessage(error.message)
      showToast(error.message, 'error')
    } finally {
      setFormLoading(false)
    }
  }

  async function deleteTask(id) {
    try {
      setDeletingId(id)
      await apiRequest(`/taskapi/delete-task/${id}`, { method: 'DELETE' }, token)
      setTasks((current) => current.filter((task) => task._id !== id))
      showToast('Task deleted successfully.')
    } catch (error) {
      setMessage(error.message)
      showToast(error.message, 'error')
    } finally {
      setDeletingId('')
    }
  }

  async function toggleTask(task) {
    const nextStatus = task.status === 'completed' ? 'pending' : 'completed'

    try {
      setTogglingId(task._id)
      const updated = await apiRequest(
        `/taskapi/update-task/${task._id}`,
        {
          method: 'PUT',
          body: JSON.stringify({ ...task, status: nextStatus }),
        },
        token,
      )
      setTasks((current) => current.map((item) => (item._id === task._id ? updated.task || updated : item)))
      showToast(`Task marked as ${nextStatus}.`)
    } catch (error) {
      setMessage(error.message)
      showToast(error.message, 'error')
    } finally {
      setTogglingId('')
    }
  }

  function editTask(task) {
    setEditingId(task._id)
    setTaskForm({
      title: task.title || '',
      description: task.description || '',
      status: task.status || 'pending',
    })
  }

  function showToast(message, type = 'success') {
    setToast({ message, type })
    window.setTimeout(() => setToast({ message: '', type: 'success' }), 2600)
  }

  return (
    <main className="dashboard-shell">
      <Toast message={toast.message} type={toast.type} />
      <Sidebar onLogout={onLogout} />

      <section className="dashboard-main">
        <Topbar
          search={search}
          setSearch={setSearch}
          setPage={setPage}
          userName={userName}
          resultCount={visibleTasks.length}
        />

        <StatsGrid total={tasks.length} completed={completedCount} pending={pendingCount} progress={progress} />

        <section className="content-grid">
          <TaskForm
            taskForm={taskForm}
            setTaskForm={setTaskForm}
            editingId={editingId}
            setEditingId={setEditingId}
            onSubmit={handleTaskSubmit}
            message={message}
            loading={formLoading}
          />
          <ProgressPanel progress={progress} />
        </section>

        <TaskTable
          search={search}
          filter={filter}
          setFilter={setFilter}
          setPage={setPage}
          visibleCount={visibleTasks.length}
          paginatedTasks={paginatedTasks}
          onToggle={toggleTask}
          onEdit={editTask}
          onDelete={deleteTask}
          deletingId={deletingId}
          togglingId={togglingId}
          page={currentPage}
          totalPages={totalPages}
        />
      </section>
    </main>
  )
}

export default Dashboard
