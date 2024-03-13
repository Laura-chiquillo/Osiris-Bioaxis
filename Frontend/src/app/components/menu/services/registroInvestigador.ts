import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Investigador } from '../modelo/investigador';

@Injectable({
  providedIn: 'root' // Asegúrate de tener este providedIn en tu servicio
})
export class InvestigadorService {
  private apiUrl = 'http://localhost:8000/investigador'; 

  constructor(private http: HttpClient) { }

  // mostrar la informacion de todos los investigadores
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  //registro
  registrarInvestigador(nuevoInvestigador: Investigador): Observable<Investigador> {
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    return this.http.post<Investigador>(this.apiUrl, nuevoInvestigador, httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error al realizar la solicitud:', error);
          return throwError(error);
        })
      );
  }
  actualizarInvestigador(investigador: Investigador) {

    const url = `${this.apiUrl}/${investigador.numerodocumento}`;
  
    return this.http.put(url, investigador).pipe(
  
      catchError(error => {
  
        if(error instanceof HttpErrorResponse) {
  
          switch (error.status) {
            case 404:
              // El investigador no existe
              return throwError('Investigador no encontrado');
  
            case 400:
              // Datos inválidos
              return throwError('Datos de investigador inválidos'); 
  
            default:
              return throwError('Error al actualizar investigador');
          
          }
  
        }
  
        return throwError('Error desconocido');
  
      })
  
    );
  
  }

}