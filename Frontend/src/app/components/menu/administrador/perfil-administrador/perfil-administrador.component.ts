import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { AutenticacionService } from '../../services/autenticacion';
import { InvestigadorService} from "../../services/registroInvestigador";
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UsuarioSesion } from '../../modelo/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil-administrador',
  templateUrl: './perfil-administrador.component.html',
  styleUrls: ['./perfil-administrador.component.css'],
  standalone: true,
  imports: [
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatSelectModule,
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
})
export class PerfilAdministradorComponent  implements OnInit {
  userData: any;
  firstFormGroup: any;
  tipodpcumento: string[] = [
    'CC',
    'TI',
    'CE',
    'RC',
    'PA'
  ];
  inputDeshabilitado: boolean = true;
  imagenUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  usuarioSesion!: UsuarioSesion;

  constructor(
    private autenticacionService: AutenticacionService, 
    private investigadorService: InvestigadorService,
    private formBuilder: FormBuilder,
  ) { 
    this.firstFormGroup = this.formBuilder.group({
      numerodocumento: [{ value: '', disabled: true }, Validators.required],
      nombre: [{ value: '', disabled: this.inputDeshabilitado }, Validators.required],
      apellidos: [{ value: '', disabled: this.inputDeshabilitado }, Validators.required],
      correo: [{ value: '', disabled: this.inputDeshabilitado }, Validators.required],
      tipodocumento: [{ value: '', disabled: this.inputDeshabilitado }, Validators.required],
      escalofonodocente: [{ value: '', disabled: this.inputDeshabilitado }, Validators.required],
      horasestricto: [{ value: '', disabled: this.inputDeshabilitado }, Validators.required],
      horasformacion: [{ value: '', disabled: this.inputDeshabilitado }, Validators.required],
      lineainvestigacion: [{ value: '', disabled: this.inputDeshabilitado }, Validators.required],
      unidadAcademica: [{ value: '', disabled: this.inputDeshabilitado }, Validators.required],
      imagen: [{ value: '', disabled: this.inputDeshabilitado }]
    });

  }

 ngOnInit(): void {
  this.obtenerDatosUsuarioSesion();
  this.investigadorService.getUsuarioDetail(this.usuarioSesion.numerodocumento).subscribe(
    (data) => {
      this.userData = data;
      if (this.userData) {
        this.firstFormGroup.setValue({
          numerodocumento: this.userData?.numerodocumento || '',
          nombre: this.userData.nombre || '',
          apellidos: this.userData.apellidos || '',
          correo: this.userData?.correo || '',
          tipodocumento: this.userData?.tipodocumento || '',
          escalofonodocente: this.userData?.escalofonodocente || '',
          horasestricto: this.userData?.horasestricto || '0',
          horasformacion: this.userData?.horasformacion || '0',
          lineainvestigacion: this.userData?.lineainvestigacion || '',
          unidadAcademica: this.userData?.unidadAcademica || '',
          imagen: this.userData.imagen?.imagen || ''
        });
        this.imagenUrl = this.userData.imagen?.imagen;

        if (this.inputDeshabilitado) {
          this.firstFormGroup.disable();
        } else {
          this.firstFormGroup.enable();
          this.firstFormGroup.controls['numerodocumento'].disable();
        }
      } else {
        console.error('userData es undefined o null');
      }
    },
    (error) => {
      console.error('Error al obtener usuarios:', error);
    }
  );
}

onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    this.selectedFile = file; // Asigna el archivo seleccionado a selectedFile
    const reader = new FileReader();
    reader.onload = () => {
      this.imagenUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
triggerFileInput(): void {
  const fileInput = document.getElementById('fileInput') as HTMLInputElement;
  fileInput.click();
}
  obtenerDatosUsuarioSesion(){
    this.usuarioSesion = this.autenticacionService.obtenerDatosUsuario();
  }

  get numerodocumento() {
    return this.firstFormGroup.get('numerodocumento');
  }
  get nombre() {
    return this.firstFormGroup.get('nombre');
  }
  get apellidos() {
    return this.firstFormGroup.get('apellidos');
  }
  get correo() {
    return this.firstFormGroup.get('correo');
  }
  get tipodocumento() {
    return this.firstFormGroup.get('tipodocumento');
  }
  get escalofonodocente() {
    return this.firstFormGroup.get('escalofonodocente');
  }
  get horasestricto() {
    return this.firstFormGroup.get('horasestricto');
  }
  get horasformacion() {
    return this.firstFormGroup.get('horasformacion');
  }
  get lineainvestigacion() {
    return this.firstFormGroup.get('lineainvestigacion');
  }
  get unidadAcademica() {
    return this.firstFormGroup.get('unidadAcademica');
  }

  activarInput() {
    this.inputDeshabilitado = false;
    this.ngOnInit();
  }

  desactivarInput() {
    this.inputDeshabilitado = true;
    this.ngOnInit();
  }

  guardarDatos() {
    if (this.firstFormGroup.valid) {
      const tramiteGeneral = this.firstFormGroup.value;
      tramiteGeneral.numerodocumento = this.usuarioSesion.numerodocumento;
  
      if (this.selectedFile) {
        tramiteGeneral.imagen = this.selectedFile;
      }
      console.log(' guardarDatos => ',tramiteGeneral);
      this.investigadorService.actualizarInvestigador(tramiteGeneral).subscribe(
        () => {
          Swal.fire({
            title: 'Registro Exitoso !!!',
            text: 'Se ha editado el perfil',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.inputDeshabilitado = true;
          this.firstFormGroup.disable();
        },
        (error) => {
          console.error('Error al actualizar el investigador:', error);
        }
      );
    }
  }
}
