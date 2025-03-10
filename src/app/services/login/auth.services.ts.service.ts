import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { LoginDto } from '../../models/login/LoginDto';
import { UsuarioDto } from '../../models/login/UsuarioDto';
import { ApiConfigServiceTsService } from './api-config.service.ts.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuarioActualSubject = new BehaviorSubject<UsuarioDto | null>(this.cargarUsuario());
  usuarioActual$ = this.usuarioActualSubject.asObservable();

  private tokenSubject = new BehaviorSubject<string | null>(this.cargarToken());
  token$ = this.tokenSubject.asObservable();

  private opcionesDeAccesoSubject = new BehaviorSubject<string[]>(this.cargarOpcionesAcceso());
  opcionesDeAcceso$ = this.opcionesDeAccesoSubject.asObservable();

  private apiUrl: string;

  constructor(private http: HttpClient, private apiConfig: ApiConfigServiceTsService) {
    this.apiUrl = `${this.apiConfig.apiUrl}/Login/IniciarSesion`;
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
          };
          this.guardarUsuario(usuario);
          return usuario;
        }
        throw new Error(response.mensaje || 'Error en el inicio de sesión');
      })
    );
  }

  private mapearOpcionesAcceso(resultado: any): string[] {
    const opciones: string[] = [];
    if (resultado.accesoSID) opciones.push('sid');
    if (resultado.accesoISID) opciones.push('isid');
    return opciones;
  }

  guardarUsuario(usuario: UsuarioDto): void {
    this.usuarioActualSubject.next(usuario);
    this.tokenSubject.next(usuario.token);
    this.opcionesDeAccesoSubject.next(usuario.opcionesDeAcceso);

    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('token', usuario.token);
    localStorage.setItem('opcionesDeAcceso', JSON.stringify(usuario.opcionesDeAcceso));
  }

  logout(): void {
    this.usuarioActualSubject.next(null);
    this.tokenSubject.next(null);
    this.opcionesDeAccesoSubject.next([]);

    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    localStorage.removeItem('opcionesDeAcceso');
  }

  get usuarioActual(): UsuarioDto | null {
    return this.usuarioActualSubject.value;
  }

  get token(): string | null {
    return this.tokenSubject.value;
  }

  get opcionesDeAcceso(): string[] {
    return this.opcionesDeAccesoSubject.value;
  }

  private cargarUsuario(): UsuarioDto | null {
    if (typeof localStorage === 'undefined') return null;
    const usuarioJSON = localStorage.getItem('usuario');
    return usuarioJSON ? JSON.parse(usuarioJSON) : null;
  }
  
  private cargarToken(): string | null {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem('token');
  }
  
  private cargarOpcionesAcceso(): string[] {
    if (typeof localStorage === 'undefined') return [];
    const opcionesJSON = localStorage.getItem('opcionesDeAcceso');
    return opcionesJSON ? JSON.parse(opcionesJSON) : [];
  }
}

