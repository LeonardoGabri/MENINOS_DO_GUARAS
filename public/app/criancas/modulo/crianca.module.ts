import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PoModule } from "@po-ui/ng-components";
import { HttpClientModule } from "@angular/common/http";
import { CriancaComponent } from "../crianca.component";
import { CriancaRoutingModule } from "./crianca-routing.module";
import { CriancaListaComponent } from "../componente/lista/crianca-lista.component";
import { CriancaFormularioComponent } from "../componente/formulario/crianca-formulario.component";

@NgModule({
  declarations: [CriancaComponent, CriancaFormularioComponent, CriancaListaComponent],
  imports: [HttpClientModule, CommonModule, PoModule, ReactiveFormsModule, FormsModule, CriancaRoutingModule],
  exports: []
})
export class CriancaModule{}
