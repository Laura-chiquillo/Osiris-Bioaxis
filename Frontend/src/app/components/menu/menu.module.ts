import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MenuComponent } from './menu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InvesigadoresComponent } from './investigadores/invesigadores.component';
import { InformacionGrupoComponent } from './informacion-grupo/informacion-grupo.component';

@NgModule({
  declarations: [
    MenuComponent,
    NavbarComponent,
    InvesigadoresComponent,
    InformacionGrupoComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    SharedModule
  ]
})
export class MenuModule { }
