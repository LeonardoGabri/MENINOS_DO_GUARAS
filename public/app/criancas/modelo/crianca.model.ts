export interface CriancaModel {
  id?:string;
  nome?: string;
  apelido?: string;
  responsavel?: string;
  telefone?: string;
  numeroTenis?: string;
  posicao?: string;
  posicaoSecundaria?: string;
  categoria?: string;
  dataNascimento?: Date
}

export const colunasCriancas = [
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
    label: 'Categoria'
  },
  {
    property: 'posicao',
    label: 'Posição'
  },
]
