import { useEffect, useState, React } from "react";
import axios from 'axios'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Box, Typography, TextField, Button } from "@mui/material";

const List = () => {

    const [list, setList] = useState([]);

    const [searchList, setSearchList] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const getAllItems = async () => {
            try {
                const items = await axios('http://localhost:5001/users/getAllUsers');
                setList(items.data)

            } catch (err) {
                alert(err)
            }
        }
        getAllItems()
    }, [list]);

    const handleSearch = async (e) => {
        setSearchQuery(e.target.value)
        setSearchList([])
        if (searchQuery.length > -1) {
            try {
                const items = await axios.post(`http://localhost:5001/users/search`, { searchQuery: searchQuery });
                if (items.data.length == 0) {
                    console.log("not got data")
                    setSearchList([])
                }
                else {
                    console.log("got data")
                    setSearchList(items.data)
                }

            } catch (err) {
                alert(err);
            }
        }
    };

    return (
        <div >
            <br />
            <br />
            <Typography variant="h4" align="center">List of Users</Typography>
            <br />
            <br />
            <Box display="flex" flexDirection={"row"} maxWidth={1000} alignItems={"center"} margin="auto" borderRadius={5} boxShadow={"5px 5px 5px #ccc"} padding={3}>
                <>
                    <TextField name="search" type="text" placeholder="Search" value={searchQuery} onChange={handleSearch} fullWidth />
                </>
            </Box>
            <br />
            <br />
            <>
                <Typography variant="body1" align="center">{
                    searchQuery.length > 0 ?
                        searchList.length == 0 ? "No user found" : `Found ${searchList.length} users`
                        : "Showing all users"
                }</Typography>
            </>
            <br />
            <br />
            <Box display="flex" flexDirection={"column"} maxWidth={700} alignItems={"center"} margin="auto" borderRadius={5} boxShadow={'5px 5px 5px #ccc'} padding={3}>
                <TableContainer>
                    <Table size="medium">
                        <TableHead>
                            <TableRow>
                                <TableCell >
                                    <h2 >Name </h2>
                                </TableCell>
                                <TableCell >
                                    <h2>Email</h2>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                searchQuery.length > 0 ? searchList.map((item) => (
                                    <>
                                        <TableRow >
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.email}</TableCell>
                                        </TableRow>
                                    </>
                                )
                                ) :
                                    list.map((item) => (
                                        <>
                                            <TableRow >
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell>{item.email}</TableCell>
                                            </TableRow>
                                        </>
                                    )
                                    )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    )
}

export default List;