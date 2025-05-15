import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { UsuarioDto } from '../../../models/login/UsuarioDto';
import { jwtDecode } from 'jwt-decode'; 
@Injectable({
  providedIn: 'root'
})
export class SessionServiceService {
  private usuarioSubject = new BehaviorSubject<UsuarioDto | null>(null);
  usuario$ = this.usuarioSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.cargarUsuario();
  }

  /** Retorna el usuario actual en memoria */
  get usuario(): UsuarioDto | null {
    return this.usuarioSubject.value;
  }

  /** Obtiene la sesión desde localStorage */
  obtenerSesion(): UsuarioDto | null {
    if (isPlatformBrowser(this.platformId)) {
      const sesionString = localStorage.getItem('usuario');
      return sesionString ? JSON.parse(sesionString) : null;
    }
    return null;
  }

  /** Carga la sesión al iniciar la aplicación */
  private cargarUsuario(): void {
    if (isPlatformBrowser(this.platformId)) {
      const usuarioJSON = localStorage.getItem('usuario');
      const usuario = usuarioJSON ? JSON.parse(usuarioJSON) : null;
      this.usuarioSubject.next(usuario);
    }
  }

  /** Guarda la sesión del usuario */
  guardarUsuario(usuario: UsuarioDto): void {
    this.usuarioSubject.next(usuario);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
    }
  }

  obtenerPermisosDesdeToken(tipo: 'SID' | 'ISID'): string[] {
      const usuario = this.obtenerSesion(); // Tu método que lee del localStorage
      if (!usuario?.token) return [];
  
      try {
        const decoded: any = jwtDecode(usuario.token);
        const claimKey = tipo === 'SID' ? 'permisoSID' : 'permisoISID';
  
        const permisos = decoded[claimKey];
  
        // Si solo hay un permiso, puede venir como string, no como array
        if (typeof permisos === 'string') return [permisos];
        return Array.isArray(permisos) ? permisos : [];
      } catch (error) {
        console.error('Error al decodificar token:', error);
        return [];
      }
    }

  /** Elimina la sesión del usuario */
  eliminarSesion(): void {
    this.usuarioSubject.next(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('usuario');
    }
  }

  /** Obtiene solo el nombre del usuario */
  obtenerNombreUsuario(): string | null {
    return this.usuario?.nombreUsuario || null;
  }

  /** Obtiene solo la cédula del usuario */
  obtenerCedulaUsuario(): string | null {
    return this.usuario?.cedula || null;
  }
}
