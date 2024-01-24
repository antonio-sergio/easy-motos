
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import Carrossel from "../components/Carrossel";
import Nav from "../components/Nav";

const Home = () => {

  return (
    <Box width={"100%"} height={"99vh"} sx={{ overflow: "hidden", backgroundColor: "black" }}>
      <Nav />
      <Box height={400} width={"100%"} display={"flex"} justifyContent={"center"} >
        <Carrossel />
      </Box>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8} md={4} >
            <Card >
              <CardContent sx={{minHeight: 145, backgroundColor: "black", border: "1px solid #BD4301", borderRadius: "5px"}} >
                <Typography variant="h5" component="div" color={"#BD4301"}>
                  Economia de verdade
                </Typography>
                <Typography variant="body2" color="white">
                  Motos econômicas que fazem até 60km/litro, e sem impostos anuais. De EasyMotos você não paga IPVA e licenciamento.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={8} md={4}>
            <Card>
              <CardContent sx={{minHeight: 145, backgroundColor: "black", border: "1px solid #BD4301", borderRadius: "5px"}}>
                <Typography variant="h5" component="div" color={"#BD4301"}>
                  Proteção contra terceiros e roubo
                </Typography>
                <Typography variant="body2" color="white">
                  Suporte 24h, com a Mottu você não está sozinho. Furou pneu, se envolveu em um acidente? É só chamar que o nosso time vai até você para te ajudar.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={8} md={4}>
            <Card>
              <CardContent sx={{minHeight: 145, backgroundColor: "black", border: "1px solid #BD4301", borderRadius: "5px"}}>
                <Typography variant="h5" component="div" color={"#BD4301"}>
                  Manutenção preventiva
                </Typography>
                <Typography variant="body2" color="white">
                  A manutenção preventiva é toda por nossa conta, sem surpresas!
                </Typography>
              </CardContent>
            </Card>
          </Grid>

        </Grid>
      </Box>
    </Box>
  );
}

export default Home;
