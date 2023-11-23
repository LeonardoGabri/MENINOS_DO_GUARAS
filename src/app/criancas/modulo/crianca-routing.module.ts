import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CriancaListaComponent } from "../componente/lista/crianca-lista.component";

const routes: Routes = [
  {
    path: '',
    component: CriancaListaComponent
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CriancaRoutingModule{

}
