import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    // TODO (fase 2): usar este valor para decidir expiração da sessão
    const [lembrar, setLembrar] = useState(true);
    const [erro, setErro] = useState('');
    const [loading, setLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();

        if (!email.trim() || !senha) {
            setErro('Preencha e-mail e senha.');
            return;
        }

        setErro('');
        setLoading(true);

        // TODO (fase 2): substituir simulação por POST /api/auth/login real,
        // salvar token no localStorage e tratar erro 401 com a caixa de erro.
        setTimeout(() => {
            navigate('/dashboard');
        }, 850);
    }

    return (
        <div className={styles.stage}>
            <section className={styles.brand}>
                <div className={`${styles.glow} ${styles.glowA}`} />
                <div className={`${styles.glow} ${styles.glowB}`} />

                <img
                    src={process.env.PUBLIC_URL + '/assets/logo-mb-branca.png'}
                    alt="MB Consultoria Neves"
                    className={styles.brandLogo}
                />

                <div className={styles.brandMid}>
                    <div className={styles.brandTag}>🛡️ Gestão de treinamentos e NRs</div>
                    <h1 className={styles.brandH1}>
                        Segurança do trabalho <span>sob controle</span>, do agendamento ao certificado.
                    </h1>
                    <p className={styles.brandSub}>
                        Centralize empresas, alunos, turmas e certificados em um só lugar — com
                        agenda, financeiro e indicadores em tempo real.
                    </p>
                    <div className={styles.brandFeats}>
                        <div className={styles.feat}>
                            <span className={styles.dot}>📅</span> Agende e acompanhe turmas por NR
                        </div>
                        <div className={styles.feat}>
                            <span className={styles.dot}>📜</span> Controle de validade de certificados
                        </div>
                        <div className={styles.feat}>
                            <span className={styles.dot}>📊</span> Indicadores e financeiro integrados
                        </div>
                    </div>
                </div>

                <div className={styles.brandFoot}>
                    © 2026 MB Consultoria Neves · Todos os direitos reservados
                </div>
            </section>

            <section className={styles.panel}>
                <div className={styles.card}>
                    <img
                        src={process.env.PUBLIC_URL + '/assets/logo-mb.png'}
                        alt="MB Consultoria Neves"
                        className={styles.mobileLogo}
                    />

                    <div className={styles.welcome}>Bem-vindo de volta 👋</div>
                    <div className={styles.welcomeSub}>
                        Entre com suas credenciais para acessar o sistema.
                    </div>

                    <form className={styles.form} onSubmit={handleSubmit} noValidate>
                        {erro && (
                            <div className={styles.err}>
                                <span>⚠️</span>
                                <span>{erro}</span>
                            </div>
                        )}

                        <div className={styles.field}>
                            <label htmlFor="email">E-mail</label>
                            <div className={styles.inputWrap}>
                                <span className={styles.ic}>✉️</span>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="seu@email.com.br"
                                    autoComplete="username"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="senha">Senha</label>
                            <div className={styles.inputWrap}>
                                <span className={styles.ic}>🔒</span>
                                <input
                                    type={mostrarSenha ? 'text' : 'password'}
                                    id="senha"
                                    name="senha"
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className={styles.toggle}
                                    aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                                    onClick={() => setMostrarSenha(!mostrarSenha)}
                                >
                                    {mostrarSenha ? 'Ocultar' : 'Mostrar'}
                                </button>
                            </div>
                        </div>

                        <div className={styles.row}>
                            <label className={styles.check}>
                                <input
                                    type="checkbox"
                                    checked={lembrar}
                                    onChange={(e) => setLembrar(e.target.checked)}
                                />
                                Lembrar de mim
                            </label>
                            {/* TODO (fase 2): fluxo real de recuperação de senha por e-mail */}
                            <a href="#" className={styles.link} onClick={(e) => e.preventDefault()}>
                                Esqueci minha senha
                            </a>
                        </div>

                        <button
                            type="submit"
                            className={`${styles.submit} ${loading ? styles.loading : ''}`}
                        >
                            {loading && <span className={styles.spin} />}
                            <span>{loading ? 'Entrando…' : 'Entrar'}</span>
                        </button>
                    </form>

                    <div className={styles.divider}>ou</div>

                    {/* TODO (fase 2): integração real com SSO corporativo */}
                    <button type="button" className={styles.sso} disabled>
                        <span>🔑</span> Entrar com SSO corporativo
                    </button>

                    {/* TODO (fase 2): fluxo real de solicitação de acesso */}
                    <div className={styles.signup}>
                        Não tem acesso?{' '}
                        <a href="#" onClick={(e) => e.preventDefault()}>
                            Solicite ao administrador
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;
