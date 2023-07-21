import { AppBar, Typography, Toolbar, Button } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import Head from "./head";




const NavBar = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem("token")

    return (
        <AppBar sx={{ backgroundColor: '#063970' }} position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {
                        token && token !== null
                            ?
                            <Head />

                            :
                            <>
                                <Typography variant="h4" fontFamily="monospace" fontWeight={700} >CRUD Project</Typography>
                                <Button sx={{ marginLeft: 'auto' }} variant="contained" onClick={() => navigate('/login')}>Login</Button>
                                <Button sx={{ marginLeft: '10px' }} variant="contained" onClick={() => navigate('/')}>SignUp</Button>
                            </>
                    }
                </Toolbar>
            </Container>
        </AppBar >
    )
}

export default NavBar;


