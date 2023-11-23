import { CriancaComponent } from './../../crianca.component';
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { CriancaModel } from '../../modelo/crianca.model';
import { PoComboOption, PoModalAction, PoModalComponent, PoNotificationService } from '@po-ui/ng-components';
import { CriancaApiService } from '../../service/crianca.service';
import * as moment from 'moment';

@Component({
  selector: 'app-crianca-formulario',
  templateUrl: './crianca-formulario.component.html'
})
export class CriancaFormularioComponent implements OnInit{
  formulario!: FormGroup

  @ViewChild('modalFormularioCrianca', {static: true})
  modalFormularioCrianca!: PoModalComponent

  public posicoes: PoComboOption[] = [
    {
      label: 'Goleiro',
      value: 'GOLEIRO'
    },
    {
      label: 'Zagueiro',
      value: 'ZAGUEIRO'
    },
    {
      label: 'Meia',
      value: 'MEIA'
    },
    {
      label: 'Atacante',
      value: 'ATACANTE'
    }
  ]

  public categorias: PoComboOption[] = [
    {
      label: 'Sub-11',
      value: 'SUB_11'
    },
    {
      label: 'Sub-12',
      value: 'SUB_12'
    },
    {
      label: 'Sub-14',
      value: 'SUB_14'
    },
    {
      label: 'Sub-16',
      value: 'SUB_16'
    },
  ]

  readonly acao: PoModalAction = {
    action: () => {
      this.salvar();
    },
    label: 'Salvar'
  }

  constructor(
    private formBuilder: FormBuilder,
    private criancaApiService: CriancaApiService,
    private poNotification: PoNotificationService
  ){}

  ngOnInit(): void {
    this.criarFormulario()

    this.formulario.statusChanges.subscribe((status) => {
      if(status == 'INVALID'){
        this.acao.disabled = true
      }else{
        this.acao.disabled = false
      }
    })
  }

  criarFormulario(novoFormulario?: CriancaModel){
    this.formulario = this.formBuilder.group({
      id:[novoFormulario?.id],
      nome: [novoFormulario?.nome],
      apelido: [novoFormulario?.apelido],
      responsavel: [novoFormulario?.responsavel],
      telefone: [novoFormulario?.telefone],
      dataNascimento: [novoFormulario?.dataNascimento],
      numeroTenis: [novoFormulario?.numeroTenis],
      posicao: [novoFormulario?.posicao],
      posicaoSecundaria: [novoFormulario?.posicaoSecundaria],
      categoria: [novoFormulario?.categoria]
    })
  }

  abrirModalCrianca(){
    this.modalFormularioCrianca.open()
  }

  fecharModalCrianca(){
    this.formulario.reset()
    this.modalFormularioCrianca.close()
  }

  salvar() {
    const formData = this.formulario.getRawValue();
    let data = this.formulario.get('dataNascimento')?.value
    const dataFormatada = moment(data).format('DD/MM/YYYY')
    formData.dataNascimento = dataFormatada;
    console.log('FORM', formData)
    if (!this.formulario.errors) {
      this.criancaApiService.inserirCrianca(formData).subscribe({
        next: (response: any) => {
          this.poNotification.success('Salvo com sucesso')
        },
        complete: () => {
          this.fecharModalCrianca();
        }
      });
    }
  }
}
