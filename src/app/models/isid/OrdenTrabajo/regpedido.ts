export interface ArticuloDto {
    idInventario: string;
    descripcion: string;
    und: string;
    cantCD: number;
  }
  
  export interface SimulacionRegistroResultado {
    articulos: ArticuloDto[];
    codigosNoContables: string[];
  }
  
  export interface SimulacionRegistroResponse {
    statusCode: number;
    isExitoso: boolean;
    mensaje: string;
    resultado: SimulacionRegistroResultado;
  }