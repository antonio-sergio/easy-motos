import axios from "axios";

class MotoServico {
    getModelos(){
        return axios.get(`http://localhost:3001/modelo`)
    }
    getAlugueis(){
        return axios.get(`http://localhost:3001/aluguel`)
    }
    getMotos(){
        return axios.get(`http://localhost:3001/moto`)
    }
    getMotosByModelo(id){
        return axios.get(`http://localhost:3001/moto/modelo/${id}`)
    }
    cadastrarModelo(dados){
        return axios.post(`http://localhost:3001/modelo`, dados)
    }
    cadastrarUsuario(dados){
        return axios.post(`http://localhost:3001/usuario`, dados)
    }
    cadastrarMoto(dados){
        return axios.post(`http://localhost:3001/moto`, dados)
    }
    editarModelo(dados){
        return axios.put(`http://localhost:3001/modelo/${dados.id}`, dados)

    }
    editarMoto(dados){
        return axios.put(`http://localhost:3001/moto/${dados.id}`, dados)
    }
    alugarMoto(dados){
        return axios.post(`http://localhost:3001/aluguel`, dados)
    }
    
}

const motoServico = new MotoServico();
export default motoServico;