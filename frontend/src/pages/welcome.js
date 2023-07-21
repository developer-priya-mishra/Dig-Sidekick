import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const HomePage = () => {
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const id = localStorage.getItem("id");
    const navigate = useNavigate()

    const [isUpdate, setUpdate] = useState(false);

    const [newUpdate, setNewUpdate] = useState({
        name: name,
        email: email,
    });

    const handleEdit = () => {
        setUpdate(true);
    };

    const handleCancelEdit = () => {
        setUpdate(false);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:5001/users/${id}`, newUpdate);
            setUpdate(false);
            localStorage.setItem("name", newUpdate.name);
            localStorage.setItem("email", newUpdate.email);
            alert("User updated successfully")
        } catch (err) {
            alert(err);
        }
    };

    const deleteData = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/users/${id}`);
            localStorage.removeItem("token");
            localStorage.removeItem("name");
            localStorage.removeItem("email");
            localStorage.removeItem("id");
            alert("User deleted successfully")
            navigate('/login')
        } catch (err) {
            alert(err);
        }
    }

    return (
        <div>
            <br />
            <br />
            <Typography variant="h4" align="center">Welcome {name}</Typography>
            <br />
            <br />
            <Box display="flex" flexDirection={"row"} maxWidth={1000} alignItems={"center"} margin="auto" borderRadius={5} boxShadow={"5px 5px 5px #ccc"} padding={3}>
                {
                    isUpdate ?
                        (
                            <>
                                <TextField name="name" type="text" onChange={(e) => setNewUpdate({ ...newUpdate, [e.target.name]: e.target.value })} value={newUpdate.name} fullWidth />
                                <TextField name="email" type="email" onChange={(e) => setNewUpdate({ ...newUpdate, [e.target.name]: e.target.value })} value={newUpdate.email} fullWidth />
                                <Button variant="contained" sx={{ marginLeft: "5px" }} onClick={handleUpdate} > Update </Button>
                                <Button variant="contained" sx={{ marginLeft: "5px" }} onClick={handleCancelEdit} color="error">Cancel</Button>
                            </>
                        )
                        :

                        (
                            <>
                                <Typography variant="body1">Name : {name}</Typography>
                                <Typography variant="body1" style={{ marginLeft: "30px" }}>Email : {email}</Typography>
                                <Button variant="contained" sx={{ marginLeft: "auto" }} color="warning" onClick={handleEdit}>Edit</Button>
                                <Button variant="contained" sx={{ marginLeft: "10px" }} color="error" onClick={() => { deleteData(id) }}>Delete</Button>
                            </>
                        )
                }
            </Box>
        </div>
    );
};

export default HomePage;
