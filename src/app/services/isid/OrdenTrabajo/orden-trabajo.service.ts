import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/enviroments';
import { Pedido } from '../../../models/isid/OrdenTrabajo/pedido.dto';
import { Proceso } from '../../../models/isid/OrdenTrabajo/proceso.dto';
import { InfoPedido } from '../../../models/isid/OrdenTrabajo/info-pedido.dto';
import { documentacionPedido } from '../../../models/isid/OrdenTrabajo/documentacionpedido';
import { equivalenciaDeCodigos } from '../../../models/isid/OrdenTrabajo/equivalenciaDeCodigos.dto';
import { InsumosPlano } from '../../../models/isid/OrdenTrabajo/insumosPlano.dto';

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

  obtenerReporte(proceso: string): Observable<any> {
    const requestBody = {
      impresion: false,
      todasProgramadas: false,
      otBuscar: "",
      nombreObraBuscar: "",
      descripcionProceso: proceso,  // Aquí se asigna el proceso seleccionado
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
  
  obtenerReporteInsumosPlano(plano: string): Observable<InsumosPlano> {
    return this.http.get<InsumosPlano>(`${this.apiUrl}/obtenerReporteInsumosPlano/${plano}`);
  }
  
}
