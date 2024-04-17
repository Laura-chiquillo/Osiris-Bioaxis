import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { InvestigadorService } from '../../services/registroInvestigador';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { ProyectoyproductoService } from '../../services/proyectoyproducto';
import { MatSelectModule } from '@angular/material/select';
import { Proyecto } from '../../modelo/proyectos';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
<<<<<<< HEAD
import { DialogoTramiteComponent } from './dialogo-tramite/dialogo-tramite.component';
=======
import { DialogoTramiteEntregableAdministrativoComponent } from './dialogo-tramite-entregable-administrativo/dialogo-tramite-entregable-administrativo.component';
>>>>>>> 8bd70567e23323eb2780f7fba66adc602428f485
import Swal from 'sweetalert2'
import { DialogoConsultaEntregableAdministrativoComponent } from './dialogo-consulta-entregable-administrativo/dialogo-consulta-entregable-administrativo.component';
@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css'],
  standalone: true,
  imports: [
    MatTabsModule, 
    MatSlideToggleModule, 
    MatDividerModule, 
    MatListModule, 
    MatMenuModule, 
    MatButtonModule,
    CommonModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule],
})
export class ControlComponent {
  usuarios: any[] = [];
  estadosProyectos: any[] = [];
  estadosProductos: any[] = [];

  dataSource: MatTableDataSource<any>;
  dataSourceProyecto: MatTableDataSource<any>;
  dataSourceProducto: MatTableDataSource<any>;
  expandedElement: any | null;

<<<<<<< HEAD
=======

  estadosProceso: string[] = [
    'Aprobado',
    'Rechazado',
    'Corregir',
    'Espera'
  ];

>>>>>>> 8bd70567e23323eb2780f7fba66adc602428f485
  constructor(
    private investigadorService: InvestigadorService, 
    private searchService: SearchService,
    private proyectoyproductoService: ProyectoyproductoService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) {
    
    this.dataSource = new MatTableDataSource<any>([]);
    this.dataSourceProyecto = new MatTableDataSource<any>([]);
    this.dataSourceProducto = new MatTableDataSource<any>([]);
  }

  ngOnInit() {
    this.obtenerUsuarios();
    this.obtenerProyectos();
    this.obtenerProductos();
<<<<<<< HEAD
    this.obtenerEstadosProyecto();
    this.obtenerEstadosProducto();
=======
>>>>>>> 8bd70567e23323eb2780f7fba66adc602428f485
    this.searchService.getSearchQuery().subscribe(query => {
      this.dataSource.filter = query.trim().toLowerCase();
      this.dataSourceProyecto.filter = query.trim().toLowerCase();
      this.dataSourceProducto.filter = query.trim().toLowerCase();
    });
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

  obtenerUsuarios() {
    this.investigadorService.getUsuarios().subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
        const dataSort = usuarios.sort((a, b) => (a.nombre < b.nombre ? -1 : 1))
        this.dataSource.data = dataSort;
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }
  obtenerProyectos() {
    this.proyectoyproductoService.getProyectos().subscribe(
      (proyecto) => {
        const dataSort = proyecto.sort((a, b) => (a.codigo < b.codigo ? -1 : 1))
        this.dataSourceProyecto.data = dataSort;
      },
      (error) => {
        console.error('Error al obtener proyectos:', error);
      }
    );
  }

  obtenerProductos() {
    this.proyectoyproductoService.getProductos().subscribe(
<<<<<<< HEAD
      (producto) => {        
        const dataSort = producto.sort((a, b) => (a.id < b.id ? -1 : 1))
=======
      (producto) => {
        console.log('obtenerProductos => ',producto)
        const dataSort = producto.sort((a, b) => (a.codigo < b.codigo ? -1 : 1))
>>>>>>> 8bd70567e23323eb2780f7fba66adc602428f485
        this.dataSourceProducto.data = dataSort;
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  cambiarRol(usuario: any, nuevoRol: string) {
    usuario.rolinvestigador = nuevoRol;
    this.investigadorService.actualizarInvestigador(usuario).subscribe(
      () => {
        this._snackBar.open('Registro actualizado correctamente',  'Rol',{
          duration: 2000,
        });
        console.log('Rol actualizado correctamente');
        this.ngOnInit();
      },
      (error) => {
        console.error('Error al actualizar rol:', error);
      }
    );
  }

  cambiarEstadoInvestigador(usuario: any) {
    usuario.estado = !usuario.estado; // Cambiar estado
    this.investigadorService.actualizarInvestigador(usuario).subscribe(
      () => {
        this._snackBar.open('Registro actualizado correctamente', 'Estado',{
          duration: 2000,
        });
        console.log('Estado actualizado correctamente');
        this.ngOnInit();
      },
      (error) => {
        console.error('Error al actualizar estado:', error);
      }
    );
  }

  cambiarEstadoProyecto(data: any,proyecto: Proyecto): void {
<<<<<<< HEAD
    proyecto.estado = data;
=======
    proyecto.estadoProceso = data;
>>>>>>> 8bd70567e23323eb2780f7fba66adc602428f485
    this.proyectoyproductoService.actualizarProyecto(proyecto).subscribe(
      () => {
        this._snackBar.open('Registro actualizado correctamente', 'Estado',{
          duration: 2000,
        });
        console.log('Estado actualizado correctamente');
        this.ngOnInit();
      },
      (error) => {
        console.error('Error al actualizar estado:', error);
      }
    );
  }

  cambiarEstadoProducto(data: any,producto: any): void {
<<<<<<< HEAD
    producto.estadoProducto = data;
=======
    producto.estadoProceso = data;
>>>>>>> 8bd70567e23323eb2780f7fba66adc602428f485
    this.proyectoyproductoService.actualizarProducto(producto).subscribe(
      () => {
        this._snackBar.open('Registro actualizado correctamente', 'Estado',{
          duration: 2000,
        });
        console.log('Estado actualizado correctamente');
        this.ngOnInit();
      },
      (error) => {
        console.error('Error al actualizar estado:', error);
      }
    );
  }

<<<<<<< HEAD
  openDialogoTramite(data: any, tipo:string): void {
    const dialogRef = this.dialog.open(DialogoTramiteComponent, {
      data: {
        title: 'Tramitar '+tipo,
=======
  openDialogEntregableAdministrativo(data: any, tipo:string): void {
    const dialogRef = this.dialog.open(DialogoTramiteEntregableAdministrativoComponent, {
      data: {
        title: 'Entregable Administrativo',
>>>>>>> 8bd70567e23323eb2780f7fba66adc602428f485
        buttonTitle: 'CREAR',
        type:tipo,
        data:data,
      },
<<<<<<< HEAD
      width: '15%',
=======
      width: '30%',
>>>>>>> 8bd70567e23323eb2780f7fba66adc602428f485
      disableClose: true,
      panelClass: 'custom-modalbox',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        Swal.fire({
          title: 'Registro Exitoso !!!',
          text: 'Se ha registrado una notificación',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        
      } 
    });
  }

  openDialogHistorialEntregableAdministrativo(data: any, tipo:string): void {
    const dialogRef = this.dialog.open(DialogoConsultaEntregableAdministrativoComponent, {
      data: {
        title: 'Historial Entregable Administrativo',
        buttonTitle: 'CREAR',
        type:tipo,
        data:data,
      },
      width: '30%',
      disableClose: true,
      panelClass: 'custom-modalbox',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        Swal.fire({
          title: 'Registro Exitoso !!!',
          text: 'Se ha registrado una notificación',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        
      } 
    });
  }
}