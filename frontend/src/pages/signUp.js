import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = e => {
        setInputs({
            ...inputs,
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
    };

    const handleSubmit = async () => {
        const newErrors = {};

        if (!inputs.name) {
            newErrors.name = "Name is required.";
        }

        if (!inputs.email) {
            newErrors.email = "Email is required.";
        }

        if (!inputs.password) {
            newErrors.password = "Password is required.";

        }

        if (!inputs.confirmPassword) {
            newErrors.confirmPassword = "Check Password is required.";

        }

        else if (!inputs.password.match("[@$#!%^&*]")) {
            newErrors.password = "Password must contain special symbols.";
        }

        else if (inputs.password !== inputs.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        else if (!validateEmail(inputs.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        else {
            try {
                const res = await axios.post("http://localhost:5001/users/register", inputs);

                if (res.status === 200) {
                    alert("Register successful")
                    navigate('/login');
                } else {
                    alert("Registration failed. Please try again.");
                }
            } catch (err) {
                alert(err.response.data.msg);
            }
        }

        setErrors(newErrors);
    }

    return (
        <>
            <br />
            <br />
            <Box display={"flex"} flexDirection={"column"} maxWidth={400} borderRadius={5} margin="auto" padding={3} alignItems="center" boxShadow={'5px 5px 10px #ccc'}>
                <Typography variant="h4">Register</Typography>
                <TextField type={"name"} placeholder="Name" margin="normal" value={inputs.name} name="name" onChange={handleChange} error={!!errors.name} helperText={errors.name} />
                <TextField type={"email"} placeholder="Email" margin="normal" value={inputs.email} name="email" onChange={handleChange} error={!!errors.email} helperText={errors.email} />
                <TextField type={"password"} placeholder="Password" margin="normal" value={inputs.password} name="password" onChange={handleChange} error={!!errors.password} helperText={errors.password} />
                <TextField type={"password"} placeholder="Confirm Password" margin="normal" value={inputs.confirmPassword} name="confirmPassword" onChange={handleChange} error={!!errors.confirmPassword} helperText={errors.confirmPassword} />
                <br />
                <Button variant="contained" color="warning" onClick={handleSubmit}>Submit</Button>
            </Box>
        </>
    )
}

export default Register;