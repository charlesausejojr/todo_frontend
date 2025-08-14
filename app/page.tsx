"use client";

import React, { useState, useEffect } from "react";
import todoAPI from "@/lib/api";
import TodoList from "@/components/TodoList";
import { CreateTodoData, UpdateTodoData } from "@/types/todo";
import AddTodoForm from "@/components/AddTodoForm";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await todoAPI.getTodos();
      console.log(data);
      setTodos(data);
    } catch (err: any) {
      setError(err.message || "Failed to load todos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTodo = async (newTodo: CreateTodoData) => {
    setIsLoading(true);
    try {
      const created = await todoAPI.createTodo(newTodo);
      setTodos((prev) => [created, ...prev]);
    } catch (err: any) {
      setError(err.message || "Failed to add todo");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTodo = async (id: number, updates: UpdateTodoData) => {
    setIsLoading(true);
    try {
      const updated = await todoAPI.updateTodo(id, updates);
      setTodos((prev) => prev.map((todo) => (todo.id === id ? updated : todo)));
    } catch (err: any) {
      setError(err.message || "Failed to update todo");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    setIsLoading(true);
    try {
      await todoAPI.deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err: any) {
      setError(err.message || "Failed to delete todo");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📋 Todo Master
          </h1>
          <p className="text-gray-600">
            Organize your tasks and boost productivity
          </p>
        </header>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <strong>Error: </strong> {error}
            <div className="mt-2">
              <button
                onClick={loadTodos}
                className="bg-red-200 px-3 py-1 rounded mr-2"
              >
                Retry
              </button>
              <button onClick={() => setError(null)} className="text-red-700">
                Dismiss
              </button>
            </div>
          </div>
        )}

        <AddTodoForm onAdd={handleAddTodo} isLoading={isLoading} />

        <TodoList
          todos={todos}
          onUpdate={handleUpdateTodo}
          onDelete={handleDeleteTodo}
          isLoading={isLoading}
        />

        <footer className="text-center mt-12 text-gray-500 text-sm">
          Built with Next.js + TypeScript + FastAPI
        </footer>
      </div>
    </div>
  );
}
