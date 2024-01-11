import { useContext, useState } from "react";
import AuthContext from "../services/auth/AuthContext";
import { TextField, Button, Grid, Box, CardContent, Typography } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";


const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const loginSubmit = async (e) => {
        e.preventDefault();
        let payload = {
            email: email.trim(),
            senha: password.trim()
        }
        try {
            await login(payload);
        } catch (error) {
            console.log(error);;
            toast.warning(error.response.data.message)
        }
    };



    const handleEmail = (e) => {
        const email = e?.target?.value;
        setEmail(email)
    }
    const handlePassword = (e) => {
        const password = e?.target?.value;
        setPassword(password)
    }



    return (
        <>
            <ToastContainer />
            <Grid container justifyContent="center" alignItems="center" height="100vh" sx={{ background: "#000" }} >
                <Grid display="flex" width="80vw" height="70vh" justifyContent="space-around" alignItems="center" style={{
                    background: "black", borderRadius: "10px",
                }}>
                    <Grid xs={12} sm={9} md={4} sx={{ width: "50%" }}>
                        <Box>
                            <CardContent>
                                <Typography style={{ fontFamily: 'Belanosima, sans-serif' }} variant="h5" component="h2" align="right" color="#ed6c02" fontSize="40px">
                                    EASYMOTOS
                                </Typography>
                            </CardContent>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={9} md={4} height="75vh" display="flex" flexDirection={"column"} justifyContent="center" alignItems="center" p={4} border={"1px solid #ed6c02"} sx={{ backgroundColor: 'black', borderRadius: '10px' }}>
                        <Box mt={20}>
                            <form onSubmit={loginSubmit}>
                                <Grid container spacing={2} height="90%" display="flex" alignItems="center" justifyContent="center">
                                    <Grid item xs={12}>
                                        <TextField
                                            color="warning"
                                            inputProps={{ style: { color: 'white', borderRadius: "5px" } }}
                                            label="Email"
                                            id="email"
                                            name="email"
                                            variant="standard"
                                            type="email"
                                            value={email}
                                            onChange={handleEmail}
                                            fullWidth
                                            InputLabelProps={{
                                                style: { color: '#ed6c02', },
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            color="warning"
                                            inputProps={{ style: { color: 'white',   borderRadius: "5px" } }}
                                            label="Password"
                                            name="password"
                                            id="password"
                                            variant="standard"
                                            type="password"
                                            value={password}
                                            onChange={handlePassword}
                                            fullWidth
                                            InputLabelProps={{
                                                style: { color: '#ed6c02', },
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Button type="submit" variant="contained" color="warning" fullWidth>
                                            Login
                                        </Button>
                                    </Grid>
                                </Grid>

                            </form>
                        </Box>

                        <Grid mt={2} item xs={9} display={"flex"} justifyContent={"center"}>
                            <Link to={"/cadastro"} style={{ textAlign: "center", width: "100%", color: '#ed6c02' }}>
                                Cadastre-se
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};
export default Login;