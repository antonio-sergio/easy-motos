import React from "react";
import {
    Route,
    Routes
} from 'react-router-dom';
import ProtectedRoute from "../services/auth/ProtectedRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Administrativo from "../pages/Administrativo";
import CardMoto from "../components/CardMoto";
import CadastroUsuario from "../components/CadastroUsuario";
import Modelos from "../pages/Modelos";
import ListaAlugueisByUsuario from "../components/listas/ListaAlugueisByUsuario";
import ListaUsuarios from "../components/listas/ListaUsuarios";

export default function RoutesApp() {
    return (
        <Routes >
            <Route path='/administrativo' element={<ProtectedRoute accessBy="admin"><Administrativo /></ProtectedRoute>} />
            <Route path='/usuarios' element={<ProtectedRoute accessBy="admin"><ListaUsuarios /></ProtectedRoute>} />
            <Route path='/' element={<ProtectedRoute accessBy="authenticated"><Home /></ProtectedRoute>} />
            <Route path='/meus_alugueis' element={<ProtectedRoute accessBy="authenticated"><ListaAlugueisByUsuario /></ProtectedRoute>} />
            <Route path='/motos' element={<ProtectedRoute accessBy="authenticated"><Modelos /></ProtectedRoute>} />
            <Route path='/cadastro' element={ <CadastroUsuario />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/moto/:id'  element={<ProtectedRoute accessBy="authenticated"><CardMoto /></ProtectedRoute>} />
        </Routes >
    )
}