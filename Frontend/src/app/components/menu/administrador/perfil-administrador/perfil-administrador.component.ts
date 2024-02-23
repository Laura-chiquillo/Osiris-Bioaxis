import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
;
@Component({
  selector: 'app-perfil-administrador',
  templateUrl: './perfil-administrador.component.html',
  styleUrls: ['./perfil-administrador.component.css'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule ,CommonModule],
})
export class PerfilAdministradorComponent {

  imagenURL: string = 'https://i.pinimg.com/originals/67/32/52/673252bd4db4eff03c2a07e5c4d60692.jpg'; // URL de tu imagen

  // Asignando la URL de la imagen a la variable urlDeLaImagen
  urlDeLaImagen: string = this.imagenURL;

  
  // activar y inactivar input
  
  inputDeshabilitado: boolean = true;


  activarInput() {
    this.inputDeshabilitado = false; // Activar el input
  }

  desactivarInput() {
    this.inputDeshabilitado = true; // Desactivar el input
  }

}
