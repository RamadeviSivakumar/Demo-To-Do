
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Task = {
  id: number;
  taskName: string;
  description: string;
  date: string;
  priority: string;
  status: string;
};

export default function MonthlyDashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  // Load tasks from localStorage
  const loadTasks = () => {
    const savedTasks = JSON.parse(
      localStorage.getItem("dailyTasks") || "[]"
    );

    setTasks(savedTasks);
  };

  useEffect(() => {
    // Get current month
    const today = new Date();
    const currentMonth = today.toISOString().slice(0, 7);

    setSelectedMonth(currentMonth);

    // Load tasks
    loadTasks();

    // Reload tasks when browser/page gets focus
    window.addEventListener("focus", loadTasks);

    return () => {
      window.removeEventListener("focus", loadTasks);
    };
  }, []);

  // Tasks belonging to selected month
  const monthlyTasks = tasks.filter((task) =>
    task.date.startsWith(selectedMonth)
  );

  // -----------------------------
  // Statistics
  // -----------------------------

  const totalTasks = monthlyTasks.length;

  const completedTasks = monthlyTasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = monthlyTasks.filter(
    (task) => task.status === "Pending"
  ).length;

  // -----------------------------
  // Priority Statistics
  // -----------------------------

  const highPriority = monthlyTasks.filter(
    (task) => task.priority === "High"
  ).length;

  const mediumPriority = monthlyTasks.filter(
    (task) => task.priority === "Medium"
  ).length;

  const lowPriority = monthlyTasks.filter(
    (task) => task.priority === "Low"
  ).length;

  // -----------------------------
  // Completion Percentage
  // -----------------------------

  const completionPercentage =
    totalTasks > 0
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

  return (
    <div className="monthly-page">
      <div className="monthly-container">

        {/* Page Title */}
        <h1>Monthly Dashboard</h1>

        {/* Month Selection */}
        <div className="month-selector">
          <label>Select Month</label>

          <input
            type="month"
            value={selectedMonth}
            onChange={(e) =>
              setSelectedMonth(e.target.value)
            }
          />
        </div>

        {/* Statistics */}
        <div className="stats-container">

          <div className="stat-card">
            <h3>Total Tasks</h3>
            <p>{totalTasks}</p>
          </div>

          <div className="stat-card">
            <h3>Completed</h3>
            <p>{completedTasks}</p>
          </div>

          <div className="stat-card">
            <h3>Pending</h3>
            <p>{pendingTasks}</p>
          </div>

          <div className="stat-card">
            <h3>Completion</h3>
            <p>{completionPercentage}%</p>
          </div>

        </div>

        {/* Priority Statistics */}
        <h2>Priority Summary</h2>

        <div className="priority-container">

          <div className="priority-card">
            <h3>High</h3>
            <p>{highPriority}</p>
          </div>

          <div className="priority-card">
            <h3>Medium</h3>
            <p>{mediumPriority}</p>
          </div>

          <div className="priority-card">
            <h3>Low</h3>
            <p>{lowPriority}</p>
          </div>

        </div>

        {/* Monthly Tasks */}
        <h2>Monthly Tasks</h2>

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Task</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {monthlyTasks.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  No tasks found for this month
                </td>
              </tr>
            ) : (
              monthlyTasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.date}</td>
                  <td>{task.taskName}</td>
                  <td>{task.description}</td>
                  <td>{task.priority}</td>
                  <td>{task.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Back Button */}
        <Link href="/" className="back-button">
          Back to Daily Tasks
        </Link>

      </div>
    </div>
  );
}

