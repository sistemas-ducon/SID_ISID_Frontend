import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/enviroments';
import { ApiResponse, DocumentacionDto } from '../../../models/general/general';
import { catchError, from, mergeMap, Observable, throwError } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class DocumentacionService {

  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  ObtenerDocumentacion(dto: DocumentacionDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/frmPrincipal/DocumentacionOT`, dto);
  }

  //Servicio para consumir endpoint de agregar Archivo
  agregarArchivo(documentacion: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/frmPrincipal/AgregarDocumentacion`, documentacion);
  }


  // Servicio para consumir el endpoint de descargar archivo
  descargarArchivo(OT: string, nombreArchivo: string, idDocumento: number, nombreUsuario: string) {
    const params = new HttpParams()
      .set('OT', OT)
      .set('nombreArchivo', nombreArchivo)
      .set('idDocumento', idDocumento.toString())
      .set('nombreUsuario', nombreUsuario);
  
    return this.http.get(`${this.baseUrl}/frmPrincipal/DescargarArchivoOT`, {
      params,
      responseType: 'blob'
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Blob && error.error.type.includes('application/json')) {
          return from(error.error.text()).pipe(
            mergeMap(text => {
              try {
                const json = JSON.parse(text);
                const mensaje = json?.mensaje || 'Error inesperado del servidor.';               
                return throwError(() => new Error(mensaje));
              } catch (parseError) {
               
                return throwError(() => new Error('Error al interpretar la respuesta del servidor.'));
              }
            })
          );
        }
        return throwError(() => new Error('Error desconocido al descargar el archivo.'));
      })
    );
  }
  
  // documentacion.service.ts
  eliminarArchivo(idDocumento: number,usuario: string,ot: string, pedido: number, idEmpleado: string): Observable<any> {
    const body = { idDocumento, usuario, ot, pedido, id_Empleado: idEmpleado };
  
    return this.http.post<any>(`${this.baseUrl}/frmPrincipal/EliminarArchivo`, body).pipe(
      catchError((error: HttpErrorResponse) => {
        let mensaje = 'Error al eliminar el archivo.';
        if (error.error?.mensaje) {
          mensaje = error.error.mensaje;
        }
        return throwError(() => new Error(mensaje));
      })
    );
  }
  



  
}
