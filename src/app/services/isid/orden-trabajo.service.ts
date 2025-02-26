import { Injectable } from '@angular/core';
import { HttpClient,HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pedido {
  consecutivoPedido: number;
  t_ped: string;
  asesor: string;
}

export interface Proceso {
  idArea: number;
  descripcionProceso: string;
  base: boolean;
}


export interface InfoPedido {
  ot: {
    descripcionTipoPedido: string;
    asesor: string;
    cliente: string;
    nombreObra: string;
    dirección: string;
    región: string;
    país: string;
    ciudad: string;
    telDomicilio: string;
    personaReceptora: string;
    mailContacto: string;
    observacionPedido: string;
    fechaConfirmacionVenta: string;
    fechaEntregaProduccion: string;
    fechaEntregaDibujoDespiece: string;
    fechaEmpaque: string;
    fechaEmpaqueVenta: string;
    fechaTerminadaEmpaque: string;
    fechaTerminadaDespacho: string;
    fechaFactura: string;
    fechaFinalInstalacion: string | null;
    fabricadoPor: string;
  };
  infoPlano: {
    dibujante: string;
    plano: string;
  };
  fechaDespacho: {
    despachoCoordinado: boolean;
    fechaDespachoCoordinado: string;
    fechaDespacho: string;
    terminadodespacho: boolean;
    fechaRealDespacho: string;
    entregadoTransporte: boolean;
    fechaEntregado: string | null;
    receptor: string;
    celularReceptor: string;
  }[];
  programacionObra: {
    descripcionProceso: string;
    procesar: string;
    fechaFinalProceso: string;
    terminada: boolean;
    nombreCompletoResponsable: string;
    liquidado: number;
    fechaProgramacionProceso: string;
    impresa: boolean;
    fechaImpresionReporte: string | null;
    impresaPor: string | null;
    fechaRealFinalProceso: string;
    terminadaPor: string;
  }[];
  modulosMedidasFinales: {
    item: string;
    descripcion: string;
    ancho: string;
    altura: string;
    cant: string;
    familia: string;
  }[];

  medidasCorteProduccion: {
    itemModulo: string;
    descripcion: string;
    ancho: string;
    altura: string;
    cantidad: string;
    unidaddMedida: string;
    areaProduccion: string;
    idInventario: string;
  }[];
  insumosPlano: {
    item: string;
    descripcion: string;
    cantidadCD: string;
    cantidadSD: string;
    unidadMedida: string;
    valorUnidad: string;
    subTotal: string;
    idInventario: string;
  }[];
  documentacionPedido: {
    idDocumento: string;
    observacion: string;
    archivo: File | string; // Acepta archivos o rutas en string
    tipoDocumento: string;
    usuario: string;
    fechaRegistro: string;
    leidoPor: string;
    pedido: string;
  }[];  
  equivalenciaCodigosos: {
    equivalenciaCodigoOrigen: string;
    equivalenciaCodigoDestino: string;
    equivalenciaResponsable:  string; 
    equivalenciaFecha: string;
  }[]; 
}

@Injectable({
  providedIn: 'root'
})
export class OrdenTrabajoService {
  private apiUrl = 'http://localhost:5248/api/OrdenTrabajo';

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
  
  
}
