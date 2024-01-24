import { Box, CardMedia, Typography } from "@mui/material"
import Nav from "../components/Nav";
import { useEffect, useState } from "react";
import motoServico from "../services/motos/motos-service";
import { Link } from "react-router-dom";

const Modelos = () => {
    const [modelos, setModelos] = useState([]);

    useEffect(() => {
        motoServico.getModelos().then(response => {
            setModelos(response.data)
        }).catch(error => console.log(error))
    }, [])


    return <Box height={"100vh"} sx={{ backgroundColor: "black" }}>
        <Nav />
        {modelos.length > 0 ? <Box display={"flex"} flexDirection={"column"} >
            <Typography ml={3} mt={2} color={"white"}>Modelos Disponíveis</Typography>
            <Box display={"flex"} flexWrap={"nowrap"}>
                {modelos.map((item, index) => {
                    return <Link to={`/moto/${item.id}`} key={index} sx={{ width: 250 }}>
                        <Box width={250} m={3} border={"1px solid #BD4301"}>
                            <Typography color={"white"} variant="h5" pl={3}>
                                {item.nome}
                            </Typography>
                            <CardMedia
                                component="img"
                                alt="Imagem 1"
                                height="200"
                                sx={{ objectFit: "contain" }}
                                image={item.imagem}
                            />
                            <Box display={"flex"} justifyContent={"space-around"} p={1} height={20} width={200}>
                                <Typography color={"white"}>
                                    {item.cilindrada}
                                </Typography>
                                <Box height={"100%"} width={2} sx={{ backgroundColor: "grey" }} />
                                <Typography color={"white"} >
                                    R$ {item.diaria} / dia
                                </Typography>
                            </Box>
                        </Box>
                    </Link>
                })}
            </Box>

        </Box> : <Typography color={"white"}>Por enquanto nada aqui ;/</Typography>}
    </Box>
}

export default Modelos;