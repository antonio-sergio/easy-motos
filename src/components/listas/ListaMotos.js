import { Box, Button, CardMedia, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import motoServico from "../../services/motos/motos-service";
import { Link } from "react-router-dom";
import { localizedTextsMap } from "../../utils/localizedTextMap";
import { DataGrid } from '@mui/x-data-grid';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { toast, ToastContainer } from 'react-toastify';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const ListaMotos = () => {
    const [motos, setMotos] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedMoto, setSelectedMoto] = useState(null);
    const [editado, setEditado] = useState(false);
    const [selectedModelo, setSelectedModelo] = useState(null);
    const [modelos, setModelos] = useState([]);



    useEffect(() => {
        motoServico.getMotos().then(response => {
            setMotos(response.data)
        }).catch(error => console.log(error))
    }, [editado]);

    useEffect(() => {
        motoServico.getModelos().then(response => {
            setModelos(response.data);
        }).catch(error => console.log(error))
    }, [])


    const handleShow = async (moto) => {
        setSelectedMoto(moto);
        setSelectedModelo(moto.modelo);
        setOpenModal(true);
    }

    const handleClose = () => {
        setOpenModal(false);
    }

    const handleSaveMoto = () => {
        selectedMoto.modelo_id = selectedModelo.id || selectedModelo;
        motoServico.editarMoto(selectedMoto).then(response => {
            if (response.status === 200) {
                console.log('editado com sucesso')
                setOpenModal(false);
                setEditado(!editado);
                toast.success('Moto editada com sucesso')
            }
        }).catch(error => {
            console.log(error);
            toast.error('Não foi possível editar a moto')
        });
    }

    const columns = [
        {
            field: 'editar', headerName: 'Infos', width: 100, editable: true, renderCell: (params) => (
                <Button
                    color='warning'
                    variant="outlined"
                    size="small"
                    onClick={() => handleShow(params.row)}
                >
                    <ModeEditIcon color='warning' sx={{ color: '#BD4301' }} />
                </Button>
            )
        },
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'nome', headerName: 'Nome Modelo', width: 150, editable: true, valueGetter: (params) => params.row.modelo.nome },
        { field: 'chassi', headerName: 'Chassi', width: 120, editable: true, valueGetter: (params) => params.row.chassi },
        { field: 'cor', headerName: 'Cor', width: 100, editable: true },
        {
            field: 'alugado', headerName: 'Alugado', width: 100, editable: true, renderCell: (params) => (
                <Typography>
                    {params.row.alugado ? <CheckBoxIcon color="success" /> : <CloseIcon color="error" />}
                </Typography>
            )
        }
    ];




    return <Box sx={{ backgroundColor: "black" }}>
        <ToastContainer />
        <Typography p={1} color={"white"}>
            LISTA DE MOTOS
        </Typography>
        <Box ml={1}>
            <DataGrid
                sx={{ color: '#fff' }}
                localeText={localizedTextsMap}
                rows={motos}
                columns={columns}
                pageSize={10}
                componentsProps={{
                    pagination: {
                        labelRowsPerPage: "Linhas por página",
                    }
                }}
                getRowId={(row) => row.id}
            />
        </Box>
        <Dialog open={openModal} onClose={() => handleClose()} fullWidth maxWidth="md"  >
            <DialogTitle fontWeight={800} textAlign="center" sx={{ backgroundColor: '#BD4301', color: 'white' }}>
                Dados da Moto
            </DialogTitle>
            <DialogContent sx={{ marginTop: 4 }} >
                <InputLabel color='warning'sx={{ width: '100%',fontSize: 12, color: 'grey' }}>Modelo</InputLabel>
                <Select
                    labelId="modelo"
                    color='warning'
                    label="Modelo"
                    size='small'
                    defaultValue={selectedModelo?.id || ''}
                    onChange={(e) => setSelectedModelo(e.target.value)}
                    sx={{ width: '100%', height: 30, color: "#ed6c02" }}
                    variant="standard"
                >
                    {modelos.map((value) => (
                        <MenuItem key={value.id} value={value.id}>
                            <Typography >{String(value.nome).toUpperCase()}</Typography>
                        </MenuItem>
                    ))}
                </Select>

                <InputLabel color='warning' sx={{ width: '100%',fontSize: 12, color: 'grey' }}>Alugado</InputLabel>
                <Select
                    labelId="alugado"
                    color='warning'
                    label="Alugado"
                    size='small'
                    defaultValue={selectedMoto?.alugado}
                    onChange={(e) => setSelectedMoto({ ...selectedMoto, alugado: e.target.value })}
                    sx={{ width: '100%', height: 30, color: "#ed6c02" }}
                    variant="standard"
                >
                    <MenuItem  value={true}>
                        <Typography >Sim</Typography>
                    </MenuItem>
                    <MenuItem  value={false}>
                        <Typography >Não</Typography>
                    </MenuItem>
                </Select>
                <TextField
                    label="Chassi"
                    defaultValue={selectedMoto?.chassi || ''}
                    onChange={(e) => setSelectedMoto({ ...selectedMoto, chassi: e.target.value })}
                    fullWidth
                    margin="normal"
                    color="warning"
                    variant="standard"

                />
                <TextField
                    label="Cor"
                    defaultValue={selectedMoto?.cor || ''}
                    onChange={(e) => setSelectedMoto({ ...selectedMoto, cor: e.target.value })}
                    fullWidth
                    margin="normal"
                    color="warning"
                    variant="standard"

                />



            </DialogContent>

            <DialogActions>
                <>
                    <Button variant="contained" color="success" onClick={handleSaveMoto}><SaveIcon sx={{ color: "white" }} /> Salvar</Button>
                    <Button variant='outlined' color="error" onClick={() => setOpenModal(false)}><CloseIcon color="error" />Fechar</Button>
                </>
            </DialogActions>
        </Dialog>
    </Box>
}

export default ListaMotos;