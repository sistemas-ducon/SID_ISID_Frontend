import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class ObservacionesService {
  private apiUrl = `${environment.apiUrl}/ObservacionesOrdenTrabajo`;

  constructor(private http: HttpClient) {}

  obtenerObservacionesPersonales(cedula: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ObtenerObservacionesPersonales/${cedula}`);
  }
}

