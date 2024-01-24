import { Box, Button, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import motoServico from "../services/motos/motos-service";

const CadastroMoto = () => {
    const [moto, setMoto] = useState({
        modelo_id: '',
        chassi: '',
        cor: '',
        placa: ''
    });

    const [cadastrado, setCadastrado] = useState(false);
    const [error, setError] = useState(false);
    const [selectedModelo, setSelectedModelo] = useState(null);
    const [modelos, setModelos] = useState([]);

    useEffect(() => {
        motoServico.getModelos().then(response => {
            setModelos(response.data);
        }).catch(error => console.log(error))
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMoto((prevMoto) => ({
            ...prevMoto,
            [name]: value,
        }));
    };

    const handleCadastrarClick = (e) => {
        e.preventDefault();
        setError(false);
        moto.modelo_id = selectedModelo.id;
        motoServico.cadastrarMoto(moto).then(() => {
            setCadastrado(true);
            clear()
        }).catch(error => {
            console.log(error);
            setError(true)
        })
    };


    const clear = () => {
        setMoto({
            modelo_id: '',
            chassi: '',
            cor: '',
            placa: ''
        })
    }
    const Resultado = () => {
        return <Box ml={2}>
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
                Falha ao cadastrar moto
            </Typography>

        </Box>
    }


    return <Box>
        {cadastrado === true ? <Resultado /> : <Box ml={5} mt={4} width={400} display={"flex"} flexDirection={"column"} alignItems={"center"} sx={{ backgroundColor: "black" }} >
            <form onSubmit={handleCadastrarClick}>
                <InputLabel color='warning' sx={{ width: '100%', color: '#ed6c02' }}>Modelo</InputLabel>
                <Select
                    labelId="modelo"
                    color='warning'
                    label="Modelo"
                    size='small'
                    value={selectedModelo}
                    onChange={(e) => setSelectedModelo(e.target.value)}
                    sx={{ width: '100%', height: 25 }}
                    style={{ color: '#ed6c02' }}
                    variant="standard"
                >
                    {modelos.map((value) => (
                        <MenuItem key={value.id_modelo} value={value}>
                            <Typography >{String(value.nome).toUpperCase()}</Typography>
                        </MenuItem>
                    ))}
                </Select>

                <TextField
                    label="Placa"
                    name="placa"
                    value={moto.placa}
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
                    label="Chassi"
                    name="chassi"
                    value={moto.chassi}
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
                    label="Cor"
                    name="cor"
                    value={moto.cor}
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

                <Button
                    variant="contained"
                    color="warning"
                    sx={{ width: 200, my: 2 }}
                    type="submit"
                >
                    Cadastrar Moto
                </Button>
            </form>

        </Box>
        }
        {error && <MsgError />}
    </Box >
}

export default CadastroMoto;