import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InfoOtStateService } from '../../../../services/isid/OrdenTrabajo/info-ot-state.service';
import { OrdenTrabajoService } from '../../../../services/isid/OrdenTrabajo/orden-trabajo.service';
import { InfoPedido } from '../../../../models/isid/OrdenTrabajo/info-pedido.dto';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { equivalenciaDeCodigos } from '../../../../models/isid/OrdenTrabajo/equivalenciaDeCodigos.dto';
import { PRIME_NG_IMPORTS } from '../../../../shared/NgPrime/prime-imports';
import { ArticuloDto } from '../../../../models/isid/OrdenTrabajo/regpedido';
import { MessageService } from 'primeng/api';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-regpedido',
  standalone: true,
  imports: [TableModule, FloatLabelModule, InputTextModule, ProgressBarModule, PRIME_NG_IMPORTS],
  templateUrl: './regpedido.component.html',
  styleUrl: './regpedido.component.css',
  providers: [MessageService]
})
export class RegpedidoComponent implements OnInit{
  equivalencias: any[] = [];
  idOT: string = '';
  consecutivoPedido: string = '';
  selectedInsumo: any;
  plano: string = '';

  btnEquivalenciaDisabled: boolean = true;
  btnGuardarDisabled: boolean = true;
  btnCancelarDisabled: boolean = true;
  btnNuevoDisabled: boolean = false;
  camposDeshabilitados = true;

  codOrigen: string = '';
  codDestino: string = '';
  equivalenciaSeleccionada: any;

  articulosSimulados: ArticuloDto[] = [];

  constructor(
    private ordenTrabajoService: OrdenTrabajoService,
    private infoOtStateService: InfoOtStateService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.infoOtStateService.id_OT$.subscribe(id => {
      this.idOT = id;

    });
  
    this.infoOtStateService.selectedPedido$.subscribe(pedido => {
      if (pedido) {
        this.consecutivoPedido = pedido.consecutivoPedido.toString();

      }
    });
  
    this.infoOtStateService.plano$.subscribe(plano => {
      this.plano = plano;

    });


  
    // Cargar equivalencias al iniciar
    this.cargarDatos();
  }
  
  llenarCampos(equivalencia: any) {
    this.codOrigen = equivalencia.equivalenciaCodigoOrigen;
    this.codDestino = equivalencia.equivalenciaCodigoDestino;
    this.camposDeshabilitados = true;
  }

  cargarDatos() {
    // Obtener equivalencias como ya lo tenías
    this.ordenTrabajoService.obtenerEquivalenciaCodigos().subscribe({
      next: (data: equivalenciaDeCodigos) => {
        this.equivalencias = data.equivalenciaCodigosos;
      },
      error: (err) => {
        console.error('Error al obtener equivalencias', err);
      }
    });
  }

  simularRegistro() {
    if (!this.plano) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Plano no definido', closable: true });
      return;
    }
    if (!this.idOT) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'ID de OT no definido', closable: true });
      return;
    }
  
    this.ordenTrabajoService.simularRegistro(this.plano, this.idOT).subscribe({
      next: (response) => {
        if (response.isExitoso) {
          this.articulosSimulados = response.resultado.articulos;
  
          const cantidadNoContables = response.resultado.codigosNoContables.length;
          if (cantidadNoContables > 0) {
            this.messageService.add({
              severity: 'warn',
              summary: 'Códigos no contables',
              detail: `⚠️ ${cantidadNoContables} códigos no contables detectados.`,
              closable: false
            });
          }
        }
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al simular el registro', closable: true });
        console.error('Error al simular el registro', err);
      }
    });
  }
  
  accionBtnNuevo() {
    this.btnGuardarDisabled = false;
    this.btnNuevoDisabled = true;
    this.camposDeshabilitados = false;
    this.codOrigen = '';
  this.codDestino = '';
  }
  
  accionBtnCancelar(){
    this.btnGuardarDisabled = true;
    this.btnNuevoDisabled = false;
    this.btnCancelarDisabled = true;
    this.camposDeshabilitados = true;
  }
  
  

}
