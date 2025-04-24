export interface Compra {
    idCorte:            number;
    descripcion:        string;
    descripcionCompras: null | string;
    ancho:              number;
    altura:             number;
    cantidad:           number;
    valorUnidad:        number;
    undidadMedida:      string;
    comprado:           boolean;
    ordenCompra:        string;
    codigoInventario:   string;
  }


export interface ProveedorDto {
  id_ProveedorAuto: number;
  id_Proveedor: string;
  nombreCompania: string;
  nombreContacto: string;
  cargoContacto: string | null;
  dirección: string | null;
  ciudad: string | null;
  región: string | null;
  teléfono: string;
  correo_Electronico: string;
}


export interface ProveedorInsertarDto {
  id_Proveedor: string;
  nombreCompania: string;
  nombreContacto: string;
  telefono: string;
  correo_Electronico?: string;
}

export interface ProveedorActualizarDto{
  id_ProveedorAuto: number;
  id_Proveedor: string;
  nombreCompania: string;
  nombreContacto: string;
  telefono: string;
  correo_Electronico?: string;
}
