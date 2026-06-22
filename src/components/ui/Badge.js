import React from 'react';
import styles from './Badge.module.css';

// Mapa de cor -> classe CSS. Adicionar novas cores aqui quando precisar.
const cores = {
    verde: styles.verde,
    amber: styles.amber,
    vermelho: styles.vermelho,
    azul: styles.azul,
};

function Badge({ cor = 'azul', texto }) {
    return (
        <span className={`${styles.badge} ${cores[cor] || cores.azul}`}>
            {texto}
        </span>
    );
}

export default Badge;
