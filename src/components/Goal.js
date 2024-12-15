import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure axios is installed
import { format } from "date-fns";  // Import date-fns' format function
import "./Track.css";

function Goal() {
  const [goals, setGoals] = useState([]);
  const [error, setError] = useState(null);
  const [newGoal, setNewGoal] = useState({
    goal_amount: "",
  });
  const [updateGoal, setUpdateGoal] = useState({
    id: "",
    goal_amount: "",
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState(null);

  useEffect(() => {
    // Get user_id from localStorage or any state management
    const userId = localStorage.getItem("user_id");

    if (!userId) {
      setError("User ID not found.");
      return;
    }

    axios
      .get(`http://localhost:7002/goals/${userId}`)  // Fetch goals by user_id
      .then((response) => {
        setGoals(response.data.data);  // Set the fetched goals to state
      })
      .catch((error) => {
        console.error("Error fetching goals:", error);
        setError("Failed to fetch goals.");
      });
  }, []);  // Empty dependency array means this runs once after the first render
  
  // Create Goal function
  const handleCreateGoal = () => {
    if (!newGoal.goal_amount) {
      alert("Please fill in all fields.");
      return;
    }

    // Get user_id from localStorage for 'created_by' field
    const userId = localStorage.getItem("user_id");

    if (!userId) {
      alert("User is not authenticated.");
      return;
    }

    const newGoalData = {
      goal_amount: newGoal.goal_amount,
      created_by: userId,  // Use the actual user ID from localStorage
    };

    axios
      .post("http://localhost:7002/goals", newGoalData)
      .then((response) => {
        console.log("Goal added:", response.data);
        setGoals([...goals, response.data.data]); // Add the new goal to the state
        setIsCreateModalOpen(false); // Close the modal
      })
      .catch((error) => {
        console.error("Error adding goal:", error);
      });
  };

  // Update Goal function
  const handleUpdateGoal = () => {
    if (!updateGoal.goal_amount) {
      alert("Please fill in all fields.");
      return;
    }

    axios
      .put(`http://localhost:7002/goals/${updateGoal.id}`, updateGoal)
      .then((response) => {
        console.log("Goal updated:", response.data);
        setGoals(
          goals.map((goal) =>
            goal.id === updateGoal.id ? updateGoal : goal
          )
        ); // Update the goal in the state
        setIsUpdateModalOpen(false); // Close the modal
      })
      .catch((error) => {
        console.error("Error updating goal:", error);
      });
  };

  // Delete Goal function
  const handleDelete = () => {
    axios
      .delete(`http://localhost:7002/goals/${goalToDelete.id}`)
      .then((response) => {
        setGoals(goals.filter((goal) => goal.id !== goalToDelete.id));
        console.log("Goal deleted:", response.data);
        setIsDeleteModalOpen(false); // Close the delete modal
      })
      .catch((error) => {
        console.error("Error deleting goal:", error);
      });
  };

  // Open Create Modal
  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  // Close Create Modal
  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  // Open Update Modal and populate the form with the selected goal data
  const openUpdateModal = (goal) => {
    setUpdateGoal(goal);
    setIsUpdateModalOpen(true);
  };

  // Close Update Modal
  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  // Open Delete Confirmation Modal
  const openDeleteModal = (goal) => {
    setGoalToDelete(goal);
    setIsDeleteModalOpen(true);
  };

  // Close Delete Confirmation Modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setGoalToDelete(null);
  };

  if (error) {
    return (
      <div className="goal-page-container container py-5">
        <h1 className="text-center mb-4">Track Your Goals</h1>
        <p className="text-center text-danger">{error}</p>
      </div>
    );
  }

  return (
    <div className="goal-page-container container py-5">
      <h1 className="text-center mb-4">Track Your Goals</h1>

      {/* Create Button */}
      <div className="text-center mb-3">
        <button className="btn btn-primary" onClick={openCreateModal}>
          Add New Goal
        </button>
      </div>

      {/* Create Modal */}
      {isCreateModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create New Goal</h2>
            <div>
              <label>Goal Amount</label>
              <input
                type="number"
                value={newGoal.goal_amount}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, goal_amount: e.target.value })
                }
              />
            </div>
            <div className="mt-3">
              <button className="btn btn-success" onClick={handleCreateGoal}>
                Save
              </button>
              <button className="btn btn-secondary ml-2" onClick={closeCreateModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {isUpdateModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Update Goal</h2>
            <div>
              <label>Goal Amount</label>
              <input
                type="number"
                value={updateGoal.goal_amount}
                onChange={(e) =>
                  setUpdateGoal({ ...updateGoal, goal_amount: e.target.value })
                }
              />
            </div>
            <div className="mt-3">
              <button className="btn btn-success" onClick={handleUpdateGoal}>
                Save
              </button>
              <button className="btn btn-secondary ml-2" onClick={closeUpdateModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Are you sure you want to delete this goal?</h2>
            <div className="mt-3">
              <button className="btn btn-danger" onClick={handleDelete}>
                Yes, Delete
              </button>
              <button className="btn btn-secondary ml-2" onClick={closeDeleteModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table Section */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Goal Amount</th>
              <th scope="col">Created By</th>
              <th scope="col">Created Date</th>
              <th scope="col">Actions</th> {/* Action Column */}
            </tr>
          </thead>
          <tbody>
            {goals.map((goal) => (
              <tr key={goal.id}>
                <td>{goal.goal_amount}</td>
                <td>{goal.created_by}</td>
                <td>{goal.created_date ? format(new Date(goal.created_date), "dd/MM/yyyy") : "-"}</td> {/* Format date */}
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => openUpdateModal(goal)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger btn-sm ml-2"
                    onClick={() => openDeleteModal(goal)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Goal;
