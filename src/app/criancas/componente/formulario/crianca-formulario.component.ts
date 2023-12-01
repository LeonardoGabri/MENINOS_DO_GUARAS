import { CriancaComponent } from './../../crianca.component';
import { Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { CriancaModel, INITIAL_CRIANCA } from '../../modelo/crianca.model';
import { PoComboOption, PoModalAction, PoModalComponent, PoNotificationService } from '@po-ui/ng-components';
import { CriancaApiService } from '../../service/crianca.service';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-crianca-formulario',
  templateUrl: './crianca-formulario.component.html'
})
export class CriancaFormularioComponent implements OnInit{
  formulario!: FormGroup
  somenteLeitura= false

  @Output() eventoAtualizarLista = new EventEmitter(true)

  @ViewChild('modalFormularioCrianca', {static: true})
  modalFormularioCrianca!: PoModalComponent

  public posicoes: PoComboOption[] = [
    {
      label: 'Goleiro',
      value: 'GOLEIRO'
    },
    {
      label: 'Pivô',
      value: 'PIVO'
    },
    {
      label: 'Ala',
      value: 'ALA'
    },
    {
      label: 'Fixo',
      value: 'FIXO'
    }
  ]

  public categorias: PoComboOption[] = [
    {
      label: 'Sub-6 ao Sub-10',
      value: '6_10'
    },
    {
      label: 'Sub-11 ao Sub-14',
      value: '11_14'
    },
    {
      label: 'Sub-15 e Sub-16',
      value: '15_16'
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
    private poNotification: PoNotificationService,
    private datePipe: DatePipe
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
      numero_registro: [novoFormulario?.numero_registro],
      nome: [novoFormulario?.nome],
      apelido: [novoFormulario?.apelido],
      responsavel: [novoFormulario?.responsavel],
      telefone: [novoFormulario?.telefone],
      data_nascimento: [novoFormulario?.data_nascimento],
      numero_tenis: [novoFormulario?.numero_tenis],
      posicao: [novoFormulario?.posicao],
      posicao_secundaria: [novoFormulario?.posicao_secundaria],
      categoria: [novoFormulario?.categoria],
      tamanho_camiseta: [novoFormulario?.tamanho_camiseta],
      tamanho_calca:[novoFormulario?.tamanho_calca],
    })
  }

  abrirModalCrianca(crianca?: CriancaModel){
    this.modalFormularioCrianca.open()

    if(crianca){
      this.somenteLeitura = true
      let dataFormatada = this.datePipe.transform(crianca.data_nascimento, 'dd/MM/yyyy')
      console.log('DATA FORMATADA', moment(crianca.data_nascimento).format('DD/MM/YYYY'))
      this.formulario.patchValue(crianca)
      this.formulario.get('data_nascimento')?.setValue(moment(crianca.data_nascimento).format('DD/MM/YYYY'))
    }else{
      this.somenteLeitura = false
      this.formulario.patchValue(INITIAL_CRIANCA())
    }

  }

  fecharModalCrianca(){
    this.formulario.reset()
    this.modalFormularioCrianca.close()
  }

  salvar() {
    let id = this.formulario.get('id')?.value
    const formData = this.formulario.getRawValue();
    let data = this.formulario.get('data_nascimento')?.value
    const dataFormatada = moment(data).format('DD/MM/YYYY')
    formData.data_nascimento = dataFormatada;
    console.log('TIPO', typeof this.formulario.get('data_nascimento')?.value)

    let metodo = id ? this.criancaApiService.editarCrianca(id, formData) : this.criancaApiService.inserirCrianca(formData)
    if (!this.formulario.errors) {
        metodo.subscribe({
          next: (response: any) => {
            this.poNotification.success('Salvo com sucesso')
          },
          complete: () => {
            this.fecharModalCrianca();
            this.eventoAtualizarLista.emit(true)
          }
        });
    }
  }
}