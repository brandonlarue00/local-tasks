"use client";

import React, { useEffect, useState } from "react"; // useEffect?
import { v4 as uuidv4 } from "uuid";
import { Icon } from "@iconify-icon/react";

interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  completed: boolean;
  completedAt?: Date | null;
}

interface List {
  id: string;
  name: string;
  tasks: Task[];
}

interface Board {
  lists: List[];
}

const Kanban: React.FC = () => {
  const [board, setBoard] = useState<Board>(() => {
    if (typeof window !== "undefined") {
      const storedBoard = localStorage.getItem("board");
      return storedBoard ? JSON.parse(storedBoard) : { lists: [] };
    }
    return { lists: [] };
  });

  const addList = (name: string) => {
    const newList: List = {
      id: uuidv4(),
      name,
      tasks: [],
    };

    const updatedBoard = { ...board, lists: [...board.lists, newList] };
    setBoard(updatedBoard);
    localStorage.setItem("board", JSON.stringify(updatedBoard));
  };

  const addTaskToList = (
    listId: string,
    title: string,
    description: string
  ) => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      createdAt: new Date(),
      completed: false,
      completedAt: null,
    };

    const updatedLists = board.lists.map((list) =>
      list.id === listId ? { ...list, tasks: [...list.tasks, newTask] } : list
    );

    const updatedBoard = { ...board, lists: updatedLists };

    setBoard(updatedBoard);
    localStorage.setItem("board", JSON.stringify(updatedBoard));
  };

  const toggleTaskComplete = (listId: string, taskId: string) => {
    const updatedLists = board.lists.map((list) => {
      if (list.id === listId) {
        const updatedTasks = list.tasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                completed: !task.completed,
                completedAt: task.completed ? null : new Date(),
              }
            : task
        );
        return { ...list, tasks: updatedTasks };
      }
      return list;
    });

    const updatedBoard = { ...board, lists: updatedLists };

    setBoard(updatedBoard);
    localStorage.setItem("board", JSON.stringify(updatedBoard));
  };

  const deleteTaskFromList = (listId: string, taskId: string) => {
    const updatedLists = board.lists.map((list) => {
      if (listId === list.id) {
        const filteredTasks = list.tasks.filter((task) => task.id !== taskId);
        return { ...list, tasks: filteredTasks };
      }
      return list;
    });

    const updatedBoard = { ...board, lists: updatedLists };

    setBoard(updatedBoard);
    localStorage.setItem("board", JSON.stringify(updatedBoard));
  };

  return (
    <div className="flex flex-col h-full w-full items-center justify-center space-y-2 p-3">
      <h2 className="text-2xl font-bold text-black dark:text-white text-center">
        Task Manager
      </h2>
      <div className="flex flex-1 w-full flex-row space-x-2 items-start justify-start">
        {board.lists.map((list) => (
          <div
            key={list.id}
            className="flex flex-col flex-1 justify-start items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-2xl space-y-2"
          >
            <div className="flex flex-row w-full items-center justify-between">
              <h3 className="text-xl font-semibold text-black dark:text-gray-300">
                {list.name}
              </h3>
              <button className="rounded-lg p-2 hover:bg-gray-300">
                <Icon
                  icon="ph-dots-three-outline-light"
                  style={{ fontSize: "24px" }}
                />
              </button>
            </div>
            {list.tasks.map((task) => (
              <div
                key={task.id}
                className="flex flex-col w-full items-start justify-center space-y-2 bg-gray-300 dark:bg-gray-500 rounded-lg p-2 hover:border-2 hover:border-purple-500"
              >
                <h4 className="text-black font-semibold dark:text-gray-300">
                  {task.title}
                </h4>
                <p className="">{task.description}</p>
              </div>
            ))}
            <button
              onClick={() =>
                addTaskToList(list.id, "New Task", "This is a new task")
              }
              className="flex flex-row w-full items-center justify-start p-2 hover:bg-gray-300 hover:text-black dark:hover:text-white dark:hover:bg-gray-500 rounded-lg"
            >
              <Icon icon="ph-plus-light" style={{ fontSize: "24px" }} />
              <p>Add Task</p>
            </button>
          </div>
        ))}
        <button
          onClick={() => addList("New List")}
          className="flex flex-row flex-1 space-x-2 items-center justify-center rounded-2xl p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-500 opacity-50"
        >
          <Icon
            icon="ph-plus-light"
            style={{ fontSize: "24px", opacity: "100%" }}
          />
          <p className="opacity-100">Add List</p>
        </button>
      </div>
    </div>
  );
};

export default Kanban;

// figure out how to get the entire app to fill screen and then have headers and footers in layout file such that the pages are not bigger than the screen
