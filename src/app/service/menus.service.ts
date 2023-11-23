import { PoMenuItem } from "@po-ui/ng-components"

const navegaInicio = {
  label: 'Início',
  link:''
 }

 const navegaCriancas = {
  label: 'Crianças',
  link:'/crianca'
 }

 const navegaPadrinhos = {
  label: 'Padrinhos',
  link:'/padrinho'
 }

 const navegaMonitoramento = {
  label: 'Monitoramento',
  link:'/monitoramento'
 }

const navegaMenusArray = [
navegaInicio,
navegaCriancas,
navegaPadrinhos,
] as PoMenuItem[]

export {
  navegaMenusArray,
  navegaInicio,
  navegaCriancas,
  navegaPadrinhos,
  navegaMonitoramento
}
