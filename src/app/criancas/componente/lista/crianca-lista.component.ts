import { CriancaApiService } from './../../service/crianca.service';
import { Component, OnInit, ViewChild } from "@angular/core";
import { CriancaModel, colunasCriancas } from "../../modelo/crianca.model";
import { PoDialogService, PoNotificationService, PoPageAction, PoTableAction } from "@po-ui/ng-components";
import { navegaCriancas } from "src/app/service/menus.service";
import { CriancaFormularioComponent } from "../formulario/crianca-formulario.component";

@Component({
  selector: 'app-crianca-lista',
  templateUrl: './crianca-lista.component.html'
})
export class CriancaListaComponent implements OnInit{

  colunasMonitoramento = colunasCriancas
  tituloPagina = navegaCriancas.label
  itemsAnemometro!: CriancaModel[]

  @ViewChild('modalCriancaFormulario', {static: true})
  modalCriancaFormulario!: CriancaFormularioComponent

  public readonly acoes: Array<PoPageAction> = [
    {
      label: 'Cadastrar Criança',
      action: this.novaCrianca.bind(this)
    },
    {
      label: 'Atualizar',
      action: this.listarRegistrosCrianca.bind(this)
    }
  ]

  public readonly acaoPortas: PoTableAction[] = [
    {
      label: 'Editar',
      action: this.detalharCrianca.bind(this)
    },
    {
      label: 'Deletar',
      action: this.excluirCrianca.bind(this)
    }
  ]

  constructor(
    private poDialog: PoDialogService,
    private poNotification: PoNotificationService,
    private criancaApiService: CriancaApiService
  ){}

  ngOnInit(): void {
    this.listarRegistrosCrianca()
  }

  novaCrianca(){
    this.modalCriancaFormulario.abrirModalCrianca()
  }

  listarRegistrosCrianca(){
    this.criancaApiService.listarCriancas().subscribe({
      next: (response: any) => {
          this.itemsAnemometro = response
      }
    })
  }

  detalharCrianca(crianca: CriancaModel){
    this.modalCriancaFormulario.abrirModalCrianca(crianca)
  }

  excluirCrianca(crianca: CriancaModel){
    this.criancaApiService.deletarRegistroCrianca(crianca?.id).subscribe({
      next: (response: any) => {
        this.poNotification.warning(response)
      },
      error: ({error}) => {
        this.poNotification.error('ERRO DE SISTEMA')
      },
      complete: () => {
        this.listarRegistrosCrianca()
      }
    })
  }
}
