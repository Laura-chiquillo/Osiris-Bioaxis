import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; // Asegúrate de importar MatPaginator desde '@angular/material/paginator'
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';

import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { InvestigadorService } from '../../services/registroInvestigador';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
  standalone: true,
  imports: [MatTabsModule, MatTableModule, MatPaginatorModule, MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    MatSliderModule, MatRadioModule, CommonModule, HttpClientModule],
  })
  
  export class ProyectosComponent implements OnInit{
      
  //mostrar los coinvestigadores que hay
  separatorKeysCodes: number[] = [13, 188];
  investigatorCtrl = new FormControl('');
  filteredInvestigators!: Observable<{ nombre: string; apellido: string; }[]>;
  activeInvestigators: { nombre: string, apellido: string }[] = [];

  @ViewChild('investigatorInput') investigatorInput!: ElementRef<HTMLInputElement>;

  constructor( private announcer: LiveAnnouncer,private http: HttpClient,private _formBuilder: FormBuilder,private cdr: ChangeDetectorRef, private investigatorService: InvestigadorService) {
      
  }

  ngOnInit(): void {
    this.investigatorService.getUsuarios().subscribe(data => {
      // Aquí, en lugar de sobrescribir activeInvestigators, debes mapear los datos a un objeto con nombre y apellido
      this.activeInvestigators = data.map(investigador => ({
        nombre: investigador.nombre,
        apellido: investigador.apellido
      }));
      this.filteredInvestigators = this.investigatorCtrl.valueChanges.pipe(
        startWith(''),
        map((value: string | null) => value ? this._filter(value) : this.activeInvestigators.slice())
      );
    });
  }

  private _filter(value: string): { nombre: string, apellido: string }[] {
    const filterValue = value.toLowerCase();

    if (!filterValue) {
      return this.activeInvestigators.slice(); // Devuelve una copia de todos los investigadores activos si no hay entrada de usuario
    }

    return this.activeInvestigators.filter(investigador =>
      `${investigador.nombre.toLowerCase()} ${investigador.apellido.toLowerCase()}`.includes(filterValue)
    );
  }

  trackByFn(index: number, item: { nombre: string, apellido: string }): number {
    return index;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      const [nombre, apellido] = value.split(' ');
      this.activeInvestigators.push({ nombre, apellido });
    }

    event.chipInput!.clear();
    this.investigatorCtrl.setValue(null);
  }

  remove(investigador: { nombre: string, apellido: string }): void {
    const index = this.activeInvestigators.indexOf(investigador);

    if (index >= 0) {
      this.activeInvestigators.splice(index, 1);

      // this.announcer.announce(`Removed ${investigador.nombre} ${investigador.apellido}`); // Utiliza el anunciador aquí si es necesario
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const [nombre, apellido] = event.option.viewValue.split(' ');
    this.activeInvestigators.push({ nombre, apellido });
    this.investigatorInput.nativeElement.value = '';
    this.investigatorCtrl.setValue(null);
  }
  displayInvestigator(investigator: any): string {
    return investigator && investigator.nombre && investigator.apellido ? `${investigator.nombre} ${investigator.apellido}` : '';
  }
  
  // crear nuevo proyecto

  //subir archivo proyecto
  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  uploadFile() {
    if (!this.selectedFile) {
      console.error('No se ha seleccionado ningún archivo.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post('URL_DEL_BACKEND_PARA_SUBIR_ARCHIVO', formData)
      .subscribe(
        (response) => {
          console.log('Archivo subido con éxito!', response);
          // Puedes hacer lo que desees con la respuesta del servidor aquí
        },
        (error) => {
          console.error('Error al subir el archivo:', error);
        }
      );
  }

  //mostrar productos en nuevo proyecto
  mostrarInputs: boolean = false;

  onSelectionChange(event: any) {
    this.mostrarInputs = event.value === '1';
  }


  
  
  //CREAR PROYECTO
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: [''],
  });
  isEditable = true;


  //BARRAS DE PORCENTAJE
  disabled = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;

  disabled2 = false;
  max2 = 100;
  min2 = 0;
  showTicks2 = false;
  step2 = 1;
  thumbLabel2 = false;
  value2 = 0;

  disabled3 = false;
  max3 = 100;
  min3 = 0;
  showTicks3 = false;
  step3 = 1;
  thumbLabel3 = false;
  value3 = 0;


  // TABLA
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];