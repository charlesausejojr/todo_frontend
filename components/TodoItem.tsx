"use client";

import React, { useState } from "react";
import { Todo, UpdateTodoData } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: number, updates: UpdateTodoData) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  isLoading: boolean;
}

export default function TodoItem({
  todo,
  onUpdate,
  onDelete,
  isLoading,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(todo.title);
  const [editDescription, setEditDescription] = useState<string>(
    todo.description || ""
  );

  const handleToggleComplete = async (): Promise<void> => {
    await onUpdate(todo.id, { completed: !todo.completed });
  };

  const handleSaveEdit = async (): Promise<void> => {
    if (!editTitle.trim()) return;

    await onUpdate(todo.id, {
      title: editTitle.trim(),
      description: editDescription.trim() || null,
    });
    setIsEditing(false);
  };

  const handleCancelEdit = (): void => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
    setIsEditing(false);
  };

  const handleDelete = async (): Promise<void> => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      await onDelete(todo.id);
    }
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${
        todo.completed ? "border-green-500 bg-green-50" : "border-blue-500"
      }`}
    >
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            disabled={isLoading}
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
            rows={2}
            placeholder="Description (optional)..."
            disabled={isLoading}
          />
          <div className="flex gap-2">
            <button
              onClick={handleSaveEdit}
              disabled={!editTitle.trim() || isLoading}
              className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-3 py-1 rounded flex items-center gap-1 transition-colors duration-200"
            >
              <span>💾</span>
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              disabled={isLoading}
              className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white px-3 py-1 rounded flex items-center gap-1 transition-colors duration-200"
            >
              <span>❌</span>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3
                className={`font-medium text-lg ${
                  todo.completed
                    ? "text-gray-500 line-through"
                    : "text-gray-800"
                }`}
              >
                {todo.title}
              </h3>
              {todo.description && (
                <p
                  className={`text-sm mt-1 ${
                    todo.completed
                      ? "text-gray-400 line-through"
                      : "text-gray-600"
                  }`}
                >
                  {todo.description}
                </p>
              )}
              <p className="text-xs text-gray-400 mt-2">
                Created: {new Date(todo.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2 ml-4">
              <button
                onClick={handleToggleComplete}
                disabled={isLoading}
                className={`p-1 rounded transition-colors duration-200 ${
                  todo.completed
                    ? "text-green-600 hover:bg-green-100"
                    : "text-gray-400 hover:bg-gray-100"
                }`}
                title={todo.completed ? "Mark incomplete" : "Mark complete"}
              >
                <span className="text-xl">{todo.completed ? "✅" : "⭕"}</span>
              </button>
              <button
                onClick={() => setIsEditing(true)}
                disabled={isLoading}
                className="text-blue-600 hover:bg-blue-100 p-1 rounded transition-colors duration-200"
                title="Edit todo"
              >
                <span className="text-xl">✏️</span>
              </button>
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="text-red-600 hover:bg-red-100 p-1 rounded transition-colors duration-200"
                title="Delete todo"
              >
                <span className="text-xl">🗑️</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
