// TODO: substituir mock pela chamada real à API quando o back-end tiver os endpoints de dashboard
import React, { useState } from 'react';
import { dadosDashboard } from '../../mocks/dashboard.mock';
import PeriodFilter from '../../components/ui/PeriodFilter';
import KpiCard from '../../components/charts/KpiCard';
import LineChart from '../../components/charts/LineChart';
import DonutChart from '../../components/charts/DonutChart';
import NrBarChart from '../../components/charts/NrBarChart';
import TopEmpresas from '../../components/charts/TopEmpresas';
import Vencimentos from '../../components/charts/Vencimentos';
import styles from './Dashboard.module.css';

function Dashboard() {
    const [periodo, setPeriodo] = useState('mes');
    const dados = dadosDashboard[periodo];

    return (
        <div className={styles.container}>
            <div className={styles.cabecalho}>
                <div>
                    <h1 className={styles.titulo}>Dashboard</h1>
                    <p className={styles.subtitulo}>Visão geral dos treinamentos</p>
                </div>
                <PeriodFilter periodoAtivo={periodo} onChange={setPeriodo} />
            </div>

            <div className={styles.gridKpis}>
                <KpiCard
                    titulo="Alunos ativos"
                    icone="👤"
                    valor={dados.kpis.alunosAtivos.valor}
                    variacao={dados.kpis.alunosAtivos.variacao}
                    positivo={dados.kpis.alunosAtivos.positivo}
                />
                <KpiCard
                    titulo="Empresas clientes"
                    icone="🏢"
                    valor={dados.kpis.empresasClientes.valor}
                    variacao={dados.kpis.empresasClientes.variacao}
                    positivo={dados.kpis.empresasClientes.positivo}
                />
                <KpiCard
                    titulo="Treinamentos realizados"
                    icone="📋"
                    valor={dados.kpis.treinamentos.valor}
                    variacao={dados.kpis.treinamentos.variacao}
                    positivo={dados.kpis.treinamentos.positivo}
                />
                <KpiCard
                    titulo="Certificados emitidos"
                    icone="📄"
                    valor={dados.kpis.certificados.valor}
                    variacao={dados.kpis.certificados.variacao}
                    positivo={dados.kpis.certificados.positivo}
                />
            </div>

            <div className={styles.gridLinha2}>
                <LineChart dados={dados.matriculasConclusoes} />
                <DonutChart dados={dados.certificadosSituacao} />
            </div>

            <div className={styles.gridLinha3}>
                <NrBarChart dados={dados.treinamentosPorNR} />
                <TopEmpresas dados={dados.topEmpresas} />
                <Vencimentos dados={dados.vencimentos} />
            </div>
        </div>
    );
}

export default Dashboard;
