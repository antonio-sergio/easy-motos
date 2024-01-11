import axios from "axios";

class UsuarioServico {
    logar(credencias){
        return axios.post(`http://localhost:3001/login`, {credencias})
    }
}

const usuarioServico = new UsuarioServico();
export default usuarioServico;