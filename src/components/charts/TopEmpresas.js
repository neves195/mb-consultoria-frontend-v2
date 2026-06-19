import React from 'react';
import styles from './TopEmpresas.module.css';

function TopEmpresas({ dados }) {
    return (
        <div className={styles.card}>
            <h3 className={styles.titulo}>Top Empresas</h3>
            <div className={styles.lista}>
                {dados.map((empresa) => {
                    const pct = (empresa.alunos / empresa.total) * 100;
                    return (
                        <div key={empresa.nome} className={styles.item}>
                            <div className={styles.cabecalho}>
                                <span className={styles.nome}>{empresa.nome}</span>
                                <span className={styles.alunos}>{empresa.alunos} alunos</span>
                            </div>
                            <div className={styles.barraFundo}>
                                <div
                                    className={styles.barraPreenchida}
                                    style={{ width: `${pct}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default TopEmpresas;
