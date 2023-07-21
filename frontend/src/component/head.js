import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
    const navigate = useNavigate();

    const handleHome=()=>{
        navigate('/welcome')
    }

    const handleList=()=>{
        navigate('/list')
    }

    const handlogOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("id");
        navigate('/login')
    }

    return (
        <>
            <Button variant="contained" sx={{ marginRight: "100px" }} onClick={handleHome}>Home</Button>
            <Button variant="contained" onClick={handleList}>List</Button>
            <Button variant="contained" sx={{ marginLeft: "auto" }} onClick={handlogOut}>LogOut</Button>
        </>
    )
}

export default Welcome;