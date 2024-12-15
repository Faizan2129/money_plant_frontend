import React, { useState, useEffect } from "react"; 
import axios from "axios"; // Ensure axios is installed
import { format } from "date-fns"; // Import date-fns for date formatting
import "./Track.css"; // Your custom CSS file

function Track() {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);
  const [newRecord, setNewRecord] = useState({
    amount: "",
    category: "",
    description: "",
    payment_method: "",
  });
  const [updateRecord, setUpdateRecord] = useState({
    id: "",
    amount: "",
    category: "",
    description: "",
    payment_method: "",
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");

    // Fetch records from the API
    axios
      .get(`http://localhost:7002/track-records/${userId}`)
      .then((response) => {
        console.log(response.data);  // Log the response to check its structure
        // If response.data.data is an array, set it as records
        if (Array.isArray(response.data.data)) {
          setRecords(response.data.data);
        } else {
          setError("No data found");
        }
      })
      .catch((error) => {
        console.error("Error fetching records:", error);
        setError("Failed to fetch records.");
      });
  }, []); // Empty dependency array means this runs once after the first render

  // Create Record function
  const handleCreateRecord = () => {
    const userId = localStorage.getItem("user_id");  // Get user_id from localStorage
    
    // Simple validation for required fields
    if (!newRecord.amount || !newRecord.category || !newRecord.payment_method) {
      alert("Please fill in all fields.");
      return;
    }
  
    // Add user_id to the new record data
    const recordWithUserId = { ...newRecord, user_id: userId };
  
    axios
      .post("http://localhost:7002/track-records", recordWithUserId)
      .then((response) => {
        console.log("Record added:", response.data);
        setRecords((prevRecords) => [...prevRecords, response.data.data]); // Add the new record to the state
        setIsCreateModalOpen(false); // Close the modal
      })
      .catch((error) => {
        console.error("Error adding record:", error);
      });
  };

  // Update Record function
  const handleUpdateRecord = () => {
    // Simple validation for required fields
    if (!updateRecord.amount || !updateRecord.category || !updateRecord.payment_method) {
      alert("Please fill in all fields.");
      return;
    }

    axios
      .put(`http://localhost:7002/track-records/${updateRecord.id}`, updateRecord)
      .then((response) => {
        console.log("Record updated:", response.data);
        setRecords(
          records.map((record) =>
            record.id === updateRecord.id ? updateRecord : record
          )
        ); // Update the record in the state
        setIsUpdateModalOpen(false); // Close the modal
      })
      .catch((error) => {
        console.error("Error updating record:", error);
      });
  };

  // Delete Record function
  const handleDelete = () => {
    axios
      .delete(`http://localhost:7002/track-records/${recordToDelete.id}`)
      .then((response) => {
        setRecords(records.filter((record) => record.id !== recordToDelete.id));
        console.log("Record deleted:", response.data);
        setIsDeleteModalOpen(false); // Close the delete modal
      })
      .catch((error) => {
        console.error("Error deleting record:", error);
      });
  };

  // Modal control functions
  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const openUpdateModal = (record) => {
    setUpdateRecord(record);
    setIsUpdateModalOpen(true);
  };
  const closeUpdateModal = () => setIsUpdateModalOpen(false);

  const openDeleteModal = (record) => {
    setRecordToDelete(record);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setRecordToDelete(null);
  };

  if (error) {
    return (
      <div className="track-page-container container py-5">
        <h1 className="text-center mb-4">Track Your Spending</h1>
        <p className="text-center text-danger">{error}</p>
      </div>
    );
  }

  return (
    <div className="track-page-container container py-5">
      <h1 className="text-center mb-4">Track Your Spending</h1>

      {/* Create Button */}
      <div className="text-center mb-3">
        <button className="btn btn-primary" onClick={openCreateModal}>
          Add New Record
        </button>
      </div>

      {/* Create Modal */}
      {isCreateModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create New Record</h2>
            <div>
              <label>Amount</label>
              <input
                type="number"
                value={newRecord.amount}
                onChange={(e) => setNewRecord({ ...newRecord, amount: e.target.value })}
              />
            </div>
            <div>
              <label>Category</label>
              <input
                type="text"
                value={newRecord.category}
                onChange={(e) => setNewRecord({ ...newRecord, category: e.target.value })}
              />
            </div>
            <div>
              <label>Description</label>
              <input
                type="text"
                value={newRecord.description}
                onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })}
              />
            </div>
            <div>
              <label>Payment Method</label>
              <select
                value={newRecord.payment_method}
                onChange={(e) => setNewRecord({ ...newRecord, payment_method: e.target.value })}
              >
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="Online">Online</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mt-3">
              <button className="btn btn-success" onClick={handleCreateRecord}>
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
            <h2>Update Record</h2>
            <div>
              <label>Amount</label>
              <input
                type="number"
                value={updateRecord.amount}
                onChange={(e) => setUpdateRecord({ ...updateRecord, amount: e.target.value })}
              />
            </div>
            <div>
              <label>Category</label>
              <input
                type="text"
                value={updateRecord.category}
                onChange={(e) => setUpdateRecord({ ...updateRecord, category: e.target.value })}
              />
            </div>
            <div>
              <label>Description</label>
              <input
                type="text"
                value={updateRecord.description}
                onChange={(e) => setUpdateRecord({ ...updateRecord, description: e.target.value })}
              />
            </div>
            <div>
              <label>Payment Method</label>
              <select
                value={updateRecord.payment_method}
                onChange={(e) => setUpdateRecord({ ...updateRecord, payment_method: e.target.value })}
              >
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="Online">Online</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mt-3">
              <button className="btn btn-success" onClick={handleUpdateRecord}>
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
            <h2>Are you sure you want to delete this record?</h2>
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
              <th scope="col">Amount</th>
              <th scope="col">Category</th>
              <th scope="col">Description</th>
              <th scope="col">Date</th>
              <th scope="col">Payment Method</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.amount}</td>
                <td>{record.category}</td>
                <td>{record.description}</td>
                <td>{format(new Date(record.transaction_date), 'MMMM dd, yyyy')}</td> {/* Date formatting */}
                <td>{record.payment_method}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => openUpdateModal(record)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger btn-sm ml-2"
                    onClick={() => openDeleteModal(record)}
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

export default Track;
