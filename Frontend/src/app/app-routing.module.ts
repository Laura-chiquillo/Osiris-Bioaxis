import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradorComponent } from './components/menu/administrador/administrador.component';
import { ControlComponent } from './components/menu/administrador/control/control.component';
import { EstadosComponent } from './components/menu/administrador/estados/estados.component';
import { PerfilAdministradorComponent } from './components/menu/administrador/perfil-administrador/perfil-administrador.component';
import { ConsultasComponent } from './components/menu/investigadores/consultas/consultas.component';
import { InvesigadoresComponent } from './components/menu/investigadores/invesigadores.component';
import { ParticipacionComponent } from './components/menu/investigadores/participacion/participacion.component';
import { PerfilInvestigadorComponent } from './components/menu/investigadores/perfil-investigador/perfil-investigador.component';
import { ProyectosComponent } from './components/menu/investigadores/proyectos/proyectos.component';

const routes: Routes = [
  {path:'', redirectTo: 'menu', pathMatch: 'full'},
  {path:'menu', loadChildren: () => import('./components/menu/menu.module').then(x => x.MenuModule)} ,
  {path:'investigadores',component:InvesigadoresComponent },
  {path:'investigadores/perfil',component:PerfilInvestigadorComponent},
  {path:'investigadores/proyectos',component:ProyectosComponent},
  {path:'investigadores/participacion',component:ParticipacionComponent},
  {path:'investigadores/consultas',component:ConsultasComponent},
  {path:'administrador',component:AdministradorComponent},
  {path:'administrador/control',component:ControlComponent},
  {path:'administrador/estados',component:EstadosComponent},
  {path:'administrador/perfil',component:PerfilAdministradorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
