import React from 'react';
import styles from './DataTable.module.css';

// Mapa de alinhamento -> classe CSS (evita style inline para layout)
const alinhamentos = {
    left: styles.alinharEsquerda,
    center: styles.alinharCentro,
    right: styles.alinharDireita,
};

/**
 * Tabela genérica reutilizável.
 *
 * colunas: [{ chave, titulo, render(item) => ReactNode, alinhar?: 'left'|'right'|'center' }]
 * Cada coluna define seu próprio `render`, o que permite células compostas
 * (ex.: nome + cidade embaixo) e colunas de ações com botões.
 */
function DataTable({ colunas, dados = [], chaveLinha = (item) => item.id, vazio }) {
    if (dados.length === 0 && vazio) {
        return <div className={styles.containerVazio}>{vazio}</div>;
    }

    return (
        <div className={styles.container}>
            <table className={styles.tabela}>
                <thead>
                    <tr>
                        {colunas.map((coluna) => (
                            <th
                                key={coluna.chave}
                                className={`${styles.cabecalhoCelula} ${alinhamentos[coluna.alinhar] || alinhamentos.left}`}
                            >
                                {coluna.titulo}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dados.map((item) => (
                        <tr key={chaveLinha(item)} className={styles.linha}>
                            {colunas.map((coluna) => (
                                <td
                                    key={coluna.chave}
                                    className={`${styles.celula} ${alinhamentos[coluna.alinhar] || alinhamentos.left}`}
                                >
                                    {coluna.render(item)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;
