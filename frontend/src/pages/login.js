import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [userData, setData] = useState({
        email: "",
        password: ''
    });

    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setData({
            ...userData,
            [e.target.name]: e.target.value
        })
        setErrors({
            ...errors,
            [e.target.name]: ""
        });
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleSubmit = async () => {
        const newErrors = {};

        if (!userData.email) {
            newErrors.email = "Email is required.";
        }

        if (!userData.password) {
            newErrors.password = "Password is required.";
        }

        else if (!validateEmail(userData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        else {
            try {
                const result = await axios.post("http://localhost:5001/users/login", userData);

                if (result.status === 200) {
                    localStorage.setItem("token", result.data.token)
                    localStorage.setItem("name", result.data.user.name)
                    localStorage.setItem("email", result.data.user.email)
                    localStorage.setItem("id", result.data.user.id)
                    navigate('/welcome')
                    alert("Login successful")
                } 
                
                else {
                    alert("Registration failed. Please try again.");
                }

            } catch (err) {
                alert(err.response.data.msg)
            }
        }

        setErrors(newErrors);
    }

    return (
        <>
            <br />
            <br />
            <Box display={"flex"} flexDirection={"column"} maxWidth={400} borderRadius={5} margin="auto" padding={3} alignItems="center" boxShadow={'5px 5px 10px #ccc'}>
                <Typography variant="h4">Login</Typography>
                <TextField type="email" placeholder="Email" margin="normal" name="email" value={userData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} />
                <TextField type="password" placeholder="Password" margin="normal" name="password" value={userData.password} onChange={handleChange} error={!!errors.password} helperText={errors.password} />
                <br />
                <Button variant="contained" color="warning" onClick={handleSubmit}>Login</Button>
            </Box>
        </>
    )
}

export default Login;