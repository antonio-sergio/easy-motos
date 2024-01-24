import { Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react";
import motoServico from "../services/motos/motos-service";

const CadastroModelo = () => {
    const [modelo, setModelo] = useState({
        nome: '',
        marca: '',
        imagem: '',
        cilindrada: '',
        diaria: '',
    });

    const [cadastrado, setCadastrado] = useState(false);
    const [error, setError] = useState(false);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setModelo((prevModelo) => ({
            ...prevModelo,
            [name]: value,
        }));
    };

    const handleCadastrarClick = (e) => {
        e.preventDefault();
        setError(false);
        motoServico.cadastrarModelo(modelo).then(response => {
            setCadastrado(true);
            clear()
        }).catch(error => {
            console.log(error);
            setError(true)
        })
    };


    const clear = () => {
        setModelo({
            nome: '',
            marca: '',
            imagem: '',
            cilindrada: '',
            diaria: '',
        })
    }
    const Resultado = () => {
        return <Box width={400} mt={2} display={"flex"} justifyContent={"center"} flexDirection={"column"} alignItems={"center"}>
            <Typography color={"white"}>
                Cadastrado com sucesso
            </Typography>
            <Button onClick={() => setCadastrado(false)}>
                novo cadastro
            </Button>
        </Box>
    }


    const MsgError = () => {
        return <Box ml={5}>
            <Typography color={"red"}>
                Falha ao cadastrar modelo
            </Typography>
            
        </Box>
    }


    return <Box>
        {cadastrado === true ? <Resultado /> : <Box ml={5}  width={400} display={"flex"} flexDirection={"column"} alignItems={"center"} sx={{ backgroundColor: "black" }} >
            <form onSubmit={handleCadastrarClick}>
                <TextField
                    label="Nome"
                    name="nome"
                    value={modelo.nome}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="standard"
                    sx={{ width: 350 }}
                    color="warning"
                    InputLabelProps={{
                        style: { color: '#ed6c02' },
                    }}
                    required

                />
                <TextField
                    label="Marca"
                    name="marca"
                    value={modelo.marca}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="standard"
                    sx={{ width: 350 }}
                    color="warning"
                    InputLabelProps={{
                        style: { color: '#ed6c02' },
                    }}
                    required
                />
                <TextField
                    label="Imagem URL"
                    name="imagem"
                    value={modelo.imagem}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="standard"
                    sx={{ width: 350 }}
                    color="warning"
                    InputLabelProps={{
                        style: { color: '#ed6c02' },
                    }}
                    required

                />
                <TextField
                    label="Cilindrada"
                    type="number"
                    name="cilindrada"
                    value={modelo.cilindrada}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="standard"
                    sx={{ width: 350 }}
                    color="warning"
                    InputLabelProps={{
                        style: { color: '#ed6c02' },
                    }}
                    required

                />

                <TextField
                    label="Diária"
                    name="diaria"
                    type="number"
                    value={modelo.diaria}
                    onChange={(e) => handleInputChange({ target: { name: 'diaria', value: e.target.value } })}
                    margin="normal"
                    variant="standard"
                    sx={{ width: 350 }}
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
                    Cadastrar Modelo
                </Button>
            </form>

        </Box>}
        {error && <MsgError />}
    </Box>
}

export default CadastroModelo;