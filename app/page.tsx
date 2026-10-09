"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DailyTask() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(
      localStorage.getItem("dailyTasks") || "[]"
    );

    setTasks(savedTasks);

  }, []);
  const handleStatusChange = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ?
        {
          ...task,
          status: task.status === "Completed"
            ? "Pending" :
            "Completed",
        }
        : task);
    setTasks(updatedTasks);
    localStorage.setItem(
      "dailyTasks",
      JSON.stringify(updatedTasks)
    );
  };
  const handleDeleteTask = (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) {
      return;
    }

    const updatedTasks = tasks.filter(
      (task) => task.id !== id
    );

    setTasks(updatedTasks);

    localStorage.setItem(
      "dailyTasks",
      JSON.stringify(updatedTasks)
    );
  };


  return (
    <div className="daily-container">
      <h1>Daily Tasks</h1>



      <table>
        <thead>
          <tr>
            <th>✅</th>
            <th>Date</th>
            <th>Task Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>
                <input type="checkbox" 
                checked={task.status === "Completed"} 
                onChange={() => handleStatusChange(task.id)} />
                </td>
              <td>{task.date}</td>
              <td>{task.taskName}</td>
              <td>{task.description}</td>
              <td> {task.status} </td>
                <td><button
                  className="delete-button"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Task Button */}
      <div>
  <Link href="/add-task">
    <button className="add-task-btn">
      Add Task
    </button>
  </Link>

  <Link href="/monthly">
    <button className="add-task-btn">
      Monthly Dashboard
    </button>
  </Link>
</div>
    </div>
  );
} 