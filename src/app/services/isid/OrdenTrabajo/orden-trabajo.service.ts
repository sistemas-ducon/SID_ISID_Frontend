import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/enviroments';
import { Pedido } from '../../../models/isid/OrdenTrabajo/pedido.dto';
import { InfoPedido } from '../../../models/isid/OrdenTrabajo/info-pedido.dto';
import { documentacionPedido } from '../../../models/isid/OrdenTrabajo/documentacionpedido';
import { equivalenciaDeCodigos } from '../../../models/isid/OrdenTrabajo/equivalenciaDeCodigos.dto';
import { InsumosPlano } from '../../../models/isid/OrdenTrabajo/insumosPlano.dto';
import { DespiecePlano } from '../../../models/isid/OrdenTrabajo/despiece.dto';
import { Compra, ProveedorActualizarDto, ProveedorDto, ProveedorInsertarDto } from '../../../models/isid/OrdenTrabajo/compras.dto';
import { ModulosMedidasFinales, MedidasCorteProduccion } from '../../../models/isid/OrdenTrabajo/produccion.dto';
import { ApiResponse } from '../../../models/isid/OrdenTrabajo/produccion.dto';
import { Mo } from '../../../models/isid/OrdenTrabajo/mo.dto';
import { SimulacionRegistroResponse } from '../../../models/isid/OrdenTrabajo/regpedido';

@Injectable({
  providedIn: 'root'
})
export class OrdenTrabajoService {
  private apiUrl = `${environment.apiUrl}/OrdenTrabajo`;

  constructor(private http: HttpClient) {}

  obtenerPedidos(ot: string): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/ObtenerPedidos/${ot}`);
  }

  obtenerInfoPedido(idOT: string, consecutivoPedido: string): Observable<InfoPedido> {
    return this.http.get<InfoPedido>(`${this.apiUrl}/ObtenerInfoPedido/${idOT}/${consecutivoPedido}`);
  }

  descargarArchivo(OT: string, nombreArchivo: string, IdDocumento: number, nombreUsuario: string): Observable<Blob> {
    const params = new HttpParams()
      .set('OT', OT)
      .set('nombreArchivo', nombreArchivo)
      .set('IdDocumento', IdDocumento.toString())
      .set('nombreUsuario', nombreUsuario);

    return this.http.get(`${this.apiUrl}/DescargarArchivoOT`, {
      params,
      responseType: 'blob' // Importante para descargar archivos
    });
  }

  subirArchivo(
    idOT: string,
    consecutivoPedido: string,
    archivo: File,
    observacion: string,
    usuario: string
  ): Observable<any> {
    const formData = new FormData();
    formData.append('IdOT', idOT);
    formData.append('ConsecutivoPedido', consecutivoPedido);
    formData.append('Archivo', archivo, archivo.name); // <- Aquí está bien
    formData.append('Observacion', observacion);
    formData.append('Usuario', usuario);
  
    return this.http.post(`${this.apiUrl}/Archivos`, formData, {
      headers: {
        'Accept': 'application/json' // No incluir 'Content-Type', FormData lo maneja automáticamente
      }
    });
  }
  
  obtenerProcesosProduccion(cedula: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ObtenerProcesosProduccion/${cedula}`);
  }

  obtenerReporte(proceso: string, otBuscar: string, nombreObraBuscar: string, impresion: boolean,todasProgramadas: boolean): Observable<any> {
    const requestBody = {
      impresion: impresion,
      todasProgramadas: todasProgramadas,
      otBuscar: otBuscar,
      nombreObraBuscar: nombreObraBuscar,
      descripcionProceso: proceso,
      terminadoDiseno: false,
      procesoBase: false
    };    
  
    return this.http.post<any>(`${this.apiUrl}/ObtenerReporteProgramacionProcesos`, requestBody);
  }
  

  obtenerDocumentacionOT(idOT: string, consecutivoPedido: string): Observable<documentacionPedido> {
    return this.http.get<documentacionPedido>(`${this.apiUrl}/ObtenerDocumentacionOT/${idOT}/${consecutivoPedido}`);
  }

  obtenerEquivalenciaCodigos(): Observable<equivalenciaDeCodigos> {
    return this.http.get<equivalenciaDeCodigos>(`${this.apiUrl}/ObtenerEquivalenciaCodigos`);
  }

  ObtenerDespiecePlano(idOT: string, consecutivoPedido: string): Observable<ApiResponse<{ despiecePlano: DespiecePlano[] }>> {
    return this.http.get<ApiResponse<{ despiecePlano: DespiecePlano[] }>>(`${this.apiUrl}/ObtenerDespiecePlano/${idOT}/${consecutivoPedido}`);
  }
  
  
  
  obtenerReporteInsumosPlano(plano: string): Observable<InsumosPlano> {
    return this.http.get<InsumosPlano>(`${this.apiUrl}/obtenerReporteInsumosPlano/${plano}`);
  }
  
  eliminarArchivo(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/EliminarArchivo`, payload);
  }

  obtenerCompras(idOT: string, consecutivoPedido: string) {
    const url = `${this.apiUrl}/ObtenerCompras/${idOT}/${consecutivoPedido}`;
    return this.http.get<{ resultado: { compras: Compra[] } }>(url);
  }  
  

obtenerReporteModulosMedidas(idOT: string, consecutivoPedido: string): Observable<ApiResponse<{ modulosMedidasFinales: ModulosMedidasFinales[], medidasCorteProduccion: MedidasCorteProduccion[] }>> {
  return this.http.get<ApiResponse<{ modulosMedidasFinales: ModulosMedidasFinales[], medidasCorteProduccion: MedidasCorteProduccion[] }>>(
    `${this.apiUrl}/ObtenerReporteModulosMedidas/${idOT}/${consecutivoPedido}`
  );
}

obtenerManoObra(idOT: string, consecutivoPedido: string): Observable<ApiResponse<{ manoObra: Mo[] }>> {
  return this.http.get<ApiResponse<{ manoObra: Mo[] }>>(
    `${this.apiUrl}/ObtenerManoObra/${idOT}/${consecutivoPedido}`
  );
}

obtenerInfoProveedores(): Observable<ApiResponse<ProveedorDto[]>> {
  return this.http.get<ApiResponse<ProveedorDto[]>>(`${this.apiUrl}/ObtenerInfoProveedor`);
}


insertarProveedor(dto: ProveedorInsertarDto) {
  return this.http.post<any>(`${this.apiUrl}/InsertarProveedor`, dto);
}

actualizarProveedor(dto: ProveedorActualizarDto) {
  return this.http.put<any>(`${this.apiUrl}/ActualizarProveedor`, dto);
}

simularRegistro(plano: string, otId: string): Observable<SimulacionRegistroResponse> {
  const params = new HttpParams()
    .set('plano', plano)
    .set('otId', otId);

  return this.http.get<SimulacionRegistroResponse>(`${this.apiUrl}/simular-registro`, { params });
}

}
