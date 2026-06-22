import React from 'react';
import styles from './StatStrip.module.css';

const cores = {
    verde: styles.icone_verde,
    amber: styles.icone_amber,
    vermelho: styles.icone_vermelho,
    azul: styles.icone_azul,
};

// itens: [{ label: string, valor: number|string, icone?: string, cor?: 'verde'|'amber'|'vermelho'|'azul' }]
function StatStrip({ itens = [] }) {
    return (
        <div className={styles.strip}>
            {itens.map((item) => (
                <div key={item.label} className={styles.item}>
                    {item.icone && (
                        <span className={`${styles.icone} ${cores[item.cor] || cores.azul}`}>
                            {item.icone}
                        </span>
                    )}
                    <div className={styles.textos}>
                        <span className={styles.label}>{item.label}</span>
                        <span className={styles.valor}>{item.valor}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default StatStrip;
