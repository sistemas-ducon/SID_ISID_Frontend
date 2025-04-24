import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/enviroments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, asesores, Pedidos, sede } from '../../../models/general/general';
import { fechaDespacho, infoCliente, infoOT, plano, reporteContable } from '../../../models/isid/frmprincipal/frmPrincipal';

@Injectable({
  providedIn: 'root'
})
export class FrmPrincipalService {

   private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }


 // servicio para consumir el endpoint de pedidos
 obtenerPedidos(idOT: string): Observable<ApiResponse<Pedidos[]>> {
  return this.http.get<ApiResponse<Pedidos[]>>(`${this.baseUrl}/General/ObtenerPedidos/${idOT}`);
}

  obtenerInfoPedido(idOT: string, consecutivoPedido: number): Observable<ApiResponse<{ 
    infoOT: infoOT; 
    fechaDespacho: fechaDespacho[]; 
    infoCliente: infoCliente; 
    plano: plano; 
    reporteContable: reporteContable[];
      }>> {
        return this.http.get<ApiResponse<{ 
          infoOT: infoOT; 
          fechaDespacho: fechaDespacho[]; 
          infoCliente: infoCliente; 
          plano: plano; 
          reporteContable: reporteContable[];
        }>>(`${this.baseUrl}/frmPrincipal/ObtenerInfoPedido/${idOT}/${consecutivoPedido}`);

  }

  obstenerSedes(): Observable<ApiResponse<sede[]>> {
    return this.http.get<ApiResponse<sede[]>>(`${this.baseUrl}/General/ObtenerSedes`);
  }

   // servicio para consumir el endpoint de pedidos
   obtenerAsesores(): Observable<ApiResponse<{ asesores: asesores[] }>> {
    return this.http.get<ApiResponse<{ asesores: asesores[] }>>(`${this.baseUrl}/General/ObtenerAsesores`);
  }



}
