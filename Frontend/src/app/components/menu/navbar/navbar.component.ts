import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Investigador } from '../modelo/investigador';
import { InvestigadorService } from '../services/registroInvestigador'; // Ajusta la ruta según tu estructura de archivos


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  hide = true;

  public registroForm: FormGroup;
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  typedocument: string[] = ['CC', 'TI', 'CE', 'RC', 'PA'];

  constructor(private router: Router, private InvestigadorService: InvestigadorService, private formBuilder: FormBuilder) {
    this.registroForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      tipodocumento: ['', [Validators.required]],
      numerodocumento: ['', [Validators.required]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
      confirmarContrasena: ['', [Validators.required]],
    });
  }
  

  get nombre() {
    return this.registroForm.get('nombre');
  }
  get apellidos() {
    return this.registroForm.get('apellidos');
  }
  get correo() {
    return this.registroForm.get('correo');
  }
  get contrasena() {
    return this.registroForm.get('contrasena');
  }
  get tipodocumento() {
    return this.registroForm.get('tipodocumento');
  }
  get numerodocumento() {
    return this.registroForm.get('numerodocumento');
  }

  createForm() {
    return new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      tipodocumento: new FormControl('', [Validators.required]),
      numerodocumento: new FormControl('', [Validators.required]),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  changeGender(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target && this.tipodocumento) {
      this.tipodocumento.setValue(target.value, {
        onlySelf: true,
      });
    }
  }
  
  onResetForm(): void {
    this.registroForm.reset();
  }

  onSaveForm(): void {
    console.log(this.registroForm.value);
  } 

  guardarUsuario() {
    if (this.registroForm.valid) {
      if (this.registroForm.valid) {
        const contrasena = this.contrasena?.value;
        const confirmarContrasena = this.registroForm.get('confirmarContrasena')?.value;
    
        if (contrasena !== confirmarContrasena) {
          alert('Las contraseñas no coinciden. Por favor, verifica.');
          return;
        }
      const investigador: Investigador = {
        nombre: this.nombre?.value,
        apellidos: this.apellidos?.value,
        correo: this.correo?.value,
        tipodocumento: this.tipodocumento?.value,
        contrasena: this.contrasena?.value,
        numerodocumento: this.numerodocumento?.value,
        horasestricto: 0, // Valor predeterminado o deja en blanco según necesites
        horasformacion: 0, // Valor predeterminado o deja en blanco según necesites
        unidadAcademica: "NA", // Valor predeterminado o deja en blanco según necesites
        escalofonodocente: "NA", // Valor predeterminado o deja en blanco según necesites
        rolinvestigador: "Investigador", // Valor predeterminado o deja en blanco según necesites
        lineainvestigacion: "NA", // Valor predeterminado o deja en blanco según necesites
        ies: "NA", // Valor predeterminado o deja en blanco según necesites
        tipPosgrado: 1, // Valor predeterminado o deja en blanco según necesites
        tipPregrado: 1, // Valor predeterminado o deja en blanco según necesites
        grupoinvestigacion: 1, // Valor predeterminado o deja en blanco según necesites
        ubicacion: 1, // Valor predeterminado o deja en blanco según necesites
        imagen: 1, // Valor predeterminado o deja en blanco según necesites
      };
      
      this.InvestigadorService.registrarInvestigador(investigador).subscribe(
        (resp) => {
          console.log('Se ha registrado el usuario exitosamente:', resp);
          alert('Se ha registrado el usuario exitosamente.');
          this.registroForm.reset();
        },
        (error) => {
          console.error('Error al registrar el usuario:', error);
          alert('Error al registrar el usuario. Por favor, inténtalo de nuevo.');
        }
      );
    } else {
      alert('Por favor, completa el formulario correctamente.');
    }
  }
  }
}
