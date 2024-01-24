import axios from "axios";

class MotoServico {
    getModelos() {
        return axios.get(`http://localhost:3001/modelo`)
    }
    getAlugueis() {
        return axios.get(`http://localhost:3001/aluguel`)
    }
    getAlugueisByUsuario(id) {
        return axios.get(`http://localhost:3001/aluguel/usuario/${id}`)
    }
    getMotos() {
        return axios.get(`http://localhost:3001/moto`)
    }
    getMotosByModelo(id) {
        return axios.get(`http://localhost:3001/moto/modelo/${id}`)
    }
    getMotosDisponivelByModelo(dados) {
        return axios.get(`http://localhost:3001/moto/disponiveis?data_retirada=${dados.data_retirada}&data_devolucao=${dados.data_devolucao}&modelo_id=${dados.modelo_id}`)
    }
    cadastrarModelo(dados) {
        return axios.post(`http://localhost:3001/modelo`, dados)
    }
    cadastrarUsuario(dados) {
        return axios.post(`http://localhost:3001/usuario`, dados)
    }
    cadastrarMoto(dados) {
        return axios.post(`http://localhost:3001/moto`, dados)
    }
    editarModelo(dados) {
        return axios.put(`http://localhost:3001/modelo/${dados.id}`, dados)
    }
    editarMoto(dados) {
        return axios.put(`http://localhost:3001/moto/${dados.id}`, dados)
    }
    editarAluguel(dados) {
        return axios.put(`http://localhost:3001/aluguel/${dados.id}`, dados)
    }
    alugarMoto(dados) {
        return axios.post(`http://localhost:3001/aluguel`, dados)
    }

}

const motoServico = new MotoServico();
export default motoServico;