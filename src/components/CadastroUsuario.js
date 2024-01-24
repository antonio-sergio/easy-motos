import { Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react";
import motoServico from "../services/motos/motos-service";
import { Link } from "react-router-dom";

const CadastroUsuario = () => {
    const [usuario, setUsuario] = useState({
        nome: '',
        cpf: '',
        email: '',
        nmr_cnh: '',
        telefone: '',
        senha: '',
    });

    const [cadastrado, setCadastrado] = useState(false);
    const [error, setError] = useState(false);
    const [msgError, setMsgError] = useState("");


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUsuario((prevUsuario) => ({
            ...prevUsuario,
            [name]: value,
        }));
    };

    const handleCadastrarClick = (e) => {
        e.preventDefault();
        setError(false);
        motoServico.cadastrarUsuario(usuario).then(response => {
            setCadastrado(true);
            clear()
        }).catch(error => {
            console.log(error);
            setError(true);
            setMsgError(error.response.data.message);
        })
    };


    const clear = () => {
        setUsuario({
            nome: '',
            cpf: '',
            email: '',
            nmr_cnh: '',
            telefone: '',
            senha: '',
        })
    }
    const Resultado = () => {
        return <Box display={"flex"} justifyContent={"center"} flexDirection={"column"}>
            <Typography color={"white"} mb={2}>
                Cadastrado com sucesso
            </Typography>
            <Link to={"/login"} style={{backgroundColor: "#e65100", padding: 5, borderRadius: 5, textAlign: "center"}}>
                Ir para o Login
            </Link>
        </Box>
    }


    const MsgError = () => {

        return <Box ml={5} mt={20}>
            <Typography color={"red"}>
                {msgError}
            </Typography>

        </Box>
    }


    return <Box height={"100vh"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} sx={{ backgroundColor: "black" }}>
        {cadastrado === true ? <Resultado /> : <Box width={400} height={400} ml={5} display={"flex"} flexDirection={"column"} justifyContent={"space-between"} alignItems={"center"} sx={{ backgroundColor: "black" }} >
            <form onSubmit={handleCadastrarClick} style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: 'center' }}>
                <TextField
                    label="Nome"
                    name="nome"
                    value={usuario.nome}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="standard"
                    sx={{ width: 400 }}
                    color="warning"
                    InputLabelProps={{
                        style: { color: '#ed6c02' },
                    }}
                    required

                />
                <TextField
                    label="CPF"
                    name="cpf"
                    value={usuario.cpf}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="standard"
                    sx={{ width: 400, backgroundColor: "black" }}
                    color="warning"
                    InputLabelProps={{
                        style: { color: '#ed6c02', },
                    }}
                    required
                />
                <TextField
                    label="Email"
                    name="email"
                    value={usuario.email}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="standard"
                    sx={{ width: 400 }}
                    color="warning"
                    InputLabelProps={{
                        style: { color: '#ed6c02' },
                    }}
                    required

                />
                <TextField
                    label="Nº CNH"
                    type="number"
                    name="nmr_cnh"
                    value={usuario.nmr_cnh}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="standard"
                    sx={{ width: 400 }}
                    color="warning"
                    InputLabelProps={{
                        style: { color: '#ed6c02' },
                    }}
                    required

                />

                <TextField
                    label="Telefone"
                    name="telefone"
                    type="number"
                    value={usuario.telefone}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="standard"
                    sx={{ width: 400 }}
                    color="warning"
                    InputLabelProps={{
                        style: { color: '#ed6c02' },
                    }}
                    required

                />

                <TextField
                    label="Senha"
                    name="senha"
                    type="password"
                    value={usuario.senha}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="standard"
                    sx={{ width: 400 }}
                    color="warning"
                    InputLabelProps={{
                        style: { color: '#ed6c02' },
                    }}
                    required

                />
                <Button
                    variant="contained"
                    color="warning"
                    sx={{ width: 200, my: 2 }}
                    type="submit"
                >
                    Criar Conta
                </Button>
            </form>
            <Link to={"/login"}>
                <Button variant="outlined" color="warning">
                    <Typography margin={"3px solid white"} textAlign={"center"} color={"#ed6c02"} mt={1}>Ir p/ login</Typography>
                </Button>
            </Link>

        </Box>}
        {error && <MsgError />}
    </Box>
}

export default CadastroUsuario;