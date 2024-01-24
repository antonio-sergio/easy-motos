import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  
  const [user, setUser] = useState(() => {
    if (localStorage.getItem("dados")) {
      let dadosusuario = JSON.parse(localStorage.getItem("dados"));
      return dadosusuario;
    }
    return null;
  });


  const login = async (payload) => {
    localStorage.removeItem("dados");
    const apiResponse = await axios.post(
      `http://localhost:3001/login`,
      payload
    );

    if (apiResponse.status === 200) {
      localStorage.setItem(
        "dados",
        JSON.stringify(await apiResponse.data)
      );
      setUser(apiResponse.data);
      navigate("/");
    } else {
      return null;
    }
  };

  const logout = async () => {
    localStorage.removeItem("dados");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
