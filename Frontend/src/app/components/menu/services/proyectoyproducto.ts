import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Producto } from '../modelo/productos';
import { Proyecto } from '../modelo/proyectos';

@Injectable({
  providedIn: 'root' // Asegúrate de tener este providedIn en tu servicio
})

export class ProyectoyproductoService {
    private apiUrl = 'http://localhost:8000/proyecto';
    
    constructor(private http: HttpClient) { }
    
    crearProyecto(proyecto: Proyecto, archivoProyecto: File, archivoProducto: File): Observable<Proyecto> {
      // Crear un FormData y agregar los datos del proyecto
      const formData = new FormData();
      formData.append('codigo', proyecto.codigo || '');
      formData.append('fecha', proyecto.fecha ? new Date(proyecto.fecha).toISOString() : '');
      formData.append('titulo', proyecto.titulo || '');
      formData.append('investigadores', proyecto.investigador || '');
      formData.append('unidadAcademica', proyecto.unidadAcademica || '');
      formData.append('area', proyecto.area || '');
      formData.append('porcentajeEjecucionCorte', proyecto.porcentajeEjecucionCorte ? proyecto.porcentajeEjecucionCorte.toString() : '');
      formData.append('entidadPostulo', proyecto.entidadPostulo || '');
      formData.append('financiacion', proyecto.financiacion || '');
      formData.append('grupoInvestigacionPro', proyecto.grupoInvestigacionPro || '');
      formData.append('porcentajeEjecucionFinCorte', proyecto.porcentajeEjecucionFinCorte ? proyecto.porcentajeEjecucionFinCorte.toString() : '');
      formData.append('porcentajeAvance', proyecto.porcentajeAvance ? proyecto.porcentajeAvance.toString() : '');
      formData.append('transacciones', proyecto.transacciones || '');
      formData.append('origen', proyecto.origen || '');
      formData.append('convocatoria', proyecto.convocatoria || '');
      formData.append('ubicacionProyecto', proyecto.ubicacionProyecto || '');
      formData.append('estadoProyecto', proyecto.estadoProyecto || '');
      formData.append('modalidadProyecto', proyecto.modalidadProyecto || '');
      formData.append('nivelRiesgoEtico', proyecto.nivelRiesgoEtico || '');
      formData.append('lineaInvestigacion', proyecto.lineaInvestigacion || '');
    
      // Agregar el archivo adjunto del proyecto
      formData.append('Soporte', archivoProyecto, archivoProyecto.name);
      
      // Agregar el archivo adjunto del producto
      formData.append('producto.soporte', archivoProducto, archivoProducto.name);
      
      // Establecer las cabeceras necesarias para el envío de archivos
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
    
      // Realizar la solicitud POST al backend
      return this.http.post<Proyecto>(this.apiUrl, formData, { headers });
    }
    
    
    
    //crear producto
    private apiUrl2 = 'http://localhost:8000/producto';
  crearProducto(nuevoProducto: Producto): Observable<Producto> {
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    return this.http.post<Producto>(this.apiUrl2, nuevoProducto, httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error al realizar la solicitud:', error);
          return throwError(error);
        })
      )
}
}