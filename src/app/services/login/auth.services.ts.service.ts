import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LoginDto } from '../../models/login/LoginDto';
import { UsuarioDto } from '../../models/login/UsuarioDto';
import { ApiConfigServiceTsService } from './api-config.service.ts.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private usuarioSubject = new BehaviorSubject<UsuarioDto | null>(this.cargarUsuario());
  usuario$ = this.usuarioSubject.asObservable();

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private apiConfig: ApiConfigServiceTsService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.apiUrl = `${this.apiConfig.apiUrl}/Login/IniciarSesion`;
  }

  get usuario(): UsuarioDto | null {
    return this.usuarioSubject.value;
  }
  

  login(loginDto: LoginDto): Observable<UsuarioDto> {
    return this.http.post<any>(this.apiUrl, loginDto).pipe(
      map(response => {
        if (response.isExitoso && response.resultado) {
          const usuario: UsuarioDto = {
            cedula: response.resultado.cedula,
            nombreUsuario: response.resultado.nombreCompleto,
            token: response.resultado.token,
            opcionesDeAcceso: this.mapearOpcionesAcceso(response.resultado),
            permisosISID : response.resultado.permisosISID,
            permisosSID: response.resultado.permisosSID,

          };
          this.guardarUsuario(usuario);
          return usuario;
        }
        throw new Error(response.mensaje || 'Error en el inicio de sesión');
      }),
      catchError(err => {
        console.error('Error en login:', err);
        return throwError(() => new Error('Error en el inicio de sesión. Verifique sus credenciales.'));
      })
    );
  }

  private mapearOpcionesAcceso(resultado: any): string[] {
    return [
      resultado.accesoSID ? 'sid' : '',
      resultado.accesoISID ? 'isid' : '',
    ].filter(opcion => opcion);
  }

  guardarUsuario(usuario: UsuarioDto): void {
    this.usuarioSubject.next(usuario);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
    }
  }

  private cargarUsuario(): UsuarioDto | null {
    if (isPlatformBrowser(this.platformId)) {
      const usuarioJSON = localStorage.getItem('usuario');
      return usuarioJSON ? JSON.parse(usuarioJSON) : null;
    }
    return null;
  }
}
