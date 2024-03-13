import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; // Asegúrate de importar MatPaginator desde '@angular/material/paginator'
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';


import { MatSelectModule } from '@angular/material/select';


import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';

import { AsyncPipe } from '@angular/common';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatRadioModule } from '@angular/material/radio';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Investigador } from '../../modelo/investigador';
import { Producto } from '../../modelo/productos';
import { Coinvestigador, Proyecto } from '../../modelo/proyectos';
import { ProyectoyproductoService } from '../../services/proyectoyproducto';
import { InvestigadorService } from '../../services/registroInvestigador';
import { SearchService } from '../../services/search.service';
@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
  standalone: true,
  imports: [
    MatTabsModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatStepperModule,
    MatNativeDateModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    MatSliderModule,
    MatRadioModule,
    CommonModule,
    HttpClientModule,
  ],
})
export class ProyectosComponent implements OnInit {
  //mostrar los coinvestigadores que hay
  separatorKeysCodes: number[] = [13, 188];
  investigatorCtrl = new FormControl('');
  filteredInvestigators!: Observable<{ nombre: string; apellidos: string }[]>;
  activeInvestigators: { nombre: string; apellidos: string }[] = [];
  selectedInvestigators: string[] = [];
  proyecto: Proyecto = {};
  // Función para generar un ID secuencial
  private idCounter: number = 1;
  generateSequentialId() {
    return this.idCounter++;
  }

  @ViewChild('investigatorInput')
  investigatorInput!: ElementRef<HTMLInputElement>;

  constructor(
    private ProyectoyproductoService: ProyectoyproductoService,
    private formBuilder: FormBuilder,
    private investigatorService: InvestigadorService,
    private SearchService:SearchService,
    
  ) {
    this.firstFormGroup = this.formBuilder.group({
      codigo: [''],
      fecha: [''],
      titulo: [''],
      investigador: [''],
      unidadAcademica: [''],
      coinvestigadores: ['', this.selectedInvestigators],
      area: [''],
      porcentajeEjecucionCorte: [''],
      entidadPostulo: this.formBuilder.group({
        id: [this.generateSequentialId()],
        nombreInstitucion: [''],
        nombreGrupo: [''],
      }),
      financiacion: this.formBuilder.group({
        id: [this.generateSequentialId()],
        valorPropuestoFin: [''],
        valorEjecutadoFin: [''],
      }),
      grupoInvestigacionPro: [''],
      porcentajeEjecucionFinCorte: [''],
      porcentajeAvance: [''],
      soporte: ['',this.selectedFileProyecto],
      transacciones: this.formBuilder.group({
        id: [this.generateSequentialId()],
        fecha: [''],
        acta: [''],
        descripcion: [''],
      }),
      origen: [''],
      convocatoria: [''],
      ubicacionProyecto: this.formBuilder.group({
        id: [this.generateSequentialId()],
        instalacion: [''],
        municipio: [''],
        departamento: [''],
        pais: [''],
      }),
      estadoProyecto: new FormControl(''),
      modalidadProyecto: [''],
      nivelRiesgoEtico: [''],
      lineaInvestigacion: [''],
      entregableAdministrativo: this.formBuilder.group({
        id: [this.generateSequentialId()],
        titulo: [''],
        nombre: [''],
        calidad: [''],
        entregable: [''],
        pendiente: [''],
        clasificacion: [''],
      }),
    });
    this.secondFormGroup = this.formBuilder.group({
        id: [''],
        tituloProducto: [''],
        rolProducto: [''],
        investigador: [''],
        listaProducto: this.formBuilder.group({
          articulo: this.formBuilder.group({
            id:[this.generateSequentialId()],
            fuente:[''],
          }),
          capitulo: this.formBuilder.group({
            id:[this.generateSequentialId()],
            nombrepublicacion:[''],
            isbn :[''],
            fecha:[''],
            editorial:[''],
          }),
          software: this.formBuilder.group({
            id:[this.generateSequentialId()],
            tiporegistro:[''],
            numero:[''],
            fecha:[''],
            pais:[''],
          }),
          libro: this.formBuilder.group({
            id:[this.generateSequentialId()],
            isbn:[''],
            fecha:[''],
            editorial:[''],
            luegarpublicacion:[''],
          }),
          prototipoIndustrial: this.formBuilder.group({
            id:[this.generateSequentialId()],
            fecha:[''],
            pais:[''],
            insitutofinanciador:[''],
          }),
          evento: this.formBuilder.group({
            id:[this.generateSequentialId()],
            fechainicio:[''],
            fechafin:[''],
            numparticinerno:[''],
            numparticexterno:[''],
            tipoevento:[''],
          }),
          reconocimiento: this.formBuilder.group({
            id:[this.generateSequentialId()],
            fecha:[''],
            nombentidadotorgada:[''],
          }),
          consultoria: this.formBuilder.group({
            id:[this.generateSequentialId()],
            año:[''],
            contrato:this.formBuilder.group({
              id:[this.generateSequentialId()],
              nombre:[''],
              numero:[''],
            }),
            nombreEntidad:[''],
          }),
          contenido: this.formBuilder.group({
            id:[this.generateSequentialId()],
            paginaWeb:[''],
            nombreEntidad:[''],
          }),
          pregFinalizadoyCurso: this.formBuilder.group({
            id:[this.generateSequentialId()],
            fechaInicio:[''],
            reconocimientos:[''],
            numeroPaginas:[''],
          }),
          apropiacion: this.formBuilder.group({
            id:[this.generateSequentialId()],
            fechainicio:[''],
            fechaFin:[''],
            licencia:this.formBuilder.group({
              id:[this.generateSequentialId()],
              nombre:[''],
            }),
            formato:[''],
            medio:[''],
            nombreEntidad:[''],
          }),
          maestria: this.formBuilder.group({
            id:[this.generateSequentialId()],
            fechaInicio:[''],
            institucion:[''],
          }),
          proyectoCursoProducto: [''],
          proyectoFormuladoProducto: [''],
          proyectoRSUProducto: [''],
        }),
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
        Soporte: ['',this.selectedFileProyecto],
    });
    this.productoFormGroup = this.formBuilder.group({
      id: [''],
      tituloProducto: [''],
      rolProducto: [''],
      investigador: [''],
      listaProducto: this.formBuilder.group({
        articulo: this.formBuilder.group({
          id:[this.generateSequentialId()],
          fuente:[''],
        }),
        capitulo: this.formBuilder.group({
          id:[this.generateSequentialId()],
          nombrepublicacion:[''],
          isbn :[''],
          fecha:[''],
          editorial:[''],
        }),
        software: this.formBuilder.group({
          id:[this.generateSequentialId()],
          tiporegistro:[''],
          numero:[''],
          fecha:[''],
          pais:[''],
        }),
        libro: this.formBuilder.group({
          id:[this.generateSequentialId()],
          isbn:[''],
          fecha:[''],
          editorial:[''],
          luegarpublicacion:[''],
        }),
        prototipoIndustrial: this.formBuilder.group({
          id:[this.generateSequentialId()],
          fecha:[''],
          pais:[''],
          insitutofinanciador:[''],
        }),
        evento: this.formBuilder.group({
          id:[this.generateSequentialId()],
          fechainicio:[''],
          fechafin:[''],
          numparticinerno:[''],
          numparticexterno:[''],
          tipoevento:[''],
        }),
        reconocimiento: this.formBuilder.group({
          id:[this.generateSequentialId()],
          fecha:[''],
          nombentidadotorgada:[''],
        }),
        consultoria: this.formBuilder.group({
          id:[this.generateSequentialId()],
          año:[''],
          contrato:this.formBuilder.group({
            id:[this.generateSequentialId()],
            nombre:[''],
            numero:[''],
          }),
          nombreEntidad:[''],
        }),
        contenido: this.formBuilder.group({
          id:[this.generateSequentialId()],
          paginaWeb:[''],
          nombreEntidad:[''],
        }),
        pregFinalizadoyCurso: this.formBuilder.group({
          id:[this.generateSequentialId()],
          fechaInicio:[''],
          reconocimientos:[''],
          numeroPaginas:[''],
        }),
        apropiacion: this.formBuilder.group({
          id:[this.generateSequentialId()],
          fechainicio:[''],
          fechaFin:[''],
          licencia:this.formBuilder.group({
            id:[this.generateSequentialId()],
            nombre:[''],
          }),
          formato:[''],
          medio:[''],
          nombreEntidad:[''],
        }),
        maestria: this.formBuilder.group({
          id:[this.generateSequentialId()],
          fechaInicio:[''],
          institucion:[''],
        }),
        proyectoCursoProducto: [''],
        proyectoFormuladoProducto: [''],
        proyectoRSUProducto: [''],
      }),
      publicacion: [''],
      estudiantes: [''],
      estadoProdIniSemestre: [''],
      porcentanjeAvanFinSemestre: [''],
      observaciones: [''],
      estadoProducto: [''],
      porcentajeComSemestral: [''],
      porcentajeRealMensual: [''],
      fecha:[new Date()],
      origen: [''],
      Soporte: ['',this.FileProducto],
    });
  }
  

  ngOnInit(): void {
    this.selectedInvestigators = []; // Asegúrate de que selectedInvestigators esté vacío al principio
    this.activeInvestigators = []; // Inicializa activeInvestigators como un array vacío

    this.investigatorService.getUsuarios().subscribe((data) => {
      this.activeInvestigators = data.map((investigador) => ({
        nombre: investigador.nombre,
        apellidos: investigador.apellidos,
        numerodocumento: investigador.numerodocumento, // Asegúrate de incluir el número de documento aquí
      }));

      this.filteredInvestigators = this.investigatorCtrl.valueChanges.pipe(
        startWith(''),
        map((value: string | null) =>
          value ? this._filter(value) : this.activeInvestigators.slice()
        )
      );
    });
    this.dataSource.paginator = this.paginator;
    this.SearchService.getSearchQuery().subscribe(query => {
      this.dataSource.filter = query.trim().toLowerCase();
    });
  }
  addCoinvestigador(investigador: {
    nombre: string;
    apellidos: string;
    numerodocumento: string;
  }) {
    const newCoinvestigador: Coinvestigador = {
      id: investigador.numerodocumento,
      coinvestigador: `${investigador.nombre}`,
    };
    if (!this.proyecto.coinvestigadores) {
      this.proyecto.coinvestigadores = [newCoinvestigador];
    } else {
      this.proyecto.coinvestigadores.push(newCoinvestigador);
    }
  }

  removeCoinvestigador(investigador: { nombre: string; apellidos: string }) {
    if (this.proyecto.coinvestigadores) {
      this.proyecto.coinvestigadores = this.proyecto.coinvestigadores.filter(
        (c) =>
          c.coinvestigador !==
          `${investigador.nombre} ${investigador.apellidos}`
      );
    }
  }

  private _filter(value: string): { nombre: string; apellidos: string }[] {
    const filterValue = value.toLowerCase();

    if (!filterValue) {
      return this.activeInvestigators.slice(); // Devuelve una copia de todos los investigadores activos si no hay entrada de usuario
    }

    // Filtrar investigadores activos que no estén en la lista de investigadores seleccionados
    const filteredActiveInvestigators = this.activeInvestigators.filter(
      (investigador) =>
        `${investigador.nombre.toLowerCase()} ${investigador.apellidos.toLowerCase()}`.includes(
          filterValue
        )
    );

    // Filtrar investigadores seleccionables que no estén ya seleccionados
    return filteredActiveInvestigators.filter(
      (investigador) =>
        !this.selectedInvestigators.includes(
          `${investigador.nombre} ${investigador.apellidos}`
        )
    );
  }

  trackByFn(
    index: number,
    item: { nombre: string; apellidos: string }
  ): number {
    return index;
  }

  remove(investigador: { nombre: string; apellidos: string }): void {
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
    const investigadorExistente = this.activeInvestigators.find(
      (investigador) =>
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
    if (
      investigator &&
      investigator.nombre &&
      investigator.apellidos &&
      investigator.numerodocumento
    ) {
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
  selectedFileProducto: File = null!;

  onFileSelected1(event: any) {
    this.selectedFileProducto = event.target.files[0] as File;
  }

  //mostrar productos en nuevo proyecto
  mostrarInputs: boolean = false;

  onSelectionChange(event: any) {
    this.mostrarInputs = event.value === '1';
  }

  //CREAR PROYECTO
  isEditable = true;

  //BARRAS DE PORCENTAJE
  value: number = 0;
  value2: number = 0;
  value3: number = 0;

  onValueChange(event: any) {
    this.value = Number(event.target.value); // Convertir a número
    const porcentajeEjecucionCorteControl = this.firstFormGroup.get(
      'porcentajeEjecucionCorte'
    );
    if (porcentajeEjecucionCorteControl) {
      // Verificar si porcentajeEjecucionCorteControl no es null ni undefined
      porcentajeEjecucionCorteControl.setValue(this.value.toString()); // Convertir a string y asignar el valor al control del formulario
    }
  }

  onValue2Change(event: any) {
    this.value2 = Number(event.target.value); // Convertir a número
    const porcentajeEjecucionFinCorte = this.firstFormGroup.get(
      'porcentajeEjecucionFinCorte'
    );
    if (porcentajeEjecucionFinCorte) {
      // Verificar si porcentajeEjecucionCorteControl no es null ni undefined
      porcentajeEjecucionFinCorte.setValue(this.value2.toString()); // Convertir a string y asignar el valor al control del formulario
    }
  }
  onValue3Change(event: any) {
    this.value3 = Number(event.target.value); // Convertir a número
    const porcentajeAvance = this.firstFormGroup.get('porcentajeAvance');
    if (porcentajeAvance) {
      // Verificar si porcentajeEjecucionCorteControl no es null ni undefined
      porcentajeAvance.setValue(this.value3.toString()); // Convertir a string y asignar el valor al control del formulario
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
  
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;

  get codigo() {
    return this.firstFormGroup.get('codigo');
  }
  get fecha() {
    return this.firstFormGroup.get('fecha');
  }
  get titulo() {
    return this.firstFormGroup.get('titulo');
  }
  get investigador() {
    return this.firstFormGroup.get('investigador');
  }
  get unidadAcademica() {
    return this.firstFormGroup.get('unidadAcademica');
  }
  get producto() {
    return this.secondFormGroup.get('producto') as FormGroup;
  }
  get coinvestigadores() {
    return this.firstFormGroup.get('coinvestigadores');
  }
  get area() {
    return this.firstFormGroup.get('area');
  }
  get porcentajeEjecucionCorte() {
    return this.firstFormGroup.get('porcentajeEjecucionCorte');
  }
  get entidadPostulo() {
    return this.firstFormGroup.get('entidadPostulo');
  }
  get financiacion() {
    return this.firstFormGroup.get('financiacion');
  }
  get grupoInvestigacionPro() {
    return this.firstFormGroup.get('grupoInvestigacionPro');
  }
  get porcentajeEjecucionFinCorte() {
    return this.firstFormGroup.get('porcentajeEjecucionFinCorte');
  }
  get porcentajeAvance() {
    return this.firstFormGroup.get('porcentajeAvance');
  }
  get soporte() {
    return this.firstFormGroup.get('Soporte');
  }
  get transacciones() {
    return this.firstFormGroup.get('transacciones');
  }
  get origen() {
    return this.firstFormGroup.get('origen');
  }
  get convocatoria() {
    return this.firstFormGroup.get('convocatoria');
  }
  get ubicacionProyecto() {
    return this.firstFormGroup.get('ubicacionProyecto');
  }
  get estadoProyecto() {
    return this.firstFormGroup.get('estadoProyecto');
  }
  get modalidadProyecto() {
    return this.firstFormGroup.get('modalidadProyecto');
  }
  get nivelRiesgoEtico() {
    return this.firstFormGroup.get('nivelRiesgoEtico');
  }
  get lineaInvestigacion() {
    return this.firstFormGroup.get('lineaInvestigacion');
  }
  get entregableAdministrativo() {
    return this.firstFormGroup.get('entregableAdministrativo');
  }

  onSaveForm(): void {
    console.log('Producto:', this.secondFormGroup.value);
    console.log('proyecto:', this.firstFormGroup.value);
  }

  guardarProyecto() {
    console.log('proyecto:', this.firstFormGroup.value);
    console.log('Producto:', this.secondFormGroup.value);
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      const proyecto: Proyecto = {
        codigo: this.firstFormGroup.get('codigo')?.value,
        fecha: this.firstFormGroup.get('fecha')?.value,
        titulo: this.firstFormGroup.get('titulo')?.value,
        investigador: this.firstFormGroup.get('investigador')?.value,
        unidadAcademica: this.firstFormGroup.get('unidadAcademica')?.value,
        producto: {
          id: this.secondFormGroup.get('producto.id')?.value,
          tituloProducto: this.secondFormGroup.get('producto.tituloProducto')
            ?.value,
          rolProducto: this.secondFormGroup.get('producto.rolProducto')?.value,
          investigador: this.secondFormGroup.get('producto.investigador')
            ?.value,
          listaProducto: this.secondFormGroup.get('producto.listaProducto')
            ?.value,
          cuartilEsperado: this.secondFormGroup.get('producto.cuartilEsperado')
            ?.value,
          categoriaMinciencias: this.secondFormGroup.get(
            'producto.categoriaMinciencias'
          )?.value,
          tipologiaProducto: this.secondFormGroup.get(
            'producto.tipologiaProducto'
          )?.value,
          publicacion: this.secondFormGroup.get('producto.publicacion')?.value,
          estudiantes: this.secondFormGroup.get('producto.estudiantes')?.value,
          estadoProdIniSemestre: this.secondFormGroup.get(
            'producto.estadoProdIniSemestre'
          )?.value,
          porcentanjeAvanFinSemestre: this.secondFormGroup.get(
            'producto.porcentanjeAvanFinSemestre'
          )?.value,
          observaciones: this.secondFormGroup.get('producto.observaciones')
            ?.value,
          estadoProducto: this.secondFormGroup.get('producto.estadoProducto')
            ?.value,
          porcentajeComSemestral: this.secondFormGroup.get(
            'producto.porcentajeComSemestral'
          )?.value,
          porcentajeRealMensual: this.secondFormGroup.get(
            'producto.porcentajeRealMensual'
          )?.value,
          fecha: this.secondFormGroup.get('producto.fecha')?.value,
          origen: this.secondFormGroup.get('producto.origen')?.value,
          Soporte: this.secondFormGroup.get('producto.Soporte')?.value,
        },
        coinvestigadores: this.firstFormGroup.get('coinvestigadores')?.value,
        area: this.firstFormGroup.get('area')?.value,
        porcentajeEjecucionCorte: this.firstFormGroup.get(
          'porcentajeEjecucionCorte'
        )?.value,
        entidadPostulo: this.firstFormGroup.get('entidadPostulo')?.value,
        financiacion: this.firstFormGroup.get('financiacion')?.value,
        grupoInvestigacionPro: this.firstFormGroup.get('grupoInvestigacionPro')
          ?.value,
        porcentajeEjecucionFinCorte: this.firstFormGroup.get(
          'porcentajeEjecucionFinCorte'
        )?.value,
        porcentajeAvance: this.firstFormGroup.get('porcentajeAvance')?.value,
        soporte: this.firstFormGroup.get('soporte')?.value,
        transacciones: this.firstFormGroup.get('transacciones')?.value,
        origen: this.firstFormGroup.get('origen')?.value,
        convocatoria: this.firstFormGroup.get('convocatoria')?.value,
        ubicacionProyecto: this.firstFormGroup.get('ubicacionProyecto')?.value,
        estadoProyecto: this.firstFormGroup.get('estadoProyecto')?.value,
        modalidadProyecto: this.firstFormGroup.get('modalidadProyecto')?.value,
        nivelRiesgoEtico: this.firstFormGroup.get('nivelRiesgoEtico')?.value,
        lineaInvestigacion:
          this.firstFormGroup.get('lineaInvestigacion')?.value,
        entregableAdministrativo: this.firstFormGroup.get(
          'entregableAdministrativo'
        )?.value,
      };
      // Llamar a la función crearProyecto para guardar el proyecto en el servidor
      this.ProyectoyproductoService.crearProyecto(proyecto).subscribe(
        (resp: any) => {
          console.log('Se ha registrado el proyecto exitosamente:', resp);
          alert('Se ha registrado el proyecto exitosamente.');
          this.firstFormGroup.reset();
          this.secondFormGroup.reset();
        },
        (error: any) => {
          console.error('Error al registrar el proyecto:', error);
          alert(
            'Error al registrar el proyecto. Por favor, inténtalo de nuevo.'
          );
        }
      );
    } else {
      alert('Por favor, completa el formulario correctamente.');
    }
  }

  //--------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------
  //------------------------------------------PRODUCTO -----------------------------------
  //--------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------
 
  public productoFormGroup: FormGroup;

  get id() {
    return this.productoFormGroup.get('id');
  }
  get tituloProducto() {
    return this.productoFormGroup.get('tituloProducto');
  }
  get rolProducto() {
    return this.productoFormGroup.get('rolProducto');
  }
  get investigadorPrd() {
    return this.productoFormGroup.get('investigador');
  }
  get listaProducto() {
    return this.productoFormGroup.get('listaProducto');
  }
  get cuartilEsperado() {
    return this.productoFormGroup.get('cuartilEsperado');
  }
  get categoriaMinciencias() {
    return this.productoFormGroup.get('categoriaMinciencias');
  }
  get tipologiaProducto() {
    return this.productoFormGroup.get('tipologiaProducto');
  }
  get publicacion() {
    return this.productoFormGroup.get('publicacion');
  }
  get estudiantes() {
    return this.productoFormGroup.get('estudiantes');
  }
  get estadoProdIniSemestre() {
    return this.productoFormGroup.get('estadoProdIniSemestre');
  }
  get porcentanjeAvanFinSemestre() {
    return this.productoFormGroup.get('porcentanjeAvanFinSemestre');
  }
  get observaciones() {
    return this.productoFormGroup.get('observaciones');
  }
  get estadoProducto() {
    return this.productoFormGroup.get('estadoProducto');
  }
  get porcentajeComSemestral() {
    return this.productoFormGroup.get('porcentajeComSemestral');
  }
  get porcentajeRealMensual() {
    return this.productoFormGroup.get('porcentajeRealMensual');
  }
  get fechaPrd() {
    return this.productoFormGroup.get('fecha');
  }
  get origenPrd() {
    return this.productoFormGroup.get('origen');
  }
  get Soporte() {
    return this.productoFormGroup.get('Soporte');
  }
  get tipoevento(){
    return this.productoFormGroup.get('tipoevento');
  }
  get fuente(){
    return this.productoFormGroup.get('fuente');
  }

//tipologia producto
typeProducto: string[] = ['A', 'A1', 'A2', 'B', 'Productos tipo TOP'];

changeTipologia(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target && this.tipologiaProducto) {
    this.tipologiaProducto.setValue(target.value, {
      onlySelf: true,
    });
  }
}

//Estado del producto
typeEstado: string[] = ['resaccion', 'sometido', 'publicado'];

changeEstado(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target && this.estadoProducto) {
    this.estadoProducto.setValue(target.value, {
      onlySelf: true,
    });
  }
}

// Categoria minciencias
typeMinciencias: string[] = ['A1', 'A2', 'B', 'C'];

changeMinciencias(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target && this.categoriaMinciencias) {
    this.categoriaMinciencias.setValue(target.value, {
      onlySelf: true,
    });
  }
}

// Cuartil esperado
typeCuartil: string[] = ['A', 'B', 'C', 'D', 'Q', 'RNT'];

changeCuartil(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target && this.cuartilEsperado) {
    this.cuartilEsperado.setValue(target.value, {
      onlySelf: true,
    });
  }
}

// tipo de evento de eventos de lista productos
typeEventos: string[] = ['Congreso', 'Seminario', 'Simposio', 'Conferencia', 'Feria', 'Encuentro academico'];

changeEventos(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target && this.tipoevento) {
    this.tipoevento.setValue(target.value, {
      onlySelf: true,
    });
  }
}

// tipo de fuente  de articulos de lista productos
typeFuente: string[] = ['Electronico', 'Electronico'];

changeFuente(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target && this.fuente) {
    this.fuente.setValue(target.value, {
      onlySelf: true,
    });
  }
}

//------------------------- PORCENTAJES -----------------------

value4: number = 0;
value5: number = 0;
value6: number = 0;

onValue4Change(event: any) {
  this.value4 = Number(event.target.value);
  const porcentanjeAvanFinSemestre = this.productoFormGroup.get(
    'porcentanjeAvanFinSemestre'
  );
  if (porcentanjeAvanFinSemestre) {
    porcentanjeAvanFinSemestre.setValue(this.value4.toString());
  }
}

onValue5Change(event: any) {
  this.value5 = Number(event.target.value);
  const porcentajeComSemestral = this.productoFormGroup.get(
    'porcentajeComSemestral'
  );
  if (porcentajeComSemestral) {
    porcentajeComSemestral.setValue(this.value5.toString());
  }
}
onValue6Change(event: any) {
  this.value6 = Number(event.target.value);
  const porcentajeRealMensual = this.productoFormGroup.get('porcentajeRealMensual');
  if (porcentajeRealMensual) {
    porcentajeRealMensual.setValue(this.value6.toString());
  }
}

disabled4 = false;
max4 = 100;
min4 = 0;
showTicks4 = false;
step4 = 1;
thumbLabel4 = false;

disabled5 = false;
max5 = 100;
min5 = 0;
showTicks5 = false;
step5 = 1;
thumbLabel5 = false;

disabled6 = false;
max6 = 100;
min6 = 0;
showTicks6 = false;
step6 = 1;
thumbLabel6 = false;

  //subir archivo producto
  FileProducto: File = null!;

  onFileSelected2(event: any) {
    this.FileProducto = event.target.files[0] as File;
  }

  guardarProducto() {
    if (this.productoFormGroup.valid) {
      const producto: Producto= {
        id: this.productoFormGroup.value.id,
        tituloProducto: this.productoFormGroup.value.tituloProducto,
        investigador: this.productoFormGroup.value.investigador,
        listaProducto: {
          articulo: {
            id: this.productoFormGroup.value.listaProducto.capitulo.id,
            fuente: this.productoFormGroup.value.listaProducto.articulo.fuente
          },
          capitulo: {
            id: this.productoFormGroup.value.listaProducto.capitulo.id,
            nombrepublicacion: this.productoFormGroup.value.listaProducto.capitulo.nombrepublicacion,
            isbn: this.productoFormGroup.value.listaProducto.capitulo.isbn,
            fecha: this.productoFormGroup.value.listaProducto.capitulo.fecha,
            editorial: this.productoFormGroup.value.listaProducto.capitulo.editorial
          },
          software: {
            id: this.productoFormGroup.value.listaProducto.software.id,
            tiporegistro: this.productoFormGroup.value.listaProducto.software.tiporegistro,
            numero: this.productoFormGroup.value.listaProducto.software.numero,
            fecha: this.productoFormGroup.value.listaProducto.software.fecha,
            pais: this.productoFormGroup.value.listaProducto.software.pais
          },
          libro: {
            id: this.productoFormGroup.value.listaProducto.libro.id,
            isbn: this.productoFormGroup.value.listaProducto.libro.isbn,
            fecha: this.productoFormGroup.value.listaProducto.libro.fecha,
            editorial: this.productoFormGroup.value.listaProducto.libro.editorial,
            luegarpublicacion: this.productoFormGroup.value.listaProducto.libro.luegarpublicacion
          },
          prototipoIndustrial: {
            id: this.productoFormGroup.value.listaProducto.prototipoIndustrial.id,
            fecha: this.productoFormGroup.value.listaProducto.prototipoIndustrial.fecha,
            pais: this.productoFormGroup.value.listaProducto.prototipoIndustrial.pais,
            insitutofinanciador: this.productoFormGroup.value.listaProducto.prototipoIndustrial.insitutofinanciador
          },
          evento: {
            id: this.productoFormGroup.value.listaProducto.evento.id,
            fechainicio: this.productoFormGroup.value.listaProducto.evento.fechainicio,
            fechafin: this.productoFormGroup.value.listaProducto.evento.fechafin,
            numparticinerno: this.productoFormGroup.value.listaProducto.evento.numparticinerno,
            numparticexterno: this.productoFormGroup.value.listaProducto.evento.numparticexterno,
            tipoevento: this.productoFormGroup.value.listaProducto.evento.tipoevento
          },
          reconocimiento: {
            id: this.productoFormGroup.value.listaProducto.reconocimiento.id,
            fecha: this.productoFormGroup.value.listaProducto.reconocimiento.fecha,
            nombentidadotorgada: this.productoFormGroup.value.listaProducto.reconocimiento.nombentidadotorgada
          },
          consultoria: {
            id: this.productoFormGroup.value.listaProducto.consultoria.id,
            año: this.productoFormGroup.value.listaProducto.consultoria.año,
            contrato: {
              id: this.productoFormGroup.value.listaProducto.consultoria.contrato.id,
              nombre: this.productoFormGroup.value.listaProducto.consultoria.contrato.nombre,
              numero: this.productoFormGroup.value.listaProducto.consultoria.contrato.numero
            },
            nombreEntidad: this.productoFormGroup.value.listaProducto.consultoria.nombreEntidad
          },
          contenido: {
            id: this.productoFormGroup.value.listaProducto.contenido.id,
            paginaWeb: this.productoFormGroup.value.listaProducto.contenido.paginaWeb,
            nombreEntidad: this.productoFormGroup.value.listaProducto.contenido.nombreEntidad
          },
          pregFinalizadoyCurso: {
            id: this.productoFormGroup.value.listaProducto.pregFinalizadoyCurso.id,
            fechaInicio: this.productoFormGroup.value.listaProducto.pregFinalizadoyCurso.fechaInicio,
            reconocimientos: this.productoFormGroup.value.listaProducto.pregFinalizadoyCurso.reconocimientos,
            numeroPaginas: this.productoFormGroup.value.listaProducto.pregFinalizadoyCurso.numeroPaginas
          },
          apropiacion: {
            id: this.productoFormGroup.value.listaProducto.apropiacion.id,
            fechainicio: this.productoFormGroup.value.listaProducto.apropiacion.fechainicio,
            fechaFin: this.productoFormGroup.value.listaProducto.apropiacion.fechaFin,
            licencia: {
              id: this.productoFormGroup.value.listaProducto.apropiacion.licencia.id,
              nombre: this.productoFormGroup.value.listaProducto.apropiacion.licencia.nombre
            },
            formato: this.productoFormGroup.value.listaProducto.apropiacion.formato,
            medio: this.productoFormGroup.value.listaProducto.apropiacion.medio,
            nombreEntidad: this.productoFormGroup.value.listaProducto.apropiacion.nombreEntidad
          },
          maestria: {
            id: this.productoFormGroup.value.listaProducto.maestria.id,
            fechaInicio: this.productoFormGroup.value.listaProducto.maestria.fechaInicio,
            institucion: this.productoFormGroup.value.listaProducto.maestria.institucion
          },
          proyectoCursoProducto: this.productoFormGroup.value.listaProducto.proyectoCursoProducto,
          proyectoFormuladoProducto: this.productoFormGroup.value.listaProducto.proyectoFormuladoProducto,
          proyectoRSUProducto: this.productoFormGroup.value.listaProducto.proyectoRSUProducto
        },
        tipologiaProducto: this.productoFormGroup.value.tipologiaProducto,
        publicacion: this.productoFormGroup.value.publicacion,
        estudiantes: this.productoFormGroup.value.estudiantes,
        estadoProdIniSemestre: this.productoFormGroup.value.estadoProdIniSemestre,
        porcentanjeAvanFinSemestre: this.productoFormGroup.value.porcentanjeAvanFinSemestre,
        observaciones: this.productoFormGroup.value.observaciones,
        estadoProducto: this.productoFormGroup.value.estadoProducto,
        porcentajeComSemestral: this.productoFormGroup.value.porcentajeComSemestral,
        porcentajeRealMensual: this.productoFormGroup.value.porcentajeRealMensual,
        fecha: this.productoFormGroup.value.fecha,
        origen: this.productoFormGroup.value.origen,
        Soporte: this.FileProducto,
      }
      console.log('Producto:', producto)
      
      this.ProyectoyproductoService.crearProducto(producto).subscribe(
        (resp) => {
          console.log('Se ha registrado el usuario exitosamente:', resp);
          alert('Se ha registrado el usuario exitosamente.');
          this.productoFormGroup.reset();
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
  





  //--------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------
  //------------------------------------------TABLA -----------------------------------
  //--------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------
 
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
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];
