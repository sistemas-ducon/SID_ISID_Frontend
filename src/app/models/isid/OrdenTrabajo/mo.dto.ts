export interface Mo {
    areaProduccion: string;
    procesos:       ProcesoMo[];
  }
  
  export interface ProcesoMo {
    item: number;
    descripcion: string;
    ancho: number;
    altura: number;
    cantidad: number;
    unidadMedida: string;
    valorUnidad: number;
    subTotal?: number; // Asegurar que existe
    areaProduccion?: string;
}

  