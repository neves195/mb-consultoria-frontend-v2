import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import PageHeader from '../../components/ui/PageHeader';
import StatStrip from '../../components/ui/StatStrip';
import DataTable from '../../components/ui/DataTable';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import styles from './Empresas.module.css';

// Formulário vazio — usado tanto para "limpar" quanto como estado inicial.
// Os nomes dos campos seguem exatamente o JSON da API (camelCase).
const FORM_VAZIO = {
    nomeEmpresa: '',
    nomeFantasia: '',
    cnpj: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    telefone: '',
    emailContato: '',
    responsavel: '',
};

const TITULO_ABA_FORM = {
    criar: 'Cadastrar empresa',
    editar: 'Editar empresa',
    visualizar: 'Visualizar empresa',
};

function Empresas() {
    const [aba, setAba] = useState('lista'); // 'lista' | 'cadastro'
    const [modoForm, setModoForm] = useState('criar'); // 'criar' | 'editar' | 'visualizar'

    const [empresas, setEmpresas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erroLista, setErroLista] = useState(null);
    const [busca, setBusca] = useState('');
    const [filtroStatus, setFiltroStatus] = useState('ativas'); // só "ativas" é suportado pela API hoje

    const [form, setForm] = useState(FORM_VAZIO);
    const [idEmEdicao, setIdEmEdicao] = useState(null);
    const [salvando, setSalvando] = useState(false);

    function carregarEmpresas() {
        setCarregando(true);
        setErroLista(null);
        api
            .get('/api/empresas')
            .then((resposta) => setEmpresas(resposta.data))
            .catch(() => setErroLista('Não foi possível carregar a lista de empresas.'))
            .finally(() => setCarregando(false));
    }

    // Busca a lista uma vez, ao montar a tela.
    useEffect(() => {
        carregarEmpresas();
    }, []);

    const empresasFiltradas = empresas.filter((empresa) => {
        const termo = busca.trim().toLowerCase();
        if (!termo) return true;
        return (
            empresa.nomeEmpresa.toLowerCase().includes(termo) ||
            (empresa.cnpj || '').includes(termo)
        );
    });

    const totalEmpresas = empresas.length;
    // GET /api/empresas só devolve empresas ativas — não existe endpoint de inativas ainda.
    const ativasCount = totalEmpresas;
    const inativasCount = 0;

    function abrirForm(empresa, modo) {
        if (empresa) {
            setIdEmEdicao(empresa.id);
            setForm({
                nomeEmpresa: empresa.nomeEmpresa || '',
                nomeFantasia: empresa.nomeFantasia || '',
                cnpj: empresa.cnpj || '',
                endereco: empresa.endereco || '',
                cidade: empresa.cidade || '',
                estado: empresa.estado || '',
                cep: empresa.cep || '',
                telefone: empresa.telefone || '',
                emailContato: empresa.emailContato || '',
                responsavel: empresa.responsavel || '',
            });
        } else {
            setIdEmEdicao(null);
            setForm(FORM_VAZIO);
        }
        setModoForm(modo);
        setAba('cadastro');
    }

    function cancelarForm() {
        setForm(FORM_VAZIO);
        setIdEmEdicao(null);
        setModoForm('criar');
        setAba('lista');
    }

    function handleChange(campo) {
        return (evento) => setForm({ ...form, [campo]: evento.target.value });
    }

    function handleSalvar(evento) {
        evento.preventDefault();

        if (!form.nomeEmpresa.trim() || !form.cnpj.trim()) {
            alert('Nome da empresa e CNPJ são obrigatórios.');
            return;
        }

        setSalvando(true);
        const requisicao = idEmEdicao
            ? api.put(`/api/empresas/${idEmEdicao}`, form)
            : api.post('/api/empresas', form);

        requisicao
            .then(() => {
                alert(idEmEdicao ? 'Empresa atualizada com sucesso!' : 'Empresa cadastrada com sucesso!');
                cancelarForm();
                carregarEmpresas();
            })
            .catch((erro) => {
                // O back-end devolve a mensagem de erro como texto puro, não JSON.
                alert(erro.response?.data || 'Erro ao salvar a empresa.');
            })
            .finally(() => setSalvando(false));
    }

    // Chamado de dentro do formulário (editar/visualizar) — não existe mais na linha da tabela.
    function handleDesativar() {
        if (!window.confirm(`Desativar a empresa "${form.nomeEmpresa}"?`)) return;

        api
            .delete(`/api/empresas/${idEmEdicao}`)
            .then(() => {
                cancelarForm();
                carregarEmpresas();
            })
            .catch((erro) => alert(erro.response?.data || 'Erro ao desativar a empresa.'));
    }

    const colunas = [
        {
            chave: 'empresa',
            titulo: 'Empresa',
            render: (item) => (
                <div className={styles.celulaEmpresa}>
                    <Avatar nome={item.nomeEmpresa} />
                    <div>
                        <div className={styles.celulaPrincipal}>{item.nomeEmpresa}</div>
                        <div className={styles.celulaSecundaria}>
                            {[item.cidade, item.estado].filter(Boolean).join(', ') || '—'}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            chave: 'cnpj',
            titulo: 'CNPJ',
            render: (item) => item.cnpj,
        },
        {
            chave: 'responsavel',
            titulo: 'Responsável',
            render: (item) => (
                <div>
                    <div className={styles.celulaPrincipal}>{item.responsavel || '—'}</div>
                    <div className={styles.celulaSecundaria}>{item.telefone || ''}</div>
                </div>
            ),
        },
        {
            chave: 'status',
            titulo: 'Status',
            render: () => <Badge cor="verde" texto="Ativa" />,
        },
        {
            chave: 'acoes',
            titulo: 'Ações',
            alinhar: 'right',
            render: (item) => (
                <div className={styles.acoes}>
                    <button
                        className={styles.botaoIcone}
                        aria-label={`Ver detalhes de ${item.nomeEmpresa}`}
                        title="Ver detalhes"
                        onClick={() => abrirForm(item, 'visualizar')}
                    >
                        👁
                    </button>
                    <button
                        className={styles.botaoIcone}
                        aria-label={`Editar ${item.nomeEmpresa}`}
                        title="Editar"
                        onClick={() => abrirForm(item, 'editar')}
                    >
                        ✏️
                    </button>
                </div>
            ),
        },
    ];

    const somenteLeitura = modoForm === 'visualizar';

    return (
        <div className={styles.container}>
            <PageHeader
                titulo="Empresas"
                subtitulo="Cadastro e consulta de empresas clientes"
                acao={
                    aba === 'lista' && (
                        <button className={styles.botaoPrimario} onClick={() => abrirForm(null, 'criar')}>
                            + Nova empresa
                        </button>
                    )
                }
            />

            <div className={styles.abas}>
                <button
                    className={`${styles.aba} ${aba === 'lista' ? styles.abaAtiva : ''}`}
                    onClick={() => setAba('lista')}
                >
                    Empresas ativas
                </button>
                <button
                    className={`${styles.aba} ${aba === 'cadastro' ? styles.abaAtiva : ''}`}
                    onClick={() => setAba('cadastro')}
                >
                    {TITULO_ABA_FORM[modoForm]}
                </button>
            </div>

            {aba === 'lista' && (
                <div className={styles.secao}>
                    <StatStrip
                        itens={[
                            { label: 'Total de empresas', valor: totalEmpresas, icone: '🏢', cor: 'azul' },
                            { label: 'Ativas', valor: ativasCount, icone: '✅', cor: 'verde' },
                            { label: 'Inativas', valor: inativasCount, icone: '⏸', cor: 'amber' },
                        ]}
                    />

                    <div className={styles.linhaFiltros}>
                        <div className={styles.campoBuscaWrapper}>
                            <span className={styles.iconeBusca}>🔍</span>
                            <input
                                className={styles.campoBusca}
                                placeholder="Buscar por nome ou CNPJ..."
                                value={busca}
                                onChange={(evento) => setBusca(evento.target.value)}
                            />
                        </div>
                        <select
                            className={styles.seletorStatus}
                            value={filtroStatus}
                            onChange={(evento) => setFiltroStatus(evento.target.value)}
                        >
                            <option value="ativas">Ativas</option>
                            <option value="inativas" disabled>
                                Inativas (em breve)
                            </option>
                        </select>
                    </div>

                    {carregando && <p className={styles.mensagem}>Carregando...</p>}
                    {erroLista && <p className={styles.mensagemErro}>{erroLista}</p>}

                    {!carregando && !erroLista && (
                        <DataTable
                            colunas={colunas}
                            dados={empresasFiltradas}
                            vazio={
                                empresas.length === 0 ? (
                                    <div className={styles.vazio}>
                                        <p>Nenhuma empresa cadastrada ainda.</p>
                                        <button className={styles.botaoPrimario} onClick={() => abrirForm(null, 'criar')}>
                                            Cadastrar primeira empresa
                                        </button>
                                    </div>
                                ) : (
                                    <div className={styles.vazio}>
                                        <p>Nenhuma empresa encontrada para "{busca}".</p>
                                    </div>
                                )
                            }
                        />
                    )}
                </div>
            )}

            {aba === 'cadastro' && (
                <form className={styles.formulario} onSubmit={handleSalvar}>
                    <fieldset className={styles.fieldset} disabled={somenteLeitura}>
                        <legend className={styles.legenda}>Identificação</legend>
                        <div className={styles.grid}>
                            <label className={styles.campo}>
                                Nome da empresa *
                                <input
                                    value={form.nomeEmpresa}
                                    onChange={handleChange('nomeEmpresa')}
                                    maxLength={200}
                                    required
                                />
                            </label>
                            <label className={styles.campo}>
                                Nome fantasia
                                <input value={form.nomeFantasia} onChange={handleChange('nomeFantasia')} />
                            </label>
                            <label className={styles.campo}>
                                CNPJ *
                                <input
                                    value={form.cnpj}
                                    onChange={handleChange('cnpj')}
                                    maxLength={14}
                                    required
                                />
                            </label>
                        </div>
                    </fieldset>

                    <fieldset className={styles.fieldset} disabled={somenteLeitura}>
                        <legend className={styles.legenda}>Endereço</legend>
                        <div className={styles.grid}>
                            <label className={styles.campo}>
                                Endereço
                                <input value={form.endereco} onChange={handleChange('endereco')} maxLength={300} />
                            </label>
                            <label className={styles.campo}>
                                Cidade
                                <input value={form.cidade} onChange={handleChange('cidade')} maxLength={100} />
                            </label>
                            <label className={styles.campo}>
                                Estado (UF)
                                <input value={form.estado} onChange={handleChange('estado')} maxLength={2} />
                            </label>
                            <label className={styles.campo}>
                                CEP
                                <input value={form.cep} onChange={handleChange('cep')} maxLength={8} />
                            </label>
                        </div>
                    </fieldset>

                    <fieldset className={styles.fieldset} disabled={somenteLeitura}>
                        <legend className={styles.legenda}>Contato</legend>
                        <div className={styles.grid}>
                            <label className={styles.campo}>
                                Telefone
                                <input value={form.telefone} onChange={handleChange('telefone')} maxLength={20} />
                            </label>
                            <label className={styles.campo}>
                                E-mail de contato
                                <input
                                    type="email"
                                    value={form.emailContato}
                                    onChange={handleChange('emailContato')}
                                    maxLength={255}
                                />
                            </label>
                            <label className={styles.campo}>
                                Responsável
                                <input value={form.responsavel} onChange={handleChange('responsavel')} maxLength={150} />
                            </label>
                        </div>
                    </fieldset>

                    <div className={styles.acoesForm}>
                        {idEmEdicao && (
                            <button type="button" className={styles.botaoPerigo} onClick={handleDesativar}>
                                Desativar empresa
                            </button>
                        )}
                        <div className={styles.acoesFormDireita}>
                            <button type="button" className={styles.botaoSecundario} onClick={cancelarForm}>
                                {somenteLeitura ? 'Voltar' : 'Cancelar'}
                            </button>
                            {somenteLeitura ? (
                                <button
                                    type="button"
                                    className={styles.botaoPrimario}
                                    onClick={() => setModoForm('editar')}
                                >
                                    Editar
                                </button>
                            ) : (
                                <button type="submit" className={styles.botaoPrimario} disabled={salvando}>
                                    {salvando ? 'Salvando...' : 'Salvar'}
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}

export default Empresas;
