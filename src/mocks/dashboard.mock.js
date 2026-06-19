// TODO: substituir por chamadas reais à API
// Exemplo: api.get('/api/dashboard/kpis?periodo=' + periodo)

export const dadosDashboard = {
    mes: {
        kpis: {
            alunosAtivos:          { valor: 84,  variacao: 12, positivo: true },
            empresasClientes:      { valor: 7,   variacao: 0,  positivo: true },
            treinamentos:          { valor: 12,  variacao: 20, positivo: true },
            certificados:          { valor: 84,  variacao: 15, positivo: true },
        },
        matriculasConclusoes: {
            labels:     ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
            matriculas: [18, 24, 20, 22],
            conclusoes: [15, 20, 18, 19],
        },
        certificadosSituacao: {
            validos:  60,
            aVencer:  14,
            vencidos: 10,
        },
        treinamentosPorNR: {
            labels: ['NR-35', 'NR-10', 'NR-33', 'NR-12', 'NR-06'],
            valores: [12, 8, 6, 5, 4],
        },
        topEmpresas: [
            { nome: 'Empresa Teste LTDA', alunos: 30, total: 84 },
            { nome: 'Construtora ABC',    alunos: 20, total: 84 },
            { nome: 'Indústria XYZ',      alunos: 18, total: 84 },
            { nome: 'Mineração Norte',    alunos: 10, total: 84 },
            { nome: 'Petroquímica Sul',   alunos: 6,  total: 84 },
        ],
        vencimentos: [
            { nome: 'João da Silva',   empresa: 'Empresa Teste', nr: 'NR-35', dias: 5  },
            { nome: 'Maria Santos',    empresa: 'Construtora ABC', nr: 'NR-10', dias: 10 },
            { nome: 'Pedro Oliveira',  empresa: 'Indústria XYZ',   nr: 'NR-33', dias: 18 },
            { nome: 'Ana Costa',       empresa: 'Mineração Norte',  nr: 'NR-12', dias: 25 },
        ],
    },
    trimestre: {
        kpis: {
            alunosAtivos:     { valor: 210, variacao: 8,  positivo: true },
            empresasClientes: { valor: 7,   variacao: 0,  positivo: true },
            treinamentos:     { valor: 34,  variacao: 13, positivo: true },
            certificados:     { valor: 210, variacao: 10, positivo: true },
        },
        matriculasConclusoes: {
            labels:     ['Jan', 'Fev', 'Mar'],
            matriculas: [60, 80, 70],
            conclusoes: [55, 72, 65],
        },
        certificadosSituacao: {
            validos:  150,
            aVencer:  35,
            vencidos: 25,
        },
        treinamentosPorNR: {
            labels: ['NR-35', 'NR-10', 'NR-33', 'NR-12', 'NR-06'],
            valores: [34, 22, 18, 15, 12],
        },
        topEmpresas: [
            { nome: 'Empresa Teste LTDA', alunos: 80,  total: 210 },
            { nome: 'Construtora ABC',    alunos: 55,  total: 210 },
            { nome: 'Indústria XYZ',      alunos: 40,  total: 210 },
            { nome: 'Mineração Norte',    alunos: 22,  total: 210 },
            { nome: 'Petroquímica Sul',   alunos: 13,  total: 210 },
        ],
        vencimentos: [
            { nome: 'João da Silva',  empresa: 'Empresa Teste',  nr: 'NR-35', dias: 5  },
            { nome: 'Maria Santos',   empresa: 'Construtora ABC', nr: 'NR-10', dias: 10 },
            { nome: 'Pedro Oliveira', empresa: 'Indústria XYZ',   nr: 'NR-33', dias: 18 },
            { nome: 'Ana Costa',      empresa: 'Mineração Norte',  nr: 'NR-12', dias: 25 },
        ],
    },
    ano: {
        kpis: {
            alunosAtivos:     { valor: 720, variacao: 22, positivo: true },
            empresasClientes: { valor: 12,  variacao: 20, positivo: true },
            treinamentos:     { valor: 130, variacao: 18, positivo: true },
            certificados:     { valor: 720, variacao: 20, positivo: true },
        },
        matriculasConclusoes: {
            labels:     ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
            matriculas: [60, 55, 70, 65, 80, 75, 90, 85, 70, 65, 80, 75],
            conclusoes: [55, 50, 65, 60, 72, 68, 82, 78, 65, 60, 74, 70],
        },
        certificadosSituacao: {
            validos:  520,
            aVencer:  120,
            vencidos: 80,
        },
        treinamentosPorNR: {
            labels: ['NR-35', 'NR-10', 'NR-33', 'NR-12', 'NR-06'],
            valores: [130, 85, 70, 60, 45],
        },
        topEmpresas: [
            { nome: 'Empresa Teste LTDA', alunos: 250, total: 720 },
            { nome: 'Construtora ABC',    alunos: 180, total: 720 },
            { nome: 'Indústria XYZ',      alunos: 140, total: 720 },
            { nome: 'Mineração Norte',    alunos: 90,  total: 720 },
            { nome: 'Petroquímica Sul',   alunos: 60,  total: 720 },
        ],
        vencimentos: [
            { nome: 'João da Silva',  empresa: 'Empresa Teste',   nr: 'NR-35', dias: 5  },
            { nome: 'Maria Santos',   empresa: 'Construtora ABC',  nr: 'NR-10', dias: 10 },
            { nome: 'Pedro Oliveira', empresa: 'Indústria XYZ',    nr: 'NR-33', dias: 18 },
            { nome: 'Ana Costa',      empresa: 'Mineração Norte',   nr: 'NR-12', dias: 25 },
        ],
    },
};