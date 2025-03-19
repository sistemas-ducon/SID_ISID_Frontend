export interface OT {
  descripcionTipoPedido: string;
  asesor: string;
  cliente: string;
  nombreObra: string;
  dirección: string;
  región: string;
  país: string;
  ciudad: string;
  telDomicilio: string;
  personaReceptora: string;
  mailContacto: string;
  observacionPedido: string;
  fechaConfirmacionVenta: string;
  fechaEntregaProduccion: string;
  fechaEntregaDibujoDespiece: string;
  fechaEmpaque: string;
  fechaEmpaqueVenta: string;
  fechaTerminadaEmpaque: string;
  fechaTerminadaDespacho: string;
  fechaFactura: string;
  fechaFinalInstalacion: string | null;
  cocNIT: string;
  cocNombre: string;
  cocDireccion: string;
  cocCiudad: string;
  cocTelefono: string;
}

export interface InfoPlano {
  dibujante: string;
  plano: string;
}

export interface FechaDespacho {
  despachoCoordinado: boolean;
  fechaDespachoCoordinado: string;
  fechaDespacho: string;
  terminadodespacho: boolean;
  fechaRealDespacho: string;
  entregadoTransporte: boolean;
  fechaEntregado: string | null;
  receptor: string;
  celularReceptor: string;
}

export interface ProgramacionObra {
  descripcionProceso: string;
  procesar: string;
  fechaFinalProceso: string;
  terminada: boolean;
  nombreCompletoResponsable: string;
  liquidado: number;
  fechaProgramacionProceso: string;
  impresa: boolean;
  fechaImpresionReporte: string | null;
  impresaPor: string | null;
  fechaRealFinalProceso: string;
  terminadaPor: string;
}

export interface InfoPedido {
  ot: OT;
  infoPlano: InfoPlano;
  fechaDespacho: FechaDespacho[];
  programacionObra: ProgramacionObra[];
}
