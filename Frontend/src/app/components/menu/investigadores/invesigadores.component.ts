import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AutenticacionService } from '../services/autenticacion';
import { SearchService } from '../services/search.service';
import { DialogoNotificacionesComponent } from '../administrador/dialogo-notificaciones/dialogo-notificaciones.component';
import { UsuarioSesion } from '../modelo/usuario';
import { InvestigadorService } from '../services/registroInvestigador';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PerfilAdministradorComponent } from '../administrador/perfil-administrador/perfil-administrador.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-invesigadores',
  templateUrl: './invesigadores.component.html',
  styleUrls: ['./invesigadores.component.css'],
  standalone: true,
  imports: [
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    MatInputModule, 
    MatFormFieldModule,
    RouterModule,
    PerfilAdministradorComponent,
    MatBadgeModule,
    MatMenuModule,
    CommonModule,
    MatDialogModule,
    MatTooltipModule
  ],
})

export class InvesigadoresComponent implements OnInit {
  usuarios: any[] = [];
  notificaciones: any[] = [];
  notificacionesHistorial: any[] = [];

  constructor(
    private searchService: SearchService, 
    private AutenticacionService:AutenticacionService,
    private investigadorService: InvestigadorService,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit() {
    this.obtenerDatosUsuarioSesion();
    this.obtenerNotificaciones();
  }

  onSearchInputChange(event: any) {
    this.searchService.setSearchQuery(event.target.value);
  }

  usuarioSesion!: UsuarioSesion;
  obtenerDatosUsuarioSesion(){
    this.usuarioSesion = this.AutenticacionService.obtenerDatosUsuario();
  }

  obtenerNotificaciones() {
    /**
     * Obtiene las notificaciones del servicio y las filtra para el usuario actual.
     * 
     * Filtra las notificaciones activas y las ordena por ID en orden descendente.
     * También filtra todas las notificaciones del usuario para el historial y las ordena.
     */
    this.investigadorService.getNotifications().subscribe(
      (data) => {
        // Filtra las notificaciones activas del usuario y las ordena por ID en orden descendente
        this.notificaciones = data
          .filter(x => x.destinatario === this.usuarioSesion.numerodocumento && x.estado)
          .sort((a, b) => (Number(a.id) > Number(b.id) ? -1 : 1));
        
        // Filtra todas las notificaciones del usuario para el historial y las ordena por ID en orden descendente
        this.notificacionesHistorial = data
          .filter(x => x.destinatario === this.usuarioSesion.numerodocumento)
          .sort((a, b) => (Number(a.id) > Number(b.id) ? -1 : 1));
      },
      (error) => {
        // Manejo de errores al obtener las notificaciones
        console.error('Error al obtener notificaciones:', error);
      }
    );
  }
  
  openDialogoNotificaciones(): void {
    /**
     * Abre el diálogo de notificaciones.
     * 
     * Pasa el título, el texto del botón y el historial de notificaciones como datos al componente de diálogo.
     * El diálogo no se puede cerrar haciendo clic fuera de él.
     */
    const dialogRef = this.dialog.open(DialogoNotificacionesComponent, {
      data: {
        title: 'Notificaciones',
        buttonTitle: 'CREAR',
        data: this.notificacionesHistorial
      },
      disableClose: true,
    });
  
    // Suscribe a la acción después de cerrar el diálogo
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Aquí se puede manejar el resultado del diálogo si es necesario
      }
    });
  }
  
  limpiarNotificacion(notificacion: any) {
    /**
     * Marca una notificación como leída.
     * 
     * Llama al servicio para marcar la notificación como leída y actualiza las notificaciones del componente.
     * 
     * @param notificacion La notificación a marcar como leída.
     */
    this.investigadorService.leerNotificacion(notificacion).subscribe(
      (data) => {
        // Re-inicializa las notificaciones después de marcar una como leída
        this.ngOnInit();
      },
      (error) => {
        // Manejo de errores al marcar la notificación como leída
        console.error('Error al obtener notificaciones:', error);
      }
    );
  }
  

  navigateSection(route:string): any {
    this.router.navigate([route]);
  }

  logout() {
    this.AutenticacionService.logout(); // Llama al método logout() del servicio de autenticación
  }
}
