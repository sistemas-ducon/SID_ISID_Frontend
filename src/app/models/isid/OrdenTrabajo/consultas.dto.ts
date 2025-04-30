export interface OperarioProduccion {
    cedula: string;
    operario: string;
    idProceso: number;
    sede: string;
  }
  

  // interfaz para la respuesta del servicio
export interface Programacion {
    idProgramacion: number;
    descripcionProceso: string;
    fechaInicioProceso: string;
    fechaFinalProceso: string;
    idProceso: number;
    procesoDestino: string | null;
  }
  
  export interface EstadisticaPorModulo {
    familiaModulo: string;
    sumaDeCant: number;
    porcentaje: number;
  }
  
  export interface EstadisticasResponse {
    statusCode: number;
    isExitoso: boolean;
    mensaje: string;
    resultado: {
      estadisticaPorModulo: EstadisticaPorModulo[];
      estadisticaPorOT: EstadisticaPorOT[];       // Puedes crear estas interfaces después
      estadisticaDetalle:  EstadisticaDetalle[];
    };
  }
  
  export interface FamiliaModulo {
    id_Familia: number;
    descripcion_Familia: string;
  }
  
  export interface ApiResponse<T> {
    statusCode: number;
    isExitoso: boolean;
    mensaje: string;
    resultado: T;
  }

  export interface EstadisticaDetalle {
    familiaModulo: string;
    ancho: number;
    altura: number;
    sumaDeCant: number;
    porcentaje: number;
  }  

  export interface EstadisticaPorOT {
    ot: string;
    sumaDeCant: number;
    porcentaje: number;
  }
  
  