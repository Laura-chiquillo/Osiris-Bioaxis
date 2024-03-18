import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Producto } from '../modelo/productos';
import { Proyecto } from '../modelo/proyectos';

@Injectable({
  providedIn: 'root' // Asegúrate de tener este providedIn en tu servicio
})

export class ProyectoyproductoService {

  //Mostrar proyectos y productos
  private apiUrl3 = 'http://localhost:8000/proyecto';

  getProyectos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl3}`);
  }
  
  private apiUrl4 = 'http://localhost:8000/producto';
  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl4}`);
  }

  //Crear proyectos y productos
    private apiUrl = 'http://localhost:8000/CrearProyecto';
    
    constructor(private http: HttpClient) { }
    
    crearProyecto(proyecto: Proyecto): Observable<Proyecto> {
      return this.http.post<Proyecto>(this.apiUrl, proyecto);
  }
    
    
    
  private apiUrl2 = 'http://localhost:8000/CrearProducto';
  crearProducto(producto: Producto): Observable<Producto> {
    const datos = { producto };
    console.log(datos);
    return this.http.post<Producto>(this.apiUrl2, datos);
  }
  

}