import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/enviroments';
import { ApiResponse, OtPedidoDto } from '../../../../models/general/general';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanoService {

  private baseUrl = `${environment.apiUrl}`;
 
   constructor(private http: HttpClient) { }

   obtenerEstadoDiseno(dto: OtPedidoDto) {
    return this.http.post<{ resultado: { estadoTerminadoDiseño: boolean } }>(
      `${this.baseUrl}/frmPrincipal/ObtenerEstadoDiseno`,
      dto
    );
  }

  cargarInfoPlano(dto: OtPedidoDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/frmPrincipal/CargarInfoPlano`, dto);
  }
  
}
