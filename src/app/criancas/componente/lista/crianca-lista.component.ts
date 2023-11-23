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
    }
  ]

  public readonly acaoPortas: PoTableAction[] = [
    {
      label: 'Editar',
      // action: this.acaoFecharPortasPoDialog.bind(this)
    },
    {
      label: 'Deletar',
      // action: this.acaoFecharPortasPoDialog.bind(this)
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
}
