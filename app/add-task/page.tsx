
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TaskPage() {
    const router = useRouter();

    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [priority, setPriority] = useState("");

    const handleAddTask = (e) => {
        e.preventDefault();

        // Check if any field is empty
        if (
            !taskName.trim() ||
            !description.trim() ||
            !date ||
            !priority
        ) {
            alert("Please fill all the fields");
            return;
        }

        // Create new task
        const newTask = {
            id: Date.now(),
            taskName: taskName.trim(),
            description: description.trim(),
            date: date,
            priority: priority,
            status: "Pending",
        };

        // Get existing tasks
        const existingTasks = JSON.parse(
            localStorage.getItem("dailyTasks") || "[]"
        );

        // Add new task
        const updatedTasks = [...existingTasks, newTask];

        // Save tasks
        localStorage.setItem(
            "dailyTasks",
            JSON.stringify(updatedTasks)
        );

        // Go to Daily Task page
        router.push("/");
    };

    return (
        <div className="task-page">
            <div className="task-container">

                <h1>Add Task</h1>

                <form onSubmit={handleAddTask}>

                    {/* Task Name */}
                    <div className="form-group">
                        <label>Task Name</label>

                        <input
                            type="text"
                            placeholder="Enter task name"
                            value={taskName}
                            onChange={(e) =>
                                setTaskName(e.target.value)
                            }
                        />
                    </div>

                    {/* Description */}
                    <div className="form-group">
                        <label>Description</label>

                        <textarea
                            placeholder="Enter task description"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                        />
                    </div>

                    {/* Date */}
                    <div className="form-group">
                        <label>Date</label>

                        <input
                            type="date"
                            value={date}
                            onChange={(e) =>
                                setDate(e.target.value)
                            }
                        />
                    </div>

                    {/* Priority */}
                    <div className="form-group">
                        <label>Priority</label>

                        <select
                            value={priority}
                            onChange={(e) =>
                                setPriority(e.target.value)
                            }
                        >
                            <option value="">
                                Select Priority
                            </option>

                            <option value="High">
                                High
                            </option>

                            <option value="Medium">
                                Medium
                            </option>

                            <option value="Low">
                                Low
                            </option>
                        </select>
                    </div>

                    {/* Add Button */}
                    <button
                        type="submit"
                        className="add-button"
                    >
                        Add Task
                    </button>

                </form>
            </div>
        </div>
    );
}

