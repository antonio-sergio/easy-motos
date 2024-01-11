import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { useState } from "react";
import CadastroModelo from "./CadastroModelo";
import CadastroMoto from "./CadastroMoto";

const Cadastrar = () => {
    const [selectedComponent, setSelectedComponet] = useState("moto");

    const buttons = [
        <Button color={selectedComponent === 'moto' ? 'warning' : 'inherit'} sx={{ width: 200 }} key="moto" onClick={() => setSelectedComponet('moto')}>Moto</Button>,
        <Button color={selectedComponent === 'modelo' ? 'warning' : 'inherit'} sx={{ width: 200 }} key="modelo" onClick={() => setSelectedComponet('modelo')}>modelo</Button>,
    ];

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'moto':
                return <CadastroMoto />
            case 'modelo':
                return <CadastroModelo />
        }
    }

    return <Box>
        <Typography fontSize={18} textAlign={"center"} color={"#ed6c02"}>
            Tela de Cadastros
        </Typography>
        <Box ml={2} width={400} sx={{ backgroundColor: "black" }} color={"white"}>
            <ButtonGroup
                orientation="horizontal"
                aria-label="opções de cadastros"
                variant="text"
            >
                {buttons}
            </ButtonGroup>
        </Box>
        <Box>
            {renderComponent()}
        </Box>
    </Box>
}

export default Cadastrar;