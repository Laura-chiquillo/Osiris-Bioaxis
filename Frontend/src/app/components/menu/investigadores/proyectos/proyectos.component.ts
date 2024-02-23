import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; // Asegúrate de importar MatPaginator desde '@angular/material/paginator'
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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

import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Investigador } from '../../modelo/investigador';
import { Coinvestigador, Proyecto } from '../../modelo/proyectos';
import { ProyectoyproductoService } from '../../services/proyectoyproducto';
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
  filteredInvestigators!: Observable<{ nombre: string; apellidos: string; }[]>;
  activeInvestigators: { nombre: string, apellidos: string }[] = [];
  selectedInvestigators: string[] = [];
  proyecto: Proyecto = {};

  @ViewChild('investigatorInput') investigatorInput!: ElementRef<HTMLInputElement>;
    

    listaProductos: { [key: string]: string[] } = {
      evento: ['fechainicio', 'fechafin', 'numparticinerno', 'numparticexterno','tipoevento'],
      articulo: ['fuente'],
      capitulo: ['nombrepublicacion', 'isbn', 'fecha', 'editorial'],
      libro: ['luegarpublicacion', 'autores', 'isbn', 'fecha', 'editorial'],
      software: ['tiporegistro', 'numero', 'fecha', 'pais'],
      industrial: ['insitutofinanciador', 'fecha', 'pais'],
      reconocimiento: ['nombentidadotorgada', 'fecha'],
      apropiacion: ['fechainicio', 'fechaFin', 'licencia', 'formato', 'medio','nombreEntidad'],
      consultoria: ['nombreEntidad', 'contrato', 'isbn', 'fecha', 'editorial'],
      contenido: ['paginaWeb', 'nombreEntidad'],
      PregFinalizadoyCurso: ['fechaInicio', 'reconocimientos', 'numeroPaginas'],
      Maestria: ['fechaInicio', 'institucion'],
    };
    
    
  constructor(private ProyectoyproductoService:ProyectoyproductoService,private formBuilder: FormBuilder,private http: HttpClient,private cdr: ChangeDetectorRef, private investigatorService: InvestigadorService) {
    this.registroProyecto = this.formBuilder.group({
      codigo: [''],
      fecha: [null, Validators.required],
      titulo: [''],
      investigador: [''],
      unidadAcademica: [''],
      producto: this.formBuilder.group({
        id:[''],
        tituloProducto: [''],
        rolProducto: [''],
        investigador: [''],
        listaProducto: [''],
        cuartilEsperado: [''],
        categoriaMinciencias: [''],
        tipologiaProducto: [''],
        publicacion: [''],
        estudiantes: [''],
        estadoProdIniSemestre: [''],
        porcentanjeAvanFinSemestre: [''],
        observaciones: [''],
        estadoProducto: [''],
        porcentajeComSemestral: [''],
        porcentajeRealMensual: [''],
        fecha: [''],
        origen: [''],
        Soporte: [''],
      }),
      coinvestigadores: [''],
      area: [''],
      porcentajeEjecucionCorte: [''],
      entidadPostulo: [''],
      financiacion: [''],
      grupoInvestigacionPro: [''],
      porcentajeEjecucionFinCorte: [''],
      porcentajeAvance: [''],
      soporte: [''],
      transacciones: [''],
      origen: [''],
      convocatoria: [''],
      ubicacionProyecto: [''],
      estadoProyecto: [''],
      modalidadProyecto: [''],
      nivelRiesgoEtico: [''],
      lineaInvestigacion: [''],
      entregableAdministrativo: this.formBuilder.group({
        titulo: [''],
        nombre: [''],
        calidad: [''],
        entregable: [''],
        pendiente: [''],
        clasificacion: [''],
      }),
    });
  }



  ngOnInit(): void {
    this.selectedInvestigators = []; // Asegúrate de que selectedInvestigators esté vacío al principio
    this.activeInvestigators = []; // Inicializa activeInvestigators como un array vacío
    
    this.investigatorService.getUsuarios().subscribe(data => {
      this.activeInvestigators = data.map(investigador => ({
        nombre: investigador.nombre,
        apellidos: investigador.apellidos,
        numerodocumento: investigador.numerodocumento  // Asegúrate de incluir el número de documento aquí
      }));

      // Agrega un console.log para verificar los datos de los investigadores
      console.log('Datos de los investigadores:', this.activeInvestigators);

      this.filteredInvestigators = this.investigatorCtrl.valueChanges.pipe(
        startWith(''),
        map((value: string | null) => value ? this._filter(value) : this.activeInvestigators.slice())
      );
    });
}
addCoinvestigador(investigador: { nombre: string, apellidos: string, numerodocumento: string }) {
  const newCoinvestigador: Coinvestigador = {
    id: investigador.numerodocumento,
    coinvestigador: `${investigador.nombre}`
  };
  if (!this.proyecto.coinvestigadores) {
    this.proyecto.coinvestigadores = [newCoinvestigador];
  } else {
    this.proyecto.coinvestigadores.push(newCoinvestigador);
  }
}

removeCoinvestigador(investigador: { nombre: string; apellidos: string }) {
  if (this.proyecto.coinvestigadores) {
    this.proyecto.coinvestigadores = this.proyecto.coinvestigadores.filter(c => c.coinvestigador !== `${investigador.nombre} ${investigador.apellidos}`);
  }
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
  
  
  displayInvestigator(investigator: Investigador): string {
    if (investigator && investigator.nombre && investigator.apellidos && investigator.numerodocumento) {
      return `${investigator.nombre} ${investigator.apellidos} - ${investigator.numerodocumento}`;
    } else {
      return '';
    }
  }
  

  
  //subir archivo proyecto
  selectedFileProyecto: File = null!;

  onFileSelected(event: any) {
    this.selectedFileProyecto = event.target.files[0] as File;
  }

//subir archivo producto
  selectedFileProducto: File= null!;

  onFileSelected1(event: any) {
    this.selectedFileProyecto = event.target.files[0] as File;
  }

  //mostrar productos en nuevo proyecto
  mostrarInputs: boolean = false;

  onSelectionChange(event: any) {
    this.mostrarInputs = event.value === '1';
  }


  //seleccionar un tipo de producto de listaproducto
  onSelectionChangeLista(event: any) {
    const tipoProductoSeleccionado = event.value;
    const camposProducto = this.listaProductos[tipoProductoSeleccionado] || [];
  
    // Obtener el FormGroup del producto
    const productoFormGroup = this.registroProyecto.get('producto') as FormGroup;
  
    // Obtener los nombres de los controles actuales
    const controlNames = Object.keys(productoFormGroup.controls);
  
    // Iterar sobre todos los campos posibles del producto
    Object.keys(this.listaProductos).forEach(campo => {
      // Verificar si el campo actual está presente en los campos del producto seleccionado
      if (camposProducto.includes(campo)) {
        // Si está presente, asegúrate de que su control exista y sea válido
        if (!productoFormGroup.get(campo)) {
          productoFormGroup.addControl(campo, new FormControl(''));
        }
      } else {
        // Si el campo no está presente, establecer su valor en "NA" o algún otro valor predeterminado
        productoFormGroup.get(campo)?.setValue('NA');
      }
    });
  }
  
  
  
  
  
  //CREAR PROYECTO
  firstFormGroup = this.formBuilder.group({
    codigo: [''],
      fecha: [null, Validators.required],
      titulo: [''],
      investigador: [''],
      unidadAcademica: [''],
      coinvestigadores: [''],
      area: [''],
      porcentajeEjecucionCorte: [''],
      entidadPostulo: [''],
      financiacion: [''],
      grupoInvestigacionPro: [''],
      porcentajeEjecucionFinCorte: [''],
      porcentajeAvance: [''],
      soporte: [''],
      transacciones: [''],
      origen: [''],
      convocatoria: [''],
      ubicacionProyecto: [''],
      estadoProyecto: [''],
      modalidadProyecto: [''],
      nivelRiesgoEtico: [''],
      lineaInvestigacion: [''],
      entregableAdministrativo: this.formBuilder.group({
        titulo: [''],
        nombre: [''],
        calidad: [''],
        entregable: [''],
        pendiente: [''],
        clasificacion: [''],
      }),
  });
  secondFormGroup = this.formBuilder.group({
    producto: this.formBuilder.group({
      id:[''],
      tituloProducto: [''],
      rolProducto: [''],
      investigador: [''],
      listaProducto: [''],
      cuartilEsperado: [''],
      categoriaMinciencias: [''],
      tipologiaProducto: [''],
      publicacion: [''],
      estudiantes: [''],
      estadoProdIniSemestre: [''],
      porcentanjeAvanFinSemestre: [''],
      observaciones: [''],
      estadoProducto: [''],
      porcentajeComSemestral: [''],
      porcentajeRealMensual: [''],
      fecha: [''],
      origen: [''],
      Soporte: [''],
    }),
  });
  isEditable = true;


  //BARRAS DE PORCENTAJE
  value: number = 0;
  value2: number = 0;
  value3: number = 0;
  
  onValueChange(event: any) {
    console.log("Nuevo valor para value:", event.target.value);
    this.value = event.target.value;
    if (this.porcentajeEjecucionCorte) { // Verificar si porcentajeEjecucionCorte no es null
      this.porcentajeEjecucionCorte.setValue(this.value); // Actualizar el valor del campo porcentajeEjecucionCorte en el formulario
    }
  }
  
  onValue2Change(event: any) {
    console.log("Nuevo valor para value2:", event.target.value);
    this.value2 = event.target.value;
    if (this.porcentajeEjecucionFinCorte) { // Verificar si porcentajeEjecucionFinCorte no es null
      this.porcentajeEjecucionFinCorte.setValue(this.value2); // Actualizar el valor del campo porcentajeEjecucionFinCorte en el formulario
    }
  }
  
  onValue3Change(event: any) {
    console.log("Nuevo valor para value3:", event.target.value);
    this.value3 = event.target.value;
    if (this.porcentajeAvance) { // Verificar si porcentajeAvance no es null
      this.porcentajeAvance.setValue(this.value3); // Actualizar el valor del campo porcentajeAvance en el formulario
    }
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

   //--------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------
  //------------------------------------------Guardar proyecto -----------------------------------
  //--------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------
  public registroProyecto!: FormGroup;

  get codigo() {
    return this.registroProyecto.get('codigo');
  }
  get fecha() {
    return this.registroProyecto.get('fecha');
  }
  get titulo() {
    return this.registroProyecto.get('titulo');
  }
  get investigador() {
    return this.registroProyecto.get('investigador');
  }
  get unidadAcademica() {
    return this.registroProyecto.get('unidadAcademica');
  }
  get producto() {
    return this.registroProyecto.get('producto') as FormGroup;
  }  
  get coinvestigadores() {
    return this.registroProyecto.get('coinvestigadores');
  }
  get area() {
    return this.registroProyecto.get('area');
  }
  get porcentajeEjecucionCorte() {
    return this.registroProyecto.get('porcentajeEjecucionCorte');
  }
  get entidadPostulo() {
    return this.registroProyecto.get('entidadPostulo');
  }
  get financiacion() {
    return this.registroProyecto.get('financiacion');
  }
  get grupoInvestigacionPro() {
    return this.registroProyecto.get('grupoInvestigacionPro');
  }
  get porcentajeEjecucionFinCorte() {
    return this.registroProyecto.get('porcentajeEjecucionFinCorte');
  }
  get porcentajeAvance() {
    return this.registroProyecto.get('porcentajeAvance');
  }
  get Soporte() {
    return this.registroProyecto.get('Soporte');
  }
  get transacciones() {
    return this.registroProyecto.get('transacciones');
  }
  get origen() {
    return this.registroProyecto.get('origen');
  }
  get convocatoria() {
    return this.registroProyecto.get('convocatoria');
  }
  get ubicacionProyecto() {
    return this.registroProyecto.get('ubicacionProyecto');
  }
  get estadoProyecto() {
    return this.registroProyecto.get('estadoProyecto');
  }
  get modalidadProyecto() {
    return this.registroProyecto.get('modalidadProyecto');
  }
  get nivelRiesgoEtico() {
    return this.registroProyecto.get('nivelRiesgoEtico');
  }
  get lineaInvestigacion() {
    return this.registroProyecto.get('lineaInvestigacion');
  }
  get entregableAdministrativo() {
    return this.registroProyecto.get('entregableAdministrativo');
  }


  guardarProyecto() {
      // Obtener el valor del producto seleccionado
      const productoSeleccionado: string = this.registroProyecto.get('producto.listaProducto')!.value;
      const camposProducto = this.listaProductos[productoSeleccionado] || [];


    // Obtener una copia del FormGroup actual
    const productoFormGroup = this.registroProyecto.get('producto') as FormGroup;

    // Eliminar todos los controles existentes
    Object.keys(productoFormGroup.controls).forEach(controlName => {
      productoFormGroup.removeControl(controlName);
    });

    // Agregar los controles correspondientes al producto seleccionado
    camposProducto.forEach(controlName => {
      productoFormGroup.addControl(controlName, new FormControl(''));
    });


    //producto
    const id= this.registroProyecto.get('produto.id')?.value;
    const tituloProducto= this.registroProyecto.get('produto.tituloProducto')?.value;
    const rolProducto= this.registroProyecto.get('produto.rolProducto')?.value;
    const investigador= this.registroProyecto.get('produto.investigador')?.value;
    const cuartilEsperado= this.registroProyecto.get('produto.cuartilEsperado')?.value;
    const categoriaMinciencias= this.registroProyecto.get('produto.categoriaMinciencias')?.value;
    const tipologiaProducto= this.registroProyecto.get('produto.tipologiaProducto')?.value;
    const publicacion= this.registroProyecto.get('produto.publicacion')?.value;
    const estudiantes= this.registroProyecto.get('produto.estudiantes')?.value;
    const estadoProdIniSemestre= this.registroProyecto.get('produto.estadoProdIniSemestre')?.value;
    const porcentanjeAvanFinSemestre= this.registroProyecto.get('produto.porcentanjeAvanFinSemestre')?.value;
    const observaciones= this.registroProyecto.get('produto.observaciones')?.value;
    const estadoProducto= this.registroProyecto.get('produto.estadoProducto')?.value;
    const porcentajeComSemestral= this.registroProyecto.get('produto.porcentajeComSemestral')?.value;
    const porcentajeRealMensual= this.registroProyecto.get('produto.porcentajeRealMensual')?.value;
    const fecha= this.registroProyecto.get('produto.fecha')?.value;
    const origen= this.registroProyecto.get('produto.origen')?.value;
    const Soporte= this.registroProyecto.get('produto.Soporte')?.value;
    // Obtener los valores ingresados por el usuario en los campos del entregable administrativo
    const titulo = this.registroProyecto.get('entregableAdministrativo.titulo')?.value;
    const nombre = this.registroProyecto.get('entregableAdministrativo.nombre')?.value;
    const calidad = this.registroProyecto.get('entregableAdministrativo.calidad')?.value;
    const entregable = this.registroProyecto.get('entregableAdministrativo.entregable')?.value;
    const pendiente = this.registroProyecto.get('entregableAdministrativo.pendiente')?.value;
    const clasificacion = this.registroProyecto.get('entregableAdministrativo.clasificacion')?.value;
  
    // Crear objeto proyecto
    const proyecto = {
      producto:{
        id,
        tituloProducto,
        rolProducto,
        investigador,
        cuartilEsperado,
        categoriaMinciencias,
        tipologiaProducto,
        publicacion,
        estudiantes,
        estadoProdIniSemestre,
        porcentanjeAvanFinSemestre,
        observaciones,
        estadoProducto,
        porcentajeComSemestral,
        porcentajeRealMensual,
        fecha,
        origen,
        Soporte,
      },
      entregableAdministrativo: {
        titulo,
        nombre,
        calidad,
        entregable,
        pendiente,
        clasificacion
      }
    };
  
    // Llamar a la función crearProyecto para guardar el proyecto en el servidor
    this.ProyectoyproductoService.crearProyecto(proyecto, this.selectedFileProyecto, this.selectedFileProducto).subscribe(
      (resp: any) => {
        console.log('Se ha registrado el proyecto exitosamente:', resp);
        alert('Se ha registrado el proyecto exitosamente.');
        this.registroProyecto.reset();
      },
      (error: any) => {
        console.error('Error al registrar el proyecto:', error);
        alert('Error al registrar el proyecto. Por favor, inténtalo de nuevo.');
      }
    );
  }
  
  
  
  
  


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