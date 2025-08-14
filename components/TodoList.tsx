"use client";

import React from "react";
import { Todo, UpdateTodoData } from "@/types/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: number, updates: UpdateTodoData) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  isLoading: boolean;
}

export default function TodoList({
  todos,
  onUpdate,
  onDelete,
  isLoading,
}: TodoListProps) {
  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📝</div>
        <h3 className="text-xl font-medium text-gray-600 mb-2">No todos yet</h3>
        <p className="text-gray-500">Add your first todo to get started!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Your Todos</h2>
        <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
          {completedCount} of {totalCount} completed
        </div>
      </div>
      <div className="space-y-4">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdate={onUpdate}
            onDelete={onDelete}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
}
