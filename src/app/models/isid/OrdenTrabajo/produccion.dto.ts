export interface ApiResponse<T> {
  statusCode: number;
  isExitoso: boolean;
  mensaje: string;
  resultado: T;
}

export interface MedidasCorteProduccion {
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
}

export interface ModulosMedidasFinales {
    modulosMedidasFinales: {
        item: string;
        descripcion: string;
        ancho: string;
        altura: string;
        cant: string;
        familia: string;
      }[];
}