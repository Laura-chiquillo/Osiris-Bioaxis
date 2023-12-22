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

}