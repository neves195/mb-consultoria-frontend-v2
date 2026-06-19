import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import styles from './DonutChart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function DonutChart({ dados }) {

    const total = dados.validos + dados.aVencer + dados.vencidos;

    const data = {
        labels: ['Válidos', 'A vencer (30d)', 'Vencidos'],
        datasets: [
            {
                data: [dados.validos, dados.aVencer, dados.vencidos],
                backgroundColor: ['#27ae8b', '#e8973a', '#e0566f'],
                borderWidth: 0,
            },
        ],
    };

    const opcoes = {
        responsive: true,
        cutout: '70%',
        plugins: {
            legend: { position: 'right' },
            tooltip: {
                callbacks: {
                    label: (item) => {
                        const pct = ((item.raw / total) * 100).toFixed(1);
                        return ` ${item.label}: ${item.raw} (${pct}%)`;
                    },
                },
            },
        },
    };

    return (
        <div className={styles.card}>
            <h3 className={styles.titulo}>Certificados por situação</h3>
            <div className={styles.grafico}>
                <Doughnut data={data} options={opcoes} />
                <div className={styles.centro}>
                    <span className={styles.totalValor}>{total}</span>
                    <span className={styles.totalLabel}>total</span>
                </div>
            </div>
        </div>
    );
}

export default DonutChart;