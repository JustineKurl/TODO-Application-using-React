import React, { useState, useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import { TextareaAutosize, Button } from "@mui/material";

export default function Todo({
  todo,
  toggleComplete,
  handleEdit,
  handleDelete,
}) {
  const [newTitle, setNewTitle] = useState(todo.Subject);
  const [isEditing, setIsEditing] = useState(false);

  // Update newTitle when entering edit mode
  useEffect(() => {
    if (isEditing) {
      setNewTitle(todo.Subject); // Set newTitle to current todo subject when editing
    }
  }, [isEditing, todo.Subject]);

  const handleChange = (e) => {
    setNewTitle(e.target.value); // Update title on change
  };

  const handleEditSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    handleEdit(todo, newTitle); // Pass the updated title to handleEdit
    setIsEditing(false); // Exit editing mode
  };

  return (
    <div className="todo">
      {isEditing ? (
        <>
          {/* Container for all buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{
                backgroundColor: '#4caf50',
                color: 'white',
                marginRight: '10px'
              }}
              onClick={handleEditSubmit}
            >
              <DoneIcon style={{ marginRight: '5px', color: 'white' }} />
              DONE
            </Button>
          </div>

          <form onSubmit={handleEditSubmit} style={{ width: '100%' }}>
            <TextareaAutosize
              style={{
                width: '100%',
                minHeight: '40px',
                maxHeight: '150px',
                padding: '10px',
                fontSize: '1.2rem',
                border: '1px solid #ccc',
                borderRadius: '5px',
                marginBottom: '10px', // Space between input and buttons
                boxSizing: 'border-box', // Include padding and border in element's total width and height
              }}
              value={newTitle}
              onChange={handleChange}
              minRows={2} // Minimum number of rows
              maxRows={4} // Maximum number of rows
            />
          </form>
        </>
      ) : (
        <>
          <div style={{
            textDecoration: todo.completed ? "line-through" : "none",
            wordWrap: 'break-word',
            flex: 1,
            width: '100%',
          }}>
            {todo.Subject}
          </div>
          {/* Container for all buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
            <button className="button-complete" onClick={() => toggleComplete(todo)}>
              <CheckCircleIcon id="i" />
            </button>
            <button
              className="button-edit"
              onClick={() => setIsEditing(!isEditing)} // Toggle editing mode
            >
              <EditIcon id="i" />
            </button>
            <button className="button-delete" onClick={() => handleDelete(todo.id)}>
              <DeleteIcon id="i" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}



















