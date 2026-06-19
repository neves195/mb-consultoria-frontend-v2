import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styles from './LineChart.module.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

function LineChart({ dados }) {

    const data = {
        labels: dados.labels,
        datasets: [
            {
                label: 'Matrículas',
                data: dados.matriculas,
                borderColor: '#2f6fed',
                backgroundColor: 'rgba(47, 111, 237, 0.1)',
                fill: true,
                tension: 0.4,
            },
            {
                label: 'Conclusões',
                data: dados.conclusoes,
                borderColor: '#27ae8b',
                backgroundColor: 'rgba(39, 174, 139, 0.1)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const opcoes = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            tooltip: { mode: 'index', intersect: false },
        },
        scales: {
            y: { beginAtZero: true },
        },
    };

    return (
        <div className={styles.card}>
            <h3 className={styles.titulo}>Matrículas x Conclusões</h3>
            <Line data={data} options={opcoes} />
        </div>
    );
}

export default LineChart;