import { createContext, useState, useEffect } from "react";
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

  // useEffect(() => {
  //       if (!localStorage.getItem("dados")) {
  //         navigate("/login");
  //       }
  // }, [user, navigate]);

  const login = async (payload) => {
    localStorage.removeItem("dados");
    const apiResponse = await axios.post(
      `http://localhost:3001/login`,
      payload
    );

    console.log('respose login', apiResponse);
    if (apiResponse.status === 200) {
      localStorage.setItem(
        "dados",
        JSON.stringify(await apiResponse.data)
      );
      setUser(apiResponse.data);
      navigate("/");
    } else {
      console.log("else resonse api");
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
