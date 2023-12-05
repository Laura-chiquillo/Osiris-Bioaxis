import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '../shared/shared.module';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    MenuComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    SharedModule,
    MatCardModule,
    MatTabsModule,
    MatExpansionModule
  ]
})
export class MenuModule {
  panelOpenState = false;
}
