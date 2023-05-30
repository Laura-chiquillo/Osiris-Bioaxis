import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu.component';
import { LoginComponent } from './login/login.component';
import { InvesigadoresComponent } from './investigadores/invesigadores.component';
import { InformacionGrupoComponent } from './informacion-grupo/informacion-grupo.component';

const routes: Routes = [
  {path:'', component: MenuComponent, children:
  [{path:'investigadores',component:InvesigadoresComponent },
   {path:'informaciongrupo',component:InformacionGrupoComponent },
   {path:'login' ,component:LoginComponent },
]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
