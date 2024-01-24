import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { localizedTextsMap } from "../../utils/localizedTextMap";
import { DataGrid } from '@mui/x-data-grid';
import usuarioServico from "../../services/user/user-service";

const ListaUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        usuarioServico.listarTodos().then(response => {
            setUsuarios(response.data)
        }).catch(error => console.log(error))
    }, [])


    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'nome', headerName: 'Nome', width: 150, editable: true },
        { field: 'cpf', headerName: 'CPF', width: 120, editable: true },
        { field: 'email', headerName: 'E-mail', width: 250, editable: true },
        { field: 'nmr_cnh', headerName: 'Nº CNH', width: 100, editable: true },
        { field: 'telefone', headerName: 'Telefone', width: 120, editable: true },
        { field: 'acesso', headerName: 'Acesso', width: 100, editable: true }
    ];

    return <Box height={"80vh"} sx={{ backgroundColor: "black" }}>
        <Typography p={1} color={"white"}>
            LISTA DE Usuários
        </Typography>
        <Box ml={1} height={"60vh"}>
            <DataGrid
                sx={{ color: '#fff' }}
                localeText={localizedTextsMap}
                rows={usuarios}
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
    </Box>
}

export default ListaUsuarios;