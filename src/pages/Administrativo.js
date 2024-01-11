import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import React, { useState } from "react";
import Cadastrar from "../components/Cadastrar";
import { Link } from "react-router-dom";
import ListaModelos from "../components/listas/ListaModelos";
import ListaMotos from "../components/listas/ListaMotos";
import ListaAlugueis from "../components/listas/ListaAlugueis";


const Administrativo = () => {
    const [selectedComponent, setSelectedComponet] = useState("cadastrar");

    const buttons = [
        <Button color={selectedComponent === 'cadastrar' ? 'warning' : 'inherit'} key="cadastrar" onClick={() => setSelectedComponet('cadastrar')}>Cadastrar</Button>,
        <Button color={selectedComponent === 'alugueis' ? 'warning' : 'inherit'} key="alugueis" onClick={() => setSelectedComponet('alugueis')}>Aluguéis</Button>,
        <Button color={selectedComponent === 'modelos' ? 'warning' : 'inherit'} key="three" onClick={() => setSelectedComponet('modelos')}>Modelos</Button>,
        <Button color={selectedComponent === 'motos' ? 'warning' : 'inherit'} key="three" onClick={() => setSelectedComponet('motos')}>Motos</Button>,
    ];

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'cadastrar':
                return <Cadastrar />
            case 'alugueis':
                return <ListaAlugueis />
            case 'modelos':
                return <ListaModelos />
            case 'motos':
                return <ListaMotos />
        }
    }

    return (
        <Box display={"flex"} height={"100vh"} flexDirection={"column"}>
            <Box height={50} sx={{ backgroundColor: "#BD4301" }} display={"flex"} alignItems={"center"}>
                <Link to={"/"}>
                    <Typography ml={2} fontSize={25} color={"white"}>
                        EasyMotos
                    </Typography>
                </Link>
            </Box>

            <Box display={"flex"} height={"100%"}>
                <Box width={200} sx={{ backgroundColor: "black" }} color={"white"} borderRight={"1px solid white"}>
                    <ButtonGroup
                        orientation="vertical"
                        aria-label="menu lateral"
                        variant="text"
                        sx={{ width: "100%" }}
                    >
                        {buttons}
                    </ButtonGroup>
                </Box>
                <Box sx={{ backgroundColor: "black" }} width={"100%"}>
                    {renderComponent()}
                </Box>
            </Box>

        </Box>
    );
};

export default Administrativo;
