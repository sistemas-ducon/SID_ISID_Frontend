export interface documentacionPedido {
    documentacion: {
    idDocumento: string;
    observacion: string;
    archivo: File | string;
    tipoDocumento: string;
    usuario: string;
    fechaRegistro: string;
    leidoPor: string;
    pedido: string;
  }[];
}