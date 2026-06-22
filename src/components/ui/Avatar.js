import React from 'react';
import styles from './Avatar.module.css';

const paleta = [styles.p0, styles.p1, styles.p2, styles.p3, styles.p4, styles.p5];

// Duas primeiras palavras do nome -> iniciais (ex.: "Construtora Horizonte" -> "CH")
function obterIniciais(nome) {
    const partes = nome.trim().split(/\s+/);
    if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
    return (partes[0][0] + partes[1][0]).toUpperCase();
}

// Hash simples do nome -> sempre a mesma cor para a mesma empresa
function obterIndiceCor(nome) {
    const soma = nome.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return soma % paleta.length;
}

function Avatar({ nome }) {
    return (
        <span className={`${styles.avatar} ${paleta[obterIndiceCor(nome)]}`}>
            {obterIniciais(nome)}
        </span>
    );
}

export default Avatar;
