import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Producto } from '../modelo/productos';
import { Proyecto } from '../modelo/proyectos';

@Injectable({
  providedIn: 'root' // Asegúrate de tener este providedIn en tu servicio
})

export class ProyectoyproductoService {
    private apiUrl = 'http://localhost:8000/CrearProyecto';
    
    constructor(private http: HttpClient) { }
    
    crearProyecto(proyecto: Proyecto): Observable<Proyecto> {
      return this.http.post<Proyecto>(this.apiUrl, proyecto);
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