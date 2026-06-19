import React from 'react';
import styles from './PeriodFilter.module.css';

const periodos = [
    { valor: 'mes', label: 'Este mês' },
    { valor: 'trimestre', label: 'Trimestre' },
    { valor: 'ano', label: 'Ano' },
];

function PeriodFilter({ periodoAtivo, onChange }) {
    return (
        <div className={styles.container}>
            {periodos.map((p) => {
                const ativo = p.valor === periodoAtivo;
                return (
                    <button
                        key={p.valor}
                        onClick={() => onChange(p.valor)}
                        className={`${styles.botao} ${ativo ? styles.botaoAtivo : ''}`}
                    >
                        {p.label}
                    </button>
                );
            })}
        </div>
    );
}

export default PeriodFilter;