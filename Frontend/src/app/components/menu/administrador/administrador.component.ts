import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule],
})
export class AdministradorComponent {
  mostrarPerfil: boolean = false;

   togglePerfil() {
    this.mostrarPerfil = !this.mostrarPerfil;
  }
}

