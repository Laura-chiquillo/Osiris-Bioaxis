import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.css'],
  standalone: true,
  imports: [MatTabsModule, MatSlideToggleModule, MatDividerModule, MatListModule, MatMenuModule, MatButtonModule, MatTableModule, MatPaginatorModule],
})
export class EstadosComponent {
  displayedColumns = ['Nombre', 'Rol', 'Estado', 'Fecha'];
  dataSource = ELEMENT_DATA;
  
  displayedColumns2 = ['Nombre', 'Lider', 'Estado', 'Fecha'];
  dataSource2 = ELEMENT_DATA2;

  displayedColumns3 = ['Nombre', 'Lider', 'Estado', 'Fecha'];
  dataSource3 = ELEMENT_DATA3;
}

export interface PeriodicElement {
  Nombre: string;
  Rol: String;
  Estado: String;
  Fecha: string;
  }

export interface PeriodicElement2 {
  Nombre: string;
  Lider: String;
  Estado: String;
  Fecha: string;
}

export interface PeriodicElement3 {
  Nombre: string;
  Lider: String;
  Estado: String;
  Fecha: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Nombre: 'Laura', Rol: 'Hydrogen', Estado:'Activo', Fecha: 'H'},
  {Nombre: 'Laura', Rol: 'Hydrogen', Estado:'Activo', Fecha: 'H'},
  {Nombre: 'Laura', Rol: 'Hydrogen', Estado:'Activo', Fecha: 'H'},
  {Nombre: 'Laura', Rol: 'Hydrogen', Estado:'Activo', Fecha: 'H'},
  {Nombre: 'Laura', Rol: 'Hydrogen', Estado:'Activo', Fecha: 'H'},
  {Nombre: 'Laura', Rol: 'Hydrogen', Estado:'Activo', Fecha: 'H'},
  {Nombre: 'Laura', Rol: 'Hydrogen', Estado:'Activo', Fecha: 'H'},
];

const ELEMENT_DATA2: PeriodicElement2[] = [
  {Nombre: 'IOT', Lider: 'Hydrogen', Estado:'Activo', Fecha: 'H'},
  {Nombre: 'IOT', Lider: 'Hydrogen', Estado:'Activo', Fecha: 'H'},
  {Nombre: 'IOT', Lider: 'Hydrogen', Estado:'Activo', Fecha: 'H'},
  {Nombre: 'IOT', Lider: 'Hydrogen', Estado:'Activo', Fecha: 'H'},
  {Nombre: 'IOT', Lider: 'Hydrogen', Estado:'Activo', Fecha: 'H'},
  {Nombre: 'IOT', Lider: 'Hydrogen', Estado:'Activo', Fecha: 'H'},
  {Nombre: 'IOT', Lider: 'Hydrogen', Estado:'Activo', Fecha: 'H'},
];

const ELEMENT_DATA3: PeriodicElement3[] = [
  {Nombre: 'IOT', Lider: 'Laura', Estado:'Activo', Fecha: 'H'},
  {Nombre: 'IOT', Lider: 'Laura', Estado:'Activo', Fecha: 'H'},
  {Nombre: 'IOT', Lider: 'Laura', Estado:'Activo', Fecha: 'H'},
  {Nombre: 'IOT', Lider: 'Laura', Estado:'Activo', Fecha: 'H'},
  {Nombre: 'IOT', Lider: 'Laura', Estado:'Activo', Fecha: 'H'},
  {Nombre: 'IOT', Lider: 'Laura', Estado:'Activo', Fecha: 'H'},
  {Nombre: 'IOT', Lider: 'Laura', Estado:'Activo', Fecha: 'H'},
];