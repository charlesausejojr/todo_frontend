"use client";

import React, { useState } from "react";
import { CreateTodoData } from "@/types/todo";

interface AddTodoFormProps {
  onAdd: (todo: CreateTodoData) => Promise<void>;
  isLoading: boolean;
}

export default function AddTodoForm({ onAdd, isLoading }: AddTodoFormProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = async (): Promise<void> => {
    if (!title.trim()) return;

    const newTodo: CreateTodoData = {
      title: title.trim(),
      description: description.trim() || null,
    };

    await onAdd(newTodo);
    setTitle("");
    setDescription("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Todo</h2>
      <div className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Todo title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            disabled={isLoading}
          />
        </div>
        <div>
          <textarea
            placeholder="Description (optional)..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
            rows={3}
            disabled={isLoading}
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!title.trim() || isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <span className="text-xl">+</span>
          {isLoading ? "Adding..." : "Add Todo"}
        </button>
      </div>
    </div>
  );
}
