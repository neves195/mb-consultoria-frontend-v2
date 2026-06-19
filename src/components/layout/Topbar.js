import React from 'react';
import styles from './Topbar.module.css';

function Topbar({ temaEscuro, onToggleTema }) {

    // Formata a data por extenso
    const dataFormatada = new Date().toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <header className={styles.topbar}>
            <span className={styles.data}>{dataFormatada}</span>
            <button
                className={styles.botaoTema}
                onClick={onToggleTema}
            >
                {temaEscuro ? '☀️ Tema claro' : '🌙 Tema escuro'}
            </button>
        </header>
    );
}

export default Topbar;