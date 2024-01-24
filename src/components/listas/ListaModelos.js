import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import motoServico from "../../services/motos/motos-service";
import { localizedTextsMap } from "../../utils/localizedTextMap";
import { DataGrid } from '@mui/x-data-grid';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { toast, ToastContainer } from 'react-toastify';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const ListaModelos = () => {
    const [modelos, setModelos] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedModelo, setSelectedModelo] = useState(null);
    const [editado, setEditado] = useState(false);

    useEffect(() => {
        motoServico.getModelos().then(response => {
            setModelos(response.data)
        }).catch(error => console.log(error))
    }, [editado])

    const handleShow = async (modelo) => {
        setSelectedModelo(modelo);
        setOpenModal(true);
    }

    const handleClose = () => {
        setOpenModal(false);
    }

    const handleSaveModelo = () => {
        motoServico.editarModelo(selectedModelo).then(response => {
            if (response.status === 200) {
                setOpenModal(false);
                setEditado(!editado);
                toast.success('Modelo editado com sucesso')
            }
        }).catch(error => {
            console.log(error);
            toast.error('Não foi possível editar o modelo')
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
        { field: 'nome', headerName: 'Nome', width: 150, editable: true, valueGetter: (params) => params.row.nome },
        { field: 'marca', headerName: 'Marca', width: 120, editable: true, valueGetter: (params) => params.row.marca },
        { field: 'cilindrada', headerName: 'Cilindrada', width: 100, editable: true },
        { field: 'diaria', headerName: 'R$ Diária', width: 100, editable: true },
        {
            field: 'destaque', headerName: 'Destaque', width: 100, editable: true, renderCell: (params) => (
                <Typography>
                   {params.row.destaque ? <CheckBoxIcon color="success" /> : <CloseIcon color="error"/>} 
                </Typography>
            )
        },
        { field: 'imagem', headerName: 'URL IMAGEM', width: 300, editable: true, valueGetter: (params) => params.row.imagem },

    ];




    return <Box sx={{ backgroundColor: "black" }}>
        <ToastContainer />
        <Typography p={1} color={"white"}>
            LISTA DE MODELOS
        </Typography>
        <Box ml={1}>
            <DataGrid
                sx={{ color: '#fff' }}
                localeText={localizedTextsMap}
                rows={modelos}
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
                Dados do Modelo
            </DialogTitle>
            <DialogContent sx={{ marginTop: 4 }} >
                <TextField
                    label="Nome"
                    defaultValue={selectedModelo?.nome || ''}
                    onChange={(e) => setSelectedModelo({ ...selectedModelo, nome: e.target.value })}
                    fullWidth
                    margin="normal"
                    color="warning"
                />
                <TextField
                    label="Marca"
                    defaultValue={selectedModelo?.marca || ''}
                    onChange={(e) => setSelectedModelo({ ...selectedModelo, marca: e.target.value })}
                    fullWidth
                    margin="normal"
                    color="warning"
                />
                <TextField
                    label="Cilindrada"
                    type="number"
                    defaultValue={selectedModelo?.cilindrada || ''}
                    onChange={(e) => setSelectedModelo({ ...selectedModelo, cilindrada: e.target.value })}
                    fullWidth
                    margin="normal"
                    color="warning"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={selectedModelo?.destaque}
                            onChange={(e) => setSelectedModelo({ ...selectedModelo, destaque: e.target.checked })}
                            color="warning"
                        />
                    }
                    label="Destaque"
                />
                <TextField
                    label="Diária"
                    type="number"
                    defaultValue={selectedModelo?.diaria || ''}
                    onChange={(e) => setSelectedModelo({ ...selectedModelo, diaria: e.target.value })}
                    fullWidth
                    margin="normal"
                    color="warning"
                />
                <TextField
                    label="URL Imagem"
                    defaultValue={selectedModelo?.imagem || ''}
                    onChange={(e) => setSelectedModelo({ ...selectedModelo, imagem: e.target.value })}
                    fullWidth
                    margin="normal"
                    color="warning"
                />

            </DialogContent>

            <DialogActions>
                <>
                    <Button variant="contained" color="success" onClick={handleSaveModelo}><SaveIcon sx={{ color: "white" }} /> Salvar</Button>
                    <Button variant='outlined' color="error" onClick={() => setOpenModal(false)}><CloseIcon color="error" />Fechar</Button>
                </>
            </DialogActions>
        </Dialog>
    </Box>
}

export default ListaModelos;