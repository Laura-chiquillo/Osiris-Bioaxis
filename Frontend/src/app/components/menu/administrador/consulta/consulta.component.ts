import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { InvestigadorService } from '../../services/registroInvestigador';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { SearchService } from '../../services/search.service';
import { ProyectoyproductoService } from '../../services/proyectoyproducto';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { ConfiguracionPlanTrabajo, PlanTrabajo } from '../../modelo/planDeTrabajo';
import { DialogoEstadisticaComponent } from './dialogo-estadistica/dialogo-estadistica.component';
import { DialogoPlanDeTrabajoComponent } from './dialogo-plan-de-trabajo/dialogo-plan-de-trabajo.component';
import { DialogoInformacionPlanTrabajoComponent } from './dialogo-informacion-plan-trabajo/dialogo-informacion-plan-trabajo.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css'],
  standalone: true,
  imports: [
    MatTabsModule, 
    MatButtonModule,
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatSnackBarModule, 
    FormsModule
  ],
})
export class ConsultaComponent implements OnInit, AfterViewInit {
  @ViewChild('TABLE') table: any;
  dataSourceInvestigador: MatTableDataSource<any>;
  dataSourceProyecto: MatTableDataSource<any>;
  dataSourceProducto: MatTableDataSource<any>;

  displayedColumnsInvestigador: string[] = ['nombre', 'rolinvestigador', 'estado','updated_at','created_at','accion'];
  displayedColumnsProyecto: string[] = ['codigo', 'lider','estadoProceso','estadoProyecto','updated_at','created_at','accion'];
  displayedColumnsProducto: string[] = ['nombre', 'lider','estadoProceso','estadoProducto','updated_at','created_at','accion'];

  proyectosData: any[] =[];
  productosData: any[] =[];
  investigadoresData: any[] =[];

  

  estadosProyectos: any[] = [];
  estadosProductos: any[] = [];

  tableHeaders = {
    planTrabajo: 'Plan de trabajo',
    informacion: 'Información',
    descargar: 'Descargar',
    estado: 'Estado'
  };

  item: any[] =[];

  constructor(
    private investigadorService: InvestigadorService, 
    private searchService: SearchService,
    private _snackBar: MatSnackBar,
    private proyectoyproductoService: ProyectoyproductoService,
    public dialog: MatDialog) {
    
    this.dataSourceInvestigador = new MatTableDataSource<any>([]);
    this.dataSourceProyecto = new MatTableDataSource<any>([]);
    this.dataSourceProducto = new MatTableDataSource<any>([]);
  }

  @ViewChild('paginatorInvestigador') paginator!: MatPaginator;
  @ViewChild('paginatorProyecto') paginator2!: MatPaginator;
  @ViewChild('paginatorProducto') paginator3!: MatPaginator;

  ngOnInit() {
    this.obtenerUsuarios();
    this.obtenerPlanTrabajo();
    this.obtenerProyectos();
    this.obtenerProductos();
    this.obtenerEstadosProyecto();
    this.obtenerEstadosProducto();
    this.searchService.getSearchQuery().subscribe(query => {
      this.dataSourceInvestigador.filter = query.trim().toLowerCase();
      this.dataSourceProyecto.filter = query.trim().toLowerCase();
      this.dataSourceProducto.filter = query.trim().toLowerCase();
    });
  }

  ngAfterViewInit() {
    this.dataSourceInvestigador.paginator = this.paginator;
    this.dataSourceProyecto.paginator = this.paginator2;
    this.dataSourceProducto.paginator = this.paginator3;
  }

  obtenerProyectos() {
    this.proyectoyproductoService.getProyectos().subscribe(
      (proyecto) => {
        const dataSort = proyecto.sort((a, b) => (a.codigo < b.codigo ? -1 : 1));
        this.dataSourceProyecto.data = dataSort.map(data => {
          return {
            codigo: data.codigo,
            investigador: data.investigador,
            observacion: data.observacion,
            estadoProceso: data.estadoProceso,
            estadoProyecto: this.estadosProyectos.filter(x => x.id == data.estado)[0].estado,
            created_at: data.created_at,
            updated_at: data.updated_at,
          };
        });
        this.proyectosData = dataSort.map(data => {
          return {
            codigo: data.codigo,
            fecha: data.fecha,
            titulo: data.estadoProceso,
            investigador: data.investigador,
            coinvestigador: data.coinvestigador.join(),
            estudiantes: data.estudiantes.join(),
            participantesExternos: data.participantesExternos.join(),
            unidadAcademica: data.unidadAcademica,
            area: data.area,
            porcentajeEjecucionCorte: data.porcentajeEjecucionCorte,
            grupoInvestigacionPro: data.grupoInvestigacionPro,
            porcentajeEjecucionFinCorte: data.porcentajeEjecucionFinCorte,
            porcentajeAvance: data.porcentajeAvance,
            observacion: data.observacion,
            Soporte: data.Soporte,
            origen: data.origen,
            convocatoria: data.convocatoria,
            modalidad: data.modalidad,
            nivelRiesgoEtico: data.nivelRiesgoEtico,
            lineaInvestigacion: data.lineaInvestigacion,
            estadoProceso: data.estadoProceso,
            estadoProyecto: this.estadosProyectos.filter(x => x.id == data.estado)[0].estado,
            producto: data.producto,
            created_at: data.created_at,
            updated_at: data.updated_at
          };
        });
      },
      (error) => {
        console.error('Error al obtener proyectos:', error);
      }
    );
  }

  obtenerProductos() {
    this.proyectoyproductoService.getProductos().subscribe(
      (producto) => {        
        const dataSort = producto.sort((a, b) => (a.id < b.id ? -1 : 1));
        this.dataSourceProducto.data = dataSort.map(data => {
          return {
            id: data.id,
            investigador: data.investigador,
            estadoProceso: data.estadoProceso,
            estadoProducto: this.estadosProductos.filter(x => x.id == data.estadoProducto)[0].estado,
            created_at: data.created_at,
            updated_at: data.updated_at,
          };
        });
        this.productosData = dataSort.map(data => {
          return {
            id: data.id,
            Soporte: data.Soporte,
            tituloProducto: data.tituloProducto,
            investigador: data.investigador,
            coinvestigador: data.coinvestigador.join(),
            estudiantes: data.estudiantes.join(),
            participantesExternos: data.participantesExternos.join(),
            publicacion: data.publicacion,
            porcentanjeAvanFinSemestre: data.porcentanjeAvanFinSemestre,
            observaciones: data.observaciones,
            porcentajeComSemestral: data.porcentajeComSemestral,
            porcentajeRealMensual: data.porcentajeRealMensual,
            fecha: data.fecha,
            origen: data.origen,
            observacion: data.observacion,
            estadoProceso: data.estadoProceso,
            estadoProducto: this.estadosProductos.filter(x => x.id == data.estadoProducto)[0].estado,
            created_at: data.created_at,
            updated_at: data.updated_at,
          };
        });
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  obtenerUsuarios() {
    this.investigadorService.getUsuarios().subscribe(
      (usuarios) => {
        const dataSort = usuarios.sort((a, b) => (a.nombre < b.nombre ? -1 : 1));
        this.dataSourceInvestigador.data = dataSort;
        this.investigadoresData = dataSort.map(data => {
          return {
            tipodocumento: data.tipodocumento,
            numerodocumento: data.numerodocumento,
            correo: data.correo,
            nombre: data.nombre,
            apellidos: data.apellidos,
            estado: data.estado ? 'Activo' : 'Inactivo',
            horasestricto: data.horasestricto,
            horasformacion: data.horasformacion,
            categoriaminciencias: data.categoriaminciencias,
            rolinvestigador: data.rolinvestigador,
            created_at: data.created_at,
            updated_at: data.updated_at
          };
        });
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  obtenerEstadosProyecto() {
    this.proyectoyproductoService.obtenerEstadosProyecto().subscribe(
      (proyecto) => {
        this.estadosProyectos = proyecto;
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  obtenerEstadosProducto() {
    this.proyectoyproductoService.obtenerEstadosProducto().subscribe(
      (producto) => {
        this.estadosProductos = producto;
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  exportAsXLSX(data: any = undefined, tipo: string): void {
    let filter: any[] = [];
    switch(tipo) { 
      case 'Proyectos': {
        if(data == undefined){
          filter = this.proyectosData;
        } else {
          filter = this.proyectosData.filter(x => x.codigo == data.codigo);
        }
        break; 
      } 
      case 'Productos': {
        if(data == undefined){
          filter = this.productosData;
        } else {
          filter = this.productosData.filter(x => x.id == data.id);
        }
        break; 
      } 
      default: {        
        if(data == undefined){
          filter = this.investigadoresData;
        } else {
          filter = this.investigadoresData.filter(x => x.numerodocumento == data.numerodocumento);
        }
        break; 
      } 
    } 
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filter);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, tipo);
    XLSX.writeFile(wb, `Reporte${tipo}.xls`);
  }

  openDialogoEstadistica(data: any = undefined, type:string, detail:boolean): void {
    const dialogRef = this.dialog.open(DialogoEstadisticaComponent, {
      data: {
        type: type,
        data: data,
        detail: detail,
      },
      width: '60%'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      } 
    });
  }

  //PLAN DE TRABAJO
  openDialogoPlanTrabajo(data: any = undefined, type:string, detail:boolean): void {
    const dialogRef = this.dialog.open(DialogoPlanDeTrabajoComponent, {
      data: {
        type: type,
        data: data,
        detail: detail,
      },
      width: '20%'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      } 
    });
  }

  openDialogoInformacionPlanTrabajo(data: any = undefined, type:string, detail:boolean): void {
    const dialogRef = this.dialog.open(DialogoInformacionPlanTrabajoComponent, {
      data: {
        type: type,
        data: data,
        detail: detail,
      },
      width: '80%'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      } 
    });
  }

  obtenerPlanTrabajo() {
    this.proyectoyproductoService.getconfigplanTrabajo().subscribe(data => {
      console.log("verificar:", data); // Verifica los datos recibidos
      const dataProject = data.reverse();
      this.item = dataProject.map(x => ({
        id: x.id,
        plan: x.titulo,
        estado: x.estado,
      }));
      console.log("asignacion:", this.item); // Verifica la asignación de datos
    });
  }

  cambiarEstadoPlanTrabajo(item: any): void {
    // Asegúrate de que 'item' tenga el campo 'id'
    if (!item.id) {
      console.error('ID del plan de trabajo no está definido');
      return;
    }
    
    // Cambia el estado
    item.estado = !item.estado;
  
    // Llama al servicio para actualizar el estado
    this.proyectoyproductoService.editarconfigplanTrabajo(item).subscribe(
      () => {
        this._snackBar.open('Registro actualizado correctamente', 'Estado', {
          duration: 2000,
        });
        console.log('Estado actualizado correctamente');
        this.ngOnInit(); // Refresca los datos
      },
      (error) => {
        console.error('Error al actualizar estado:', error);
      }
    );
  }
  
}
