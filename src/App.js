import React, { useState } from "react";
import "./App.css"; // Import styles

function App() {
  // State for all tasks
  const [tasks, setTasks] = useState([]);
  // State for completed tasks
  const [completedTasks, setCompletedTasks] = useState([]);
  // State for input fields
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("top");
  const [deadline, setDeadline] = useState("");

  // Handle task input change
  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  // Handle priority select change
  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  // Handle deadline input change
  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  // Add a new task
  const addTask = () => {
    // Validate input
    if (task.trim() === "" || deadline === "") {
      alert("Please enter a task and select a valid deadline.");
      return;
    }

    // Check if deadline is in the future
    const selectedDate = new Date(deadline);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      alert("Please select a future date for the deadline.");
      return;
    }

    // Create new task object
    const newTask = {
      id: tasks.length + 1,
      task,
      priority,
      deadline,
      done: false,
    };

    // Add to tasks list
    setTasks([...tasks, newTask]);

    // Reset input fields
    setTask("");
    setPriority("top");
    setDeadline("");
  };

  // Mark a task as done
  const markDone = (id) => {
    // Update done status in tasks
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, done: true } : t
    );
    setTasks(updatedTasks);

    // Move to completed tasks
    const completedTask = tasks.find((t) => t.id === id);
    if (completedTask) {
      setCompletedTasks([...completedTasks, completedTask]);
    }
  };

  // Filter out tasks that are not done
  const upcomingTasks = tasks.filter((t) => !t.done);

  return (
    <div className="App">
      <header>
        <h1>Task Scheduler</h1>
      </header>
      <main>
        {/* Task input form */}
        <div className="task-form">
          <input
            type="text"
            id="task"
            placeholder="Enter task..."
            value={task}
            onChange={handleTaskChange}
          />
          <select
            id="priority"
            value={priority}
            onChange={handlePriorityChange}
          >
            <option value="top">Top Priority</option>
            <option value="middle">Middle Priority</option>
            <option value="low">Less Priority</option>
          </select>
          <input
            type="date"
            id="deadline"
            value={deadline}
            onChange={handleDeadlineChange}
          />
          <button id="add-task" onClick={addTask}>
            Add Task
          </button>
        </div>
        {/* Upcoming tasks table */}
        <h2 className="heading">Upcoming Tasks</h2>
        <div className="task-list" id="task-list">
          <table>
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Priority</th>
                <th>Deadline</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {upcomingTasks.map((t) => (
                <tr key={t.id}>
                  <td>{t.task}</td>
                  <td>{t.priority}</td>
                  <td>{t.deadline}</td>
                  <td>
                    {/* Show mark done button if not done */}
                    {!t.done && (
                      <button
                        className="mark-done"
                        onClick={() => markDone(t.id)}
                      >
                        Mark Done
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Completed tasks table */}
        <div className="completed-task-list">
          <h2 className="cheading">Completed Tasks</h2>
          <table>
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Priority</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody>
              {completedTasks.map((ct) => (
                <tr key={ct.id}>
                  <td>{ct.task}</td>
                  <td>{ct.priority}</td>
                  <td>{ct.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default App;
