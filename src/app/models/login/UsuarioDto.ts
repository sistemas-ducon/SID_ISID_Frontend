
export interface UsuarioDto {
    cedula: string;
    nombreUsuario: string;
    token: string;
    opcionesDeAcceso: string[];
    permisosISID:   PermisosSid[];
    permisosSID:    PermisosSid[];
  }

  export interface PermisosSid {
    idPermiso:   number;
    descripcion: string;
}