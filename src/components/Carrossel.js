import { Box, Card, CardMedia, Divider, Typography } from "@mui/material";
import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import motoServico from "../services/motos/motos-service";
import { Link } from "react-router-dom";

const Carrossel = () => {
    const [modelos, setModelos] = useState([]);
    useEffect(() => {
        motoServico.getModelos().then(response => {
            const modelosDestaque = response.data.filter(modelo => modelo.destaque === true);
            setModelos(modelosDestaque)
        }).catch(error => console.log(error))
    }, [])

    const settings = {
        infinite: false,
        dots: true,
        speed: 500,
        centerPadding: 100,
        padding: 100,
        responsive: [
            {
                breakpoint: 2000,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return <>
        {modelos.length > 0 ? <Box width={"100%"}>
            <Typography variant="h2"> Motos </Typography>
            <Slider {...settings}>

                {modelos.map((item, index) => {
                    return <Link to={`/moto/${item.id}`} key={index} sx={{ width: 200, borderRadius: 0, padding: 1 }}>
                        <Typography color={"white"} variant="h5" pl={7}>
                            {item.nome}
                        </Typography>
                        <CardMedia
                            component="img"
                            alt="Imagem 1"
                            height="200"
                            sx={{ objectFit: "contain" }}
                            image={item.imagem}
                        />
                        <Box display={"flex"} justifyContent={"space-around"} p={1} height={20}>
                            <Typography color={"white"}>
                                {item.cilindrada}
                            </Typography>
                            <Box height={"100%"} width={2} sx={{ backgroundColor: "grey" }} />
                            <Typography color={"white"} >
                                R$ {item.diaria} / dia
                            </Typography>
                        </Box>
                    </Link>
                })}


            </Slider>
        </Box> : "Carregando dados"}

    </>;


}

export default Carrossel;
