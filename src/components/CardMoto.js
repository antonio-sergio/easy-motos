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
    const { user } = useContext(AuthContext);
    console.log('usssssssssss', user)
    const { id } = useParams();
    const [motos, setMotos] = useState([]);
    const [selectMoto, setSelectedMoto] = useState(null);

    useEffect(() => {
        motoServico.getMotosByModelo(id).then(response => {
            setMotos(response.data)
        }).catch(error => console.log(error))
    }, []);

    const getConjunto = () => {
        const conjuntosPorCor = {};
        motos.forEach(objeto => {
            const { cor } = objeto;

            // Se a cor ainda não estiver presente no objeto, cria um array vazio para ela
            if (!conjuntosPorCor[cor]) {
                conjuntosPorCor[cor] = [];
            }

            // Adiciona o objeto ao array correspondente à sua cor
            conjuntosPorCor[cor].push(objeto);
        });
        console.log('conjuntosPorCor', conjuntosPorCor)
        return conjuntosPorCor
    }
    getConjunto()

    const motosUnicasPorCor = Array.from(
        new Set(motos.map((moto) => moto.cor))
    ).map((cor) => motos.find((moto) => moto.cor === cor && moto.alugado === false));

    const CardAluguel = ({ moto }) => {
        const data = moment();
        const [startDate, setStartDate] = useState(new Date());
        const [endDate, setEndDate] = useState(new Date());
        const [selectedDate, setSelectedDate] = useState(data.format("YYYY-MM-DD"));
        const [selectedDateEnd, setSelectedDateEnd] = useState(data.format("YYYY-MM-DD"));
        console.log('moto', moto)
        const alugar = () => {
            console.log('selectedDate', selectedDate, selectedDateEnd)
            const aux = {
                "moto_id": moto?.id,
                "usuario_id": user?.id,
                "data_retirada": selectedDate,
                "data_devolucao": selectedDateEnd
            }
            motoServico.alugarMoto(aux).then(response => {
                if(response.status === 201){
                    toast.success('Aluguel registrado com sucesso')
                }
            }).catch(error => {
                console.log(error);
                toast.error(error.response.data.message)
            })
        }

        const handleDateChange = (date) => {
            if (date) {
                const formattedDate = moment(date).format("YYYY-MM-DD");
                console.log("date", formattedDate)
                setStartDate(date);
                setSelectedDate(formattedDate);
            }
        };
        const handleDateendChange = (date) => {
            if (date) {
                const formattedDate = moment(date).format("YYYY-MM-DD");
                setEndDate(date);
                setSelectedDateEnd(formattedDate);
            }
        };
        return <Box>
            <ToastContainer />
            <Button onClick={() => setSelectedMoto(null)}>Voltar</Button>
            <Typography color={"white"}>Card alguuel</Typography>
            <Box ml={1}  >
                <DatePicker
                    selected={startDate}
                    onChange={(date) => handleDateChange(date)}
                    locale={pt}
                    placeholderText="Selecione uma data"
                    dateFormat="P"
                />

            </Box>
            <Box ml={2}  >
                <DatePicker
                    selected={endDate}
                    onChange={(date) => handleDateendChange(date)}
                    locale={pt}
                    placeholderText="Selecione uma data"
                    dateFormat="P"
                />

            </Box>
            <Button onClick={() => alugar()}>Alugar</Button>

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
                    console.log('item', item)
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

                    }
                })
            }</Box>
        }
        {selectMoto && <CardAluguel moto={selectMoto} />}
    </Box>
}

export default CardMoto;