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

export interface OtPedidoDto {
  ot: string;
  pedido: number;
}
