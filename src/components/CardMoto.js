import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import motoServico from "../services/motos/motos-service";
import Nav from "./Nav";
import moment from 'moment/moment';
import DatePicker from "react-datepicker";
import pt from 'date-fns/locale/pt-BR';
import AuthContext from "../services/auth/AuthContext";
import { ToastContainer, toast } from "react-toastify";
const { Box, Typography, CardMedia, Button } = require("@mui/material")

const CardMoto = () => {
    const { id } = useParams();
    const [motos, setMotos] = useState([]);
    const [selectMoto, setSelectedMoto] = useState(null);

    useEffect(() => {
        motoServico.getMotosByModelo(id).then(response => {
            setMotos(response.data)
        }).catch(error => console.log(error))
    }, [id]);

    const getConjunto = () => {
        const conjuntosPorCor = {};
        motos.forEach(objeto => {
            const { cor } = objeto;

            if (!conjuntosPorCor[cor]) {
                conjuntosPorCor[cor] = [];
            }

            conjuntosPorCor[cor].push(objeto);
        });
        return conjuntosPorCor
    }
    getConjunto()

    const motosUnicasPorCor = Array.from(
        new Set(motos.map((moto) => moto.cor))
    ).map((cor) => motos.find((moto) => moto.cor === cor ));

    const CardAluguel = ({ moto }) => {
        const { user } = useContext(AuthContext);
        const data = moment();
        const [startDate, setStartDate] = useState(new Date());
        const [endDate, setEndDate] = useState(new Date());
        const [selectedDate, setSelectedDate] = useState(data.format("YYYY-MM-DD"));
        const [selectedDateEnd, setSelectedDateEnd] = useState(data.format("YYYY-MM-DD"));
        const [diferenca, setDiferenca] = useState(moment(selectedDateEnd).diff(moment(selectedDate), 'days'));
        const [alugado, setAlugado] = useState(false);
        const [motosDisponiveis, setMotoDisponiveis] = useState([]);

        const verificar = () => {
            const aux = {
                modelo_id: id,
                data_retirada: selectedDate,
                data_devolucao: selectedDateEnd
            }
            if (selectedDate === selectedDateEnd) {
                toast.warning('Por favor selecione datas com diferença de pelo menos 1 dia');

            } else {
                motoServico.getMotosDisponivelByModelo(aux).then(response => {
                    if (response.status === 200) {
                        if(response.data.motos.length > 0){
                            toast.success('Motos disponvéis');
                            setMotoDisponiveis(response.data.motos)
                        }else{
                            toast.warning('Lamentamos, mas no momento não temos motos do modelo escolhido disponíveis para as datas escolhidas')
                        }
                    }
                }).catch(error => {
                    console.log(error);
                    toast.error(error.response.data.message)
                })
            }
        }
        const alugar = () => {
            const aux = {
                "moto_id": motosDisponiveis[0]?.id,
                "usuario_id": user?.id,
                "data_retirada": selectedDate,
                "data_devolucao": selectedDateEnd
            }
            motoServico.alugarMoto(aux).then(response => {
                if (response.status === 201) {
                    toast.success('Aluguel registrado com sucesso');
                    setMotoDisponiveis([]);
                    setAlugado(true);
                }
            }).catch(error => {
                console.log(error);
                toast.error(error.response.data.message)
            })
        }

        const handleDateChange = (date) => {
            if (date) {
                const formattedDate = moment(date).format("YYYY-MM-DD");
                setStartDate(date);
                setSelectedDate(formattedDate);
                setDiferenca(() => moment(selectedDateEnd).diff(moment(formattedDate), 'days'));
            }
        };

        const handleDateendChange = (date) => {
            if (date) {
                const formattedDate = moment(date).format("YYYY-MM-DD");
                setEndDate(date);
                setSelectedDateEnd(formattedDate);
                setDiferenca(() => moment(formattedDate).diff(moment(selectedDate), 'days'));
            }
        };


        return <Box border={"1px solid #fff"} mt={2} p={2} display={"flex"} alignItems={"flex-start"} justifyContent={"space-between"}>
            <ToastContainer />
            <Box width={400}>
                <Box m={3} borderRadius={2} height={400} width={300} sx={{ backgroundColor: "#1e293b" }}>
                    <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} sx={{ width: 300, borderRadius: 0, padding: 1 }}>
                        <Typography color={"white"} variant="h5" pl={1}>
                            {moto?.modelo?.nome}
                        </Typography>
                        <CardMedia
                            component="img"
                            alt="Imagem 1"
                            height="250"
                            sx={{ objectFit: "contain" }}
                            image={moto?.modelo?.imagem}
                        />
                        <Typography mt={1} color={"white"}>
                            {moto?.cor}
                        </Typography>
                        <Box display={"flex"} justifyContent={"space-around"} p={1} height={20}>
                            <Typography mr={2} color={"white"}>
                                {moto?.modelo?.cilindrada}
                            </Typography>
                            <Box height={"100%"} width={2} sx={{ backgroundColor: "grey" }} />
                            <Typography ml={2} color={"white"} >
                                R$ {moto?.modelo?.diaria} / dia
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box width={"70%"} display={"flex"} flexDirection={"column"}>
                <Box ml={3} mt={2} display={"flex"} >
                    <Box >
                        <Typography color={"white"}>Data Retirada</Typography>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => handleDateChange(date)}
                            locale={pt}
                            placeholderText="Selecione uma data"
                            dateFormat="P"
                        />

                    </Box>
                    <Box ml={2} >
                        <Typography color={"white"}>Data Devolução</Typography>

                        <DatePicker
                            selected={endDate}
                            onChange={(date) => handleDateendChange(date)}
                            locale={pt}
                            placeholderText="Selecione uma data"
                            dateFormat="P"
                        />

                    </Box>
                </Box>
                <Box ml={3} my={2} display={"flex"} alignItems={"center"}>
                    <Typography fontSize={22} color={"white"}>Total(R$): </Typography>
                    <Typography ml={1} fontSize={22} color={"#ed6c02"}>{Number(diferenca * moto?.modelo?.diaria).toFixed(2) > 0 ? Number(diferenca * moto?.modelo?.diaria).toFixed(2) : 0}</Typography>
                </Box>
                <Box ml={3}>
                    <Button disabled={alugado} variant="contained" color="warning" onClick={() => verificar()}>Verificar Disponibilidade</Button>
                    <Button variant="outlined" color="warning" sx={{ ml: 2 }} onClick={() => setSelectedMoto(null)}>Voltar</Button>
                </Box>
                {motosDisponiveis.length > 0 && <Box ml={3} mt={2}>
                    <Box>
                        <Typography color={"white"}>{motosDisponiveis[0]?.modelo?.nome}</Typography>
                        <Typography color={"white"}>{motosDisponiveis[0]?.chassi}</Typography>
                        <Typography color={"white"}>{motosDisponiveis[0]?.cor}</Typography>
                    </Box>
                    <Button onClick={() => alugar()} sx={{ mt: 2 }} variant="outlined" color="success">Confirmar</Button>
                </Box>}
            </Box>

        </Box>
    }

    return <Box height={"100vh"} sx={{ backgroundColor: "black" }}>
        <Nav />
        <Box ml={3} mt={2}>
            <Link to={"/motos"}>Clique aqui para conhecer outros modelos</Link>
        </Box>
        {!selectMoto &&
            motos.length > 0 && <Box display={"flex"} flexWrap={"wrap"}> {
                motosUnicasPorCor.map(item => {
                    if (item !== undefined) {
                        return <Box key={item?.chassi || 1} m={3} borderRadius={2} height={400} width={300} sx={{ backgroundColor: "#1e293b" }}>
                            <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} sx={{ width: 300, borderRadius: 0, padding: 1 }}>
                                <Typography color={"white"} variant="h5" pl={1}>
                                    {item?.modelo?.nome}
                                </Typography>
                                <CardMedia
                                    component="img"
                                    alt="Imagem 1"
                                    height="250"
                                    sx={{ objectFit: "contain" }}
                                    image={item?.modelo?.imagem}
                                />
                                <Button onClick={() => setSelectedMoto(item)} color="warning" variant="contained">alugar</Button>
                                <Typography mt={1} color={"white"}>
                                    {item?.cor}
                                </Typography>
                                <Box display={"flex"} justifyContent={"space-around"} p={1} height={20}>
                                    <Typography mr={2} color={"white"}>
                                        {item?.modelo?.cilindrada}
                                    </Typography>
                                    <Box height={"100%"} width={2} sx={{ backgroundColor: "grey" }} />
                                    <Typography ml={2} color={"white"} >
                                        R$ {item?.modelo?.diaria} / dia
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                    }else{
                        return ""
                    }
                })
            }</Box>
        }
        {motos.length === 0 && <Typography color={"white"}>Por enquanto nada aqui</Typography>}
        {selectMoto && <CardAluguel moto={selectMoto} />}
    </Box>
}

export default CardMoto;