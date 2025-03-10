export interface InfoPedido {
    ot: {
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
    };
    infoPlano: {
      dibujante: string;
      plano: string;
    };
    fechaDespacho: {
      despachoCoordinado: boolean;
      fechaDespachoCoordinado: string;
      fechaDespacho: string;
      terminadodespacho: boolean;
      fechaRealDespacho: string;
      entregadoTransporte: boolean;
      fechaEntregado: string | null;
      receptor: string;
      celularReceptor: string;
    }[];
    programacionObra: {
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
    }[];
    modulosMedidasFinales: {
      item: string;
      descripcion: string;
      ancho: string;
      altura: string;
      cant: string;
      familia: string;
    }[];
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
    insumosPlano: {
      item: string;
      descripcion: string;
      cantidadCD: string;
      cantidadSD: string;
      unidadMedida: string;
      valorUnidad: string;
      subTotal: string;
      idInventario: string;
    }[];
    equivalenciaCodigosos: {
      equivalenciaCodigoOrigen: string;
      equivalenciaCodigoDestino: string;
      equivalenciaResponsable: string;
      equivalenciaFecha: string;
    }[];
  }
  