import React from 'react';
import styles from './PageHeader.module.css';

function PageHeader({ titulo, subtitulo, acao }) {
    return (
        <div className={styles.cabecalho}>
            <div>
                <h1 className={styles.titulo}>{titulo}</h1>
                {subtitulo && <p className={styles.subtitulo}>{subtitulo}</p>}
            </div>
            {acao && <div className={styles.acao}>{acao}</div>}
        </div>
    );
}

export default PageHeader;
