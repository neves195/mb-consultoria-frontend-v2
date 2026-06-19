import React from 'react';
import styles from './KpiCard.module.css';

function KpiCard({ titulo, valor, variacao, positivo, icone }) {

    const corVariacao = positivo ? '#27ae8b' : '#e0566f';
    const seta = positivo ? '▲' : '▼';

    return (
        <div className={styles.card}>
            <div className={styles.topo}>
                <span className={styles.icone}>{icone}</span>
                <span className={styles.titulo}>{titulo}</span>
            </div>
            <div className={styles.valor}>{valor}</div>
            <div className={styles.variacao} style={{ color: corVariacao }}>
                {seta} {variacao}%
            </div>
        </div>
    );
}

export default KpiCard;