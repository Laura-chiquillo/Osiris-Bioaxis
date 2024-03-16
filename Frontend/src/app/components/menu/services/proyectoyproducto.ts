import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
    
    
    
  private apiUrl2 = 'http://localhost:8000/CrearProducto';
  crearProducto(producto: Producto): Observable<Producto> {
    console.log(producto)
    return this.http.post<Producto>(this.apiUrl2, producto);
  }

}