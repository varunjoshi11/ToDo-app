'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getTodos, createTodo, updateTodo, deleteTodo } from '@/lib/api';

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

export default function TodosPage() {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ title: '', description: '' });
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    const storedName = localStorage.getItem('name') || 'User';
    setName(storedName);
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await getTodos();
      setTodos(res.data);
    } catch (err) {
      setError('Failed to load todos.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setAdding(true);
    try {
      await createTodo({ ...form, completed: false });
      setForm({ title: '', description: '' });
      fetchTodos();
    } catch (err) {
      setError('Failed to add todo.');
    } finally {
      setAdding(false);
    }
  };

  const handleToggle = async (todo: Todo) => {
    try {
      await updateTodo(todo.id, {
        title: todo.title,
        description: todo.description,
        completed: !todo.completed,
      });
      fetchTodos();
    } catch (err) {
      setError('Failed to update todo.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      fetchTodos();
    } catch (err) {
      setError('Failed to delete todo.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Todo App</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Hello, {name}</span>
          <button
            onClick={handleLogout}
            className="text-sm bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8">

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Todo</h2>
          <form onSubmit={handleAdd} className="space-y-3">
            <input
              type="text"
              placeholder="Todo title *"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Description (optional)"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={adding}
              className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
            >
              {adding ? 'Adding...' : 'Add Todo'}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Your Todos
            <span className="ml-2 text-sm font-normal text-gray-400">
              ({todos.filter(t => !t.completed).length} remaining)
            </span>
          </h2>

          {loading ? (
            <p className="text-sm text-gray-400 text-center py-8">Loading todos...</p>
          ) : todos.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">
              No todos yet. Add one above!
            </p>
          ) : (
            <ul className="space-y-3">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50 transition"
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggle(todo)}
                    className="mt-1 w-4 h-4 accent-blue-600 cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                      {todo.title}
                    </p>
                    {todo.description && (
                      <p className="text-xs text-gray-400 mt-0.5">{todo.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="text-xs text-red-400 hover:text-red-600 transition shrink-0"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}