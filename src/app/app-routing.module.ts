import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../app/inicio/modulo/inicio.module').then((m) => m.InicioModule),
    pathMatch: 'full'
  },
  {
    path: 'crianca',
    loadChildren: () =>
      import('../app/criancas/modulo/crianca.module').then((m) => m.CriancaModule),
    pathMatch: 'full'
  },
  {path: '', pathMatch: 'full', redirectTo: '' },
  {path: '**', redirectTo: '' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
