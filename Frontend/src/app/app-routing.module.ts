import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvesigadoresComponent } from './components/menu/investigadores/invesigadores.component';
import { PerfilInvestigadorComponent } from './components/menu/investigadores/perfil-investigador/perfil-investigador.component';
import { ProyectosComponent } from './components/menu/investigadores/proyectos/proyectos.component';

const routes: Routes = [
  {path:'', redirectTo: 'menu', pathMatch: 'full'},
  {path:'menu', loadChildren: () => import('./components/menu/menu.module').then(x => x.MenuModule)} ,
  {path:'investigadores',component:InvesigadoresComponent },
  {path:'investigadores/perfil',component:PerfilInvestigadorComponent},
  {path:'investigadores/proyectos',component:ProyectosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
