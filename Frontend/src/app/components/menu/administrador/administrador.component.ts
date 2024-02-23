import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PerfilAdministradorComponent } from "./perfil-administrador/perfil-administrador.component";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-administrador',
    templateUrl: './administrador.component.html',
    styleUrls: ['./administrador.component.css'],
    standalone: true,
    imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, PerfilAdministradorComponent,RouterModule]
})

export class AdministradorComponent {

}

