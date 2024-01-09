import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AutenticacionService {

    apiUrl = 'http://localhost:8000/custom-token-auth/';

    constructor(private http: HttpClient) { }

    login(correo: string, contrasena: string): Observable<any> {
        const body = {
          correo: correo,
          contrasena: contrasena
        };
    
        return this.http.post<any>(this.apiUrl, body);
      }
    
      // Método para guardar los datos del perfil del usuario en el LocalStorage
      guardarDatosUsuario(userData: any): void {
        localStorage.setItem('userData', JSON.stringify(userData));
      }
    
      // Método para obtener los datos del perfil del usuario almacenados en el LocalStorage
      obtenerDatosUsuario(): any {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData) : null;
      }
}
