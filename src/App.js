import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Shell from './components/layout/Shell';
import Empresas from './pages/Empresas/Empresas';

// Páginas (vamos criar aos poucos)
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';

// Rota protegida — redireciona para login se não tiver token
function RotaProtegida({ children }) {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" />;
    }
    return <Shell>{children}</Shell>;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route path="/dashboard" element={
                    <RotaProtegida><Dashboard /></RotaProtegida>
                } />
                <Route path="/empresas" element={
                    <RotaProtegida><Empresas /></RotaProtegida>
                } />
                <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;