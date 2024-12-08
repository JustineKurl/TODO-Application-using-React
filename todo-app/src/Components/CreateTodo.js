import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { TextareaAutosize, Button, Paper, Box } from '@mui/material';

function CreateTodo() {
    const [Subject, setSubject] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Subject !== "") {
            await addDoc(collection(db, "todos"), {
                Subject,
                completed: false,
            });
            setSubject("");
        }
    }

    return (
        <Paper 
            elevation={3} 
            style={{
                padding: '20px', 
                borderRadius: '15px', 
                width: '100%', // Full width
                margin: '20px 0', // No side margins for the Paper component
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'  // Shadow for form container
            }}
        >
            <form onSubmit={handleSubmit}>
                <Box style={{ marginBottom: '15px' }}>
                    <TextareaAutosize 
                        placeholder="What do you want to do?" 
                        value={Subject} 
                        onChange={(e) => setSubject(e.target.value)} 
                        style={{ 
                            width: '100%', 
                            minHeight: '40px', // Initial height
                            maxHeight: '150px', // Maximum height
                            fontSize: '18px', 
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc', // Border for better visibility
                            boxSizing: 'border-box' // Include padding in width calculation
                        }} 
                        minRows={1} // Minimum number of rows
                        maxRows={4} // Maximum number of rows
                    />
                </Box>
                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    style={{ 
                        backgroundColor: '#4dd0e1', 
                        color: 'white', 
                        fontWeight: 'bold',
                        padding: '10px 0',
                        borderRadius: '10px'  // Rounded button edges
                    }}
                >
                    Add Todo
                </Button>
            </form>
        </Paper>
    );
}

export default CreateTodo;




