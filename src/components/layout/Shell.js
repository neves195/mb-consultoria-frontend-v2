import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import styles from './Shell.module.css';

function Shell({ children }) {

    const [temaEscuro, setTemaEscuro] = useState(
        localStorage.getItem('tema') !== 'light'
    );

    useEffect(() => {
        document.documentElement.setAttribute(
            'data-theme',
            temaEscuro ? 'dark' : 'light'
        );
        localStorage.setItem('tema', temaEscuro ? 'dark' : 'light');
    }, [temaEscuro]);

    return (
       <div className={styles.shell}>
        <Sidebar />
        <div className={styles.main}>
            <Topbar
                temaEscuro={temaEscuro}
                onToggleTema={() => setTemaEscuro(!temaEscuro)}
            /> 
            <main className={styles.conteudo}>
                    {children}
                </main>
            </div>
       </div>
       );
}

export default Shell;