export interface infoOT {
    idTipoPedido: string;
    nombreObra: string;
    aplicaEmpaque: boolean;
    terminadaEmpaque: boolean;
    terminadaDespacho: boolean;
    pedidoBase: number;
    pais: string;
    region: string;
    zona: string;
    ciudad: string;
    direccion: string;
    telefono: string;
    celular: string;
    personaReceptora: string;
    recibePedido: string;
    mailContacto: string;
    observacionPedido: string;
    fechaConfirmacionVenta: string;
    fechaEntregaProduccion: string;
    fechaEntregaDibujoDespiece: string;
    fechaInstalacion: string;
    fechaEmpaqueVenta: string;
    fechaEmpaque: string;
    fechaFinalInstalacion: string;
    fechaHabilitadaProducir: string;
    fechaTerminadaEmpaque: string;
    fechaTerminadaDespacho: string;
    fechaFactura: string;
    idContacto: number;
    supervisor: string;
    codigoAsesor: string;
    precioVenta: number;
    descuento: number;
    descuentoComision: number;
    valorTteVia: number;
    valorViatico: number;
    observacionesContables: string;
    formaPago: string;
    cotizacion: string;
    razonNoFactura: string;
    resumenObra: string;
    fabricadoPor: string;
    instaladaPor: string;
    diasIntalacion: number;
    responsableFacturacion: string;
    actaEntrega: boolean;
    noFactura: boolean;
    descripcion_TipoPedido: string;
    terminadoDiseño: boolean;
    terminadoProduccion: boolean;
    cerrada: boolean;
    anulada: boolean;
    reactivada: boolean;
    terminadaTroja: boolean;
    pararProduccion: boolean;
    pararDespacho: boolean;
    
  }

  export interface fechaDespacho {
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
  
  export interface infoCliente {
    nit: string;
    razonSocial: string;
    segundoApellido: string;
    nombreCliente: string;
    direccion: string;
    telefono: string;
    ciudad: string;
    idContacto: number;
    nombreContacto: string;
  }
  
  export interface plano {
    dibujante: string | null;
    plano: string;
  }
  
  export interface reporteContable {
    consecutivoPedido: number;
    descripcionTipoPedido: string;
    subtotal: number;
    descuento: number;
    terminadaFacturacion: boolean;
    fechaFactura: string | null;
    valorBolsa: number;
    valorPedido: number;
    afectaBolsa: boolean;
    precioVenta: number;
    estadisticaVenta: boolean;
    pedidoBase: number;
    valorTteVia: number;
  }


  