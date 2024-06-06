import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AutenticacionService } from '../../services/autenticacion';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UsuarioSesion } from '../../modelo/usuario';
import { InvestigadorService } from '../../services/registroInvestigador';
import Swal from 'sweetalert2';
import { DialogoCargaEstudiosComponent } from './dialogo-carga-estudios/dialogo-carga-estudios.component';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-perfil-investigador',
  templateUrl: './perfil-investigador.component.html',
  styleUrls: ['./perfil-investigador.component.css'],
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
    MatNativeDateModule,
    MatIconModule
  ],
})
export class PerfilInvestigadorComponent implements OnInit {
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
  imagenURL: string = 'https://ps.w.org/simple-user-avatar/assets/icon-256x256.png';
  urlDeLaImagen: string = this.imagenURL;
  usuarioSesion!: UsuarioSesion;

  constructor(
    private autenticacionService: AutenticacionService, 
    private investigadorService: InvestigadorService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) { 
    this.firstFormGroup = this.formBuilder.group({
      numerodocumento: [{value: '', disabled: true}, Validators.required],
      nombre: [{value: '', disabled: this.inputDeshabilitado}, Validators.required],
      apellidos: [{value: '', disabled: this.inputDeshabilitado}, Validators.required],
      correo: [{value: '', disabled: this.inputDeshabilitado}, Validators.required],
      tipodocumento: [{value: '', disabled: this.inputDeshabilitado}, Validators.required],
      escalofonodocente: [{value: '', disabled: this.inputDeshabilitado}, Validators.required],
      horariosestrictos: [{value: '', disabled: this.inputDeshabilitado}, Validators.required],
      horariosformacion: [{value: '', disabled: this.inputDeshabilitado}, Validators.required],
      lineainvestigacion: [{value: '', disabled: this.inputDeshabilitado}, Validators.required],
      unidadacademica: [{value: '', disabled: this.inputDeshabilitado}, Validators.required]
    });
  }

  ngOnInit(): void {
    this.obtenerDatosUsuarioSesion();
    this.obtenerPregrado();
    this.obtenerPosgrado();
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
            horariosestrictos: this.userData?.horasestricto || '',
            horariosformacion: this.userData?.horasformacion || '',
            lineainvestigacion: this.userData?.lineainvestigacion || '',
            unidadacademica: this.userData?.unidadAcademica || ''
          });
  
          if (this.inputDeshabilitado) {
            this.firstFormGroup.disable();
          } else {
            this.firstFormGroup.enable();
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
  


  obtenerDatosUsuarioSesion(){
    this.usuarioSesion = this.autenticacionService.obtenerDatosUsuario();
  }

  pregradoData: any[] = []; 
  posgradoData: any[] = []; 
  obtenerPregrado(){
    this.investigadorService.obtenerPregrado().subscribe(
      (data) => {
        this.pregradoData = data.filter((x: { Investigador_id: string; }) => x.Investigador_id == this.usuarioSesion.numerodocumento);
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }
  obtenerPosgrado(){
    this.investigadorService.obtenerPosgrado().subscribe(
      (data) => {
        this.posgradoData = data.filter((x: { Investigador_id: string; }) => x.Investigador_id == this.usuarioSesion.numerodocumento);
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
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
  get horariosestrictos() {
    return this.firstFormGroup.get('horariosestrictos');
  }
  get horariosformacion() {
    return this.firstFormGroup.get('horariosformacion');
  }
  get lineainvestigacion() {
    return this.firstFormGroup.get('lineainvestigacion');
  }
  get unidadacademica() {
    return this.firstFormGroup.get('unidadacademica');
  }

  activarInput() {
    this.inputDeshabilitado = false;
    this.ngOnInit();
  }

  desactivarInput() {
    this.inputDeshabilitado = true;
    this.ngOnInit();
  }

  openDialogoDetalle(tipo:string): void {
    const dialogRef = this.dialog.open(DialogoCargaEstudiosComponent, {
      data: {
        title: 'Nuevo '+tipo,
        type:tipo,
        numerodocumento: this.usuarioSesion.numerodocumento,
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        Swal.fire({
          title: 'Registro Exitoso !!!',
          text: 'Se ha registrado el registro de estudio',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        console.log('result',result);
      } 
    });
  }

  guardarDatos() {
    if (this.firstFormGroup.valid) {
      const tramiteGeneral = this.firstFormGroup.value;
      tramiteGeneral.numerodocumento = this.usuarioSesion.numerodocumento;
      console.log(' guardarDatos => ',tramiteGeneral);
      this.investigadorService.actualizarInvestigador(tramiteGeneral).subscribe(
        (resp) => {
          Swal.fire({
            title: 'Registro Exitoso !!!',
            text: 'Se ha editado el perfil',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.inputDeshabilitado = true;
          this.ngOnInit();
        },
        (error) => {
          console.error('Error al notificar:', error);
        }
      );
    }
  }
}
