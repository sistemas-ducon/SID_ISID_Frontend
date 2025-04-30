export interface asesores {
    codigoAsesor: string;
    nombreAsesor: string;
}

export interface ApiResponse<T = any> {
    statusCode: number;
    isExitoso: boolean;
    mensaje: string;
    resultado: T;
  }

  export interface Pedidos {
    consecutivoPedido: number;
}

export interface sede {
  codigoSede: string;
  descripcionSede:string;
}

// dto OT y Pedido 
export interface OtPedidoDto {
  ot: string;
  pedido: number;
}

//dto OT y Tipo de Docuemnto 
export interface DocumentacionDto {
  ot: string;
  tipoDoc: string;
}