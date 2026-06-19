import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import styles from './NrBarChart.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const nomeCompleto = {
    'NR-35': 'NR-35 — Trabalho em Altura',
    'NR-10': 'NR-10 — Segurança em Eletricidade',
    'NR-33': 'NR-33 — Espaço Confinado',
    'NR-12': 'NR-12 — Segurança em Máquinas',
    'NR-06': 'NR-06 — Equipamentos de Proteção',
};

const nrCores = {
    'NR-35': '#2f6fed',
    'NR-10': '#e8973a',
    'NR-33': '#0f9b8e',
    'NR-12': '#8b6ff0',
    'NR-06': '#27ae8b',
};

function NrBarChart({ dados }) {

    const data = {
        labels: dados.labels,
        datasets: [
            {
                label: 'Treinamentos',
                data: dados.valores,
                backgroundColor: dados.labels.map((nr) => nrCores[nr] || '#2f6fed'),
                borderRadius: 4,
            },
        ],
    };

    const opcoes = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    title: (items) => nomeCompleto[items[0].label] || items[0].label,
                },
            },
        },
        scales: {
            y: { beginAtZero: true, ticks: { stepSize: 2 } },
        },
    };

    return (
        <div className={styles.card}>
            <h3 className={styles.titulo}>Treinamentos por NR</h3>
            <Bar data={data} options={opcoes} />
        </div>
    );
}

export default NrBarChart;