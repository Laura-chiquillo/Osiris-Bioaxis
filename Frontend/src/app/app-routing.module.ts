import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/menu/login/login.component';

const routes: Routes = [
  {path:'', redirectTo: 'menu', pathMatch: 'full'},
  {path:'menu', loadChildren: () => import('./components/menu/menu.module').then(x => x.MenuModule)} ,
  {path:'**', redirectTo: 'menu', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
