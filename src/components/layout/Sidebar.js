import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';

const menuItems = [
    { path: '/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/empresas', icon: '🏢', label: 'Empresas' },
    { path: '/alunos', icon: '👤', label: 'Alunos' },
    { path: '/cursos', icon: '📚', label: 'Cursos / NRs' },
    { path: '/treinamentos', icon: '📋', label: 'Treinamentos' },
    { path: '/agenda', icon: '📅', label: 'Agenda' },
    { path: '/matriculas', icon: '✅', label: 'Matrículas' },
    { path: '/certificados', icon: '📄', label: 'Certificados' },
];

const menuBottom = [
    { path: '/financeiro', icon: '💰', label: 'Financeiro' },
    { path: '/configuracoes', icon: '⚙️', label: 'Configurações' },
];

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const nome = localStorage.getItem('nome') || 'Administrador';
    const perfil = localStorage.getItem('perfil') || 'admin';
    const logoSrc = process.env.PUBLIC_URL + '/assets/logo-mb-branca.png';

    const isAtivo = (path) => location.pathname === path;

    return (
        <aside className={styles.sidebar}>

            {/* Logo */}
            <div className={styles.brand}>
                <img
                    src={logoSrc}
                    alt="MB Consultoria Neves — Treinamentos"
                    className={styles.brandLogo}
                />
            </div>

            {/* Menu principal */}
            <nav className={styles.nav}>
                {menuItems.map((item) => (
                    <button
                        key={item.path}
                        className={`${styles.navItem} ${isAtivo(item.path) ? styles.navItemAtivo : ''}`}
                        onClick={() => navigate(item.path)}
                    >
                        <span className={styles.navIcon}>{item.icon}</span>
                        <span className={styles.navLabel}>{item.label}</span>
                    </button>
                ))}

                {/* Divisor */}
                <div className={styles.divisor} />

                {menuBottom.map((item) => (
                    <button
                        key={item.path}
                        className={`${styles.navItem} ${isAtivo(item.path) ? styles.navItemAtivo : ''}`}
                        onClick={() => navigate(item.path)}
                    >
                        <span className={styles.navIcon}>{item.icon}</span>
                        <span className={styles.navLabel}>{item.label}</span>
                    </button>
                ))}
            </nav>

            {/* Usuário */}
            <div className={styles.usuario}>
                <div className={styles.avatar}>
                    {nome[0].toUpperCase()}
                </div>
                <div className={styles.usuarioInfo}>
                    <span className={styles.usuarioNome}>{nome}</span>
                    <span className={styles.usuarioPerfil}>{perfil}</span>
                </div>
            </div>

        </aside>
    );
}

export default Sidebar;