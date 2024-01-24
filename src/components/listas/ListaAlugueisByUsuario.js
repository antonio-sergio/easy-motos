import { Box, Button, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, Typography } from "@mui/material";
import { localizedTextsMap } from "../../utils/localizedTextMap";
import { DataGrid } from '@mui/x-data-grid';
import motoServico from "../../services/motos/motos-service";
import { useContext, useEffect, useState } from "react";
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import CloseIcon from '@mui/icons-material/Close';
import moment from "moment";
import AuthContext from "../../services/auth/AuthContext";
import Nav from "../Nav";


const ListaAlugueisByUsuario = () => {
    const { user } = useContext(AuthContext);
    const [alugueis, setAlugueis] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedAluguel, setSelectedAluguel] = useState(null);


    useEffect(() => {
        motoServico.getAlugueisByUsuario(user?.id).then(response => {
            setAlugueis(response.data)
        }).catch(error => console.log(error))
    }, [user.id]);

    const handleShow = async (aluguel) => {
        setSelectedAluguel(aluguel);
        setOpenModal(true);
    }

    const handleClose = () => {
        setOpenModal(false);
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
                    <PlagiarismIcon color='warning' sx={{ color: '#BD4301' }} />
                </Button>
            )
        },
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'nome', headerName: 'Nome Usuario', width: 150, editable: true, valueGetter: (params) => params.row.usuario.nome },
        { field: 'modelo', headerName: 'Modelo Moto', width: 150, editable: true, valueGetter: (params) => params.row.modelo.nome },
        { field: 'valor', headerName: 'Valor(R$)', width: 100, editable: true, valueGetter: (params) => params.row.valor },
        { field: 'devolvido', headerName: 'Devolvido', width: 100, editable: true, valueGetter: (params) => params.row.devolvido === true ? "Sim" : "Não" },
        { field: 'data_retirada', headerName: 'DT Retirada', width: 150, editable: true, valueGetter: (params) => formatData(params.row.data_retirada) },
        { field: 'data_devolucao', headerName: 'DT Devolução', width: 150, editable: true, valueGetter: (params) => formatData(params.row.data_devolucao) },
    ];

    const formatData = (data) => {
        // Verifica se a data fornecida é válida
        if (!moment(data).isValid()) {
            return "Data inválida";
        }

        // Formata a data no formato desejado
        return moment(data).format('DD-MM-YYYY');
    }



    return <Box bgcolor={"black"} height={"100vh"}>
        <Nav />
        <Box ml={4} width={900} height={"80vh"} mt={5}>
            <Typography p={1} color={"white"}>
                MEUS ALUGUÉIS
            </Typography>
            <DataGrid
                sx={{ color: '#fff' }}
                localeText={localizedTextsMap}
                rows={alugueis}
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
                Dados do aluguel
            </DialogTitle>
            <DialogContent sx={{ marginTop: 4 }} >

                <Box width={"100%"} display={"flex"}>
                    <Box width={"50%"}>
                        <Box display={"flex"}>
                            <Typography ml={3} color={"#BD4301"}>
                                Cliente:
                            </Typography>
                            <Typography fontWeight={700} ml={3} color={"white"}>
                                {selectedAluguel?.usuario?.nome}
                            </Typography>
                        </Box>
                        <Box width={250} m={3} border={"1px solid #BD4301"}>
                            <Typography color={"white"} variant="h5" pl={3}>
                                {selectedAluguel?.modelo?.nome}
                            </Typography>
                            <CardMedia
                                component="img"
                                alt="Imagem 1"
                                height="200"
                                sx={{ objectFit: "contain" }}
                                image={selectedAluguel?.modelo?.imagem}
                            />
                            <Box display={"flex"} justifyContent={"space-around"} p={1} height={20} width={200}>
                                <Typography color={"white"}>
                                    {selectedAluguel?.modelo?.cilindrada} CC
                                </Typography>
                                <Box height={"100%"} width={2} sx={{ backgroundColor: "grey" }} />
                                <Typography color={"white"}>
                                    {selectedAluguel?.modelo?.marca}
                                </Typography>
                                <Box height={"100%"} width={2} sx={{ backgroundColor: "grey" }} />
                                <Typography color={"white"}>
                                    {selectedAluguel?.moto?.cor}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box width={"50%"} display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
                        <List>
                            <ListItem key={1}><Typography color={"#BD4301"}>Telefone: </Typography><Typography ml={2} color={"white"}>{selectedAluguel?.usuario?.telefone}</Typography></ListItem>
                            <ListItem key={2}><Typography color={"#BD4301"}>E-mail: </Typography><Typography ml={2} color={"white"}>{selectedAluguel?.usuario?.email}</Typography></ListItem>
                            <ListItem key={3}><Typography color={"#BD4301"}>DT Retirada: </Typography><Typography ml={2} color={"white"}>{formatData(selectedAluguel?.data_retirada)}</Typography></ListItem>
                            <ListItem key={4}><Typography color={"#BD4301"}>DT Devolução: </Typography><Typography ml={2} color={"white"}>{formatData(selectedAluguel?.data_devolucao)}</Typography></ListItem>
                            <ListItem key={5}><Typography color={"#BD4301"}>Devolvido: </Typography><Typography ml={2} color={"white"}>{selectedAluguel?.devolvido === true ? "Sim" : "Não"}</Typography></ListItem>
                        </List>
                        <Box display={"flex"} height={20} mr={2} justifyContent={"flex-end"} alignItems={"flex-end"}>
                            <Typography color={"#BD4301"} fontWeight={700}>
                                Total(R$):
                            </Typography>
                            <Typography fontSize={20} ml={2} color={"white"}>
                                {selectedAluguel?.valor}
                            </Typography>

                        </Box>
                    </Box>
                </Box>

            </DialogContent>

            <DialogActions>
                <>
                    <Button variant='outlined' color="error" onClick={() => setOpenModal(false)}><CloseIcon color="error" />Fechar</Button>
                </>
            </DialogActions>
        </Dialog>
    </Box>
}

export default ListaAlugueisByUsuario;