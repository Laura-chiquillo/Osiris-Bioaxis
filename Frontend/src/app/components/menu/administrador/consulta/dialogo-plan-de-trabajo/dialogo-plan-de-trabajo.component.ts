import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgFor } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ConfiguracionPlanTrabajo } from '../../../modelo/planDeTrabajo';
import { ProyectoyproductoService } from '../../../services/proyectoyproducto';
import { MatNativeDateModule, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD', // Formato para parsear la fecha
  },
  display: {
    dateInput: 'YYYY-MM-DD', // Formato para mostrar la fecha
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'YYYY-MM-DD',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-dialogo-plan-de-trabajo',
  standalone: true,
  templateUrl: './dialogo-plan-de-trabajo.component.html',
  styleUrls: ['./dialogo-plan-de-trabajo.component.css'],
  imports: [
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgFor,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }, // o el idioma preferido
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ],
})
export class DialogoPlanDeTrabajoComponent implements OnInit {

  public registroForm: FormGroup;
  buttonTitle!: string;
  title!: string;
  hide = true;
  fechaMinima: Date;
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: { title: string, buttonTitle: string },
    private formBuilder: FormBuilder,
    private ProyectoyproductoService: ProyectoyproductoService,
    private readonly dialogRef: MatDialogRef<DialogoPlanDeTrabajoComponent>
  ) { 
    this.registroForm = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
    });
    this.fechaMinima = new Date();
  }

  async ngOnInit() {
    this.title = this.dialogData.title;
    this.buttonTitle = this.dialogData.buttonTitle;
  }

  get fecha() {
    return this.registroForm.get('fecha');
  }

  get titulo() {
    return this.registroForm.get('titulo');
  }

  get estado() {
    return this.registroForm.get('estado');
  }

  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 20, 0, 1);
  readonly maxDate = new Date(this._currentYear + 1, 11, 31);

  private formatDateToISO(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  guardarConfiguracion() {
    if (this.registroForm.valid) {
      console.log('Formulario válido. Procediendo a guardar...');
      const fecha = this.fecha?.value ? this.formatDateToISO(new Date(this.fecha?.value)) : '';
      const configuracion: ConfiguracionPlanTrabajo = {
        titulo: this.titulo?.value,
        fecha: fecha,
        estado: "true"
      };
      this.ProyectoyproductoService.creargetconfigplanTrabajo(configuracion).subscribe(
        (resp) => {
          console.log('Se ha registrado el plan de trabajo exitosamente:', resp);
          this.registroForm.reset();
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Error al registrar el plan de trabajo:', error);
        }
      );
    } else {
      console.error('Formulario inválido. Verifica los campos.');
    }
  }
}
