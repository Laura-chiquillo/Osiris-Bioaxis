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
import { SearchService } from '../../services/search.service';
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
  filteredInvestigators!: Observable<{ nombre: string; apellidos: string; }[]>;
  activeInvestigators: { nombre: string, apellidos: string }[] = [];
  selectedInvestigators: string[] = [];

  @ViewChild('investigatorInput') investigatorInput!: ElementRef<HTMLInputElement>;

  constructor( private announcer: LiveAnnouncer,private http: HttpClient,private _formBuilder: FormBuilder,private cdr: ChangeDetectorRef, private investigatorService: InvestigadorService, private searchService: SearchService) {
      
  }

  ngOnInit(): void {
    this.selectedInvestigators = []; // Asegúrate de que selectedInvestigators esté vacío al principio
    this.activeInvestigators = []; // Inicializa activeInvestigators como un array vacío
    
    this.investigatorService.getUsuarios().subscribe(data => {
      this.activeInvestigators = data.map(investigador => ({
        nombre: investigador.nombre,
        apellidos: investigador.apellidos
      }));
      this.filteredInvestigators = this.investigatorCtrl.valueChanges.pipe(
        startWith(''),
        map((value: string | null) => value ? this._filter(value) : this.activeInvestigators.slice())
      );
    });
    this.dataSource.paginator = this.paginator;
    this.searchService.getSearchQuery().subscribe(query => {
      this.dataSource.filter = query.trim().toLowerCase();
    });
  }
  

  private _filter(value: string): { nombre: string, apellidos: string }[] {
    const filterValue = value.toLowerCase();
  
    if (!filterValue) {
      return this.activeInvestigators.slice(); // Devuelve una copia de todos los investigadores activos si no hay entrada de usuario
    }
  
    // Filtrar investigadores activos que no estén en la lista de investigadores seleccionados
    const filteredActiveInvestigators = this.activeInvestigators.filter(investigador =>
      `${investigador.nombre.toLowerCase()} ${investigador.apellidos.toLowerCase()}`.includes(filterValue)
    );
  
    // Filtrar investigadores seleccionables que no estén ya seleccionados
    return filteredActiveInvestigators.filter(investigador =>
      !this.selectedInvestigators.includes(`${investigador.nombre} ${investigador.apellidos}`)
    );
  }
  

  trackByFn(index: number, item: { nombre: string, apellidos: string }): number {
    return index;
  }

  remove(investigador: { nombre: string, apellidos: string }): void {
    const index = this.activeInvestigators.indexOf(investigador);
  
    if (index >= 0) {
      this.activeInvestigators.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
  
    if (value) {
      const [nombre, apellidos] = value.split(' ');
      this.activeInvestigators.push({ nombre, apellidos });
    }
  
    event.chipInput!.clear();
    this.investigatorCtrl.setValue(null);
  }
  
  selected(event: MatAutocompleteSelectedEvent): void {
    const [nombre, apellidos] = event.option.viewValue.split(' ');
  
    // Verificar si el investigador ya está en activeInvestigators
    const investigadorExistente = this.activeInvestigators.find(investigador =>
      investigador.nombre === nombre && investigador.apellidos === apellidos
    );
  
    if (!investigadorExistente) {
      // Agregar el investigador seleccionado solo si no está en la lista
      this.activeInvestigators.push({ nombre, apellidos });
      this.selectedInvestigators.push(`${nombre} ${apellidos}`);
    }
  
    this.investigatorInput.nativeElement.value = '';
    this.investigatorCtrl.setValue(null);
  }
  
  
  displayInvestigator(investigator: any): string {
    return investigator && investigator.nombre && investigator.apellidos ? `${investigator.nombre} ${investigator.apellidos}` : '';
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
  value: number = 0;
  value2: number = 0;
  value3: number = 0;

  onValueChange(event: any) {
    console.log("Nuevo valor para value:", event.target.value);
    this.value = event.target.value;
  }
  
  onValue2Change(event: any) {
    console.log("Nuevo valor para value2:", event.target.value);
    this.value2 = event.target.value;
  }
  
  onValue3Change(event: any) {
    console.log("Nuevo valor para value3:", event.target.value);
    this.value3 = event.target.value;
  }
  
  

  disabled = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;

  disabled2 = false;
  max2 = 100;
  min2 = 0;
  showTicks2 = false;
  step2 = 1;
  thumbLabel2 = false;

  disabled3 = false;
  max3 = 100;
  min3 = 0;
  showTicks3 = false;
  step3 = 1;
  thumbLabel3 = false;


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