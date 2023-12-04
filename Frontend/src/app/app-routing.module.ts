import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvesigadoresComponent } from './components/menu/investigadores/invesigadores.component';

const routes: Routes = [
  {path:'', redirectTo: 'menu', pathMatch: 'full'},
  {path:'menu', loadChildren: () => import('./components/menu/menu.module').then(x => x.MenuModule)} ,
  {path:'investigadores',component:InvesigadoresComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
