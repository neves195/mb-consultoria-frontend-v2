import React from 'react';
import styles from './Vencimentos.module.css';

function corUrgencia(dias) {
    if (dias <= 7) return 'var(--color-alert)';
    if (dias <= 15) return 'var(--color-amber)';
    return 'var(--color-green)';
}

function Vencimentos({ dados }) {
    return (
        <div className={styles.card}>
            <h3 className={styles.titulo}>Certificados a vencer (30 dias)</h3>
            <div className={styles.lista}>
                {dados.map((item) => {
                    const cor = corUrgencia(item.dias);
                    return (
                        <div key={`${item.nome}-${item.nr}`} className={styles.item}>
                            <span className={styles.badge} style={{ backgroundColor: cor }}>
                                {item.nr}
                            </span>
                            <div className={styles.info}>
                                <span className={styles.nome}>{item.nome}</span>
                                <span className={styles.empresa}>{item.empresa}</span>
                            </div>
                            <span className={styles.dias} style={{ color: cor }}>
                                {item.dias}d
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Vencimentos;
