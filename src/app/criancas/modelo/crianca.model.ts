
export interface CriancaModel {
  id?:string;
  numero_registro?: string;
  nome?: string;
  apelido?: string;
  responsavel?: string;
  telefone?: string;
  numero_tenis?: string;
  posicao?: string;
  posicao_secundaria?: string;
  categoria?: string;
  data_nascimento?: Date
  tamanho_camiseta?: string;
  tamanho_calca?: string;
}

export function INITIAL_CRIANCA(): CriancaModel {
  return {
    id: undefined,
    numero_registro: undefined,
    nome: undefined,
    apelido: undefined,
    responsavel: undefined,
    telefone: undefined,
    numero_tenis: undefined,
    posicao: undefined,
    posicao_secundaria: undefined,
    categoria: undefined,
    data_nascimento: undefined,
    tamanho_camiseta: undefined,
    tamanho_calca: undefined,
  }
}


export const colunasCriancas = [
  {
    property: 'registro',
    label: 'Número de registro'
  },
  {
    property: 'nome',
    label: 'Nome'
  },
  {
    property: 'apelido',
    label: 'Apelido'
  },
  {
    property: 'responsavel',
    label: 'Responsável'
  },
  {
    property: 'data_nascimento',
    label: 'Data de Nascimento',
    type: 'date'
  },
  {
    property: 'categoria',
    label: 'Categoria',
    type: 'cellTemplate'
  },
  {
    property: 'posicao',
    label: 'Posição',
    type: 'cellTemplate'
  },
]
