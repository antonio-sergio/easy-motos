import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../services/auth/AuthContext";

const Nav = () => {
  const { logout, user } = useContext(AuthContext);

    return <Box flex sx={{ display: "flex", justifyContent: "space-between", backgroundColor: "#BD4301" }}>
        <Box height={50} sx={{ backgroundColor: "#BD4301" }} display={"flex"} alignItems={"center"}>
            <Link to={"/"}>
                <Typography ml={2} fontSize={25} color={"white"}>
                    EasyMotos
                </Typography>
            </Link>
        </Box>
        <Box width={600} height={50} flex sx={{ display: "flex", justifyContent: "space-between", backgroundColor: "#BD4301" }}>
            <Button sx={{ width: 100, color: "white" }}><Link to={"/motos"}>Motos</Link></Button>
            {user?.acesso === 'admin' && <Button sx={{ width: 120, color: "white" }}><Link to={"/administrativo"}>Administrativo</Link> </Button>}
            {user?.acesso === 'cliente' && <Button sx={{ width: 140, color: "white" }}><Link to={"/meus_alugueis"}>Meus aluguéis</Link></Button>}

            <Button onClick={logout} sx={{ width: 120, color: "black" }}>Logout</Button>
        </Box>
    </Box>
}

export default Nav;