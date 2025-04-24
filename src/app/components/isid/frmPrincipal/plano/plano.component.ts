import { Component } from '@angular/core';
import { PRIME_NG_IMPORTS } from '../../../../shared/NgPrime/prime-imports';
import { CommonModule } from '@angular/common';
import { OrdenTrabajoService } from '../../../../services/isid/OrdenTrabajo/orden-trabajo.service';
import { InfoOtStateService } from '../../../../services/isid/OrdenTrabajo/info-ot-state.service';
import { InfoPedido } from '../../../../models/isid/OrdenTrabajo/info-pedido.dto';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CompartidoService } from '../../../../services/general/general.service';
import { Router } from '@angular/router';
import { Pedido } from '../../../../models/isid/OrdenTrabajo/pedido.dto';
import { ApiResponse, Pedidos } from '../../../../models/general/general';
import { plano } from '../../../../models/isid/frmprincipal/frmPrincipal';
import { PlanoService } from '../../../../services/isid/FrmPrincipal/Plano/plano.service';

@Component({
  selector: 'app-plano',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PRIME_NG_IMPORTS],
  templateUrl: './plano.component.html',
  styleUrl: './plano.component.css'
})
export class PlanoComponent {

  //formulario campos plano
  formPlano: FormGroup;

  // Variable para Estado Botones
  botones = {
    adicionar: true,
    modificarObjeto: true,
    quitarObjeto: true,
    eliminarTodos: true,
    leerAcad: true,
    despiece: true,
    generarTxt: true,
    guardarTxt: true,
    exportarPlano: true,
    verCotizacion: true,
    registrarSag: true
  };

  //arrar para cargar despice 
  despiece: any[] = [];

  // Control de tamaño resumen
  obserControl: boolean = false;

  // control de tamaño de tabla despice 
  modoSoloTabla: boolean = true;
  esCartera: boolean = false;

  constructor(private fb: FormBuilder, private compartidoServices: CompartidoService, private router: Router, private planoServicio: PlanoService) {

    //Se Inicializa los controles del formualario reactivo
    this.formPlano = this.fb.group({
      plano: [{ value: '', disabled: true }],
      dibuja: [{ value: '', disabled: true }],
      cliente: [{ value: '', disabled: true }],
      contacto: [{ value: '', disabled: true }],
      area: [{ value: '', disabled: true }],
      asesor: [{ value: '', disabled: true }],
      resumenPlano: [{ value: '', disabled: true }],
      valorDespiece: [{ value: '', disabled: true }],

    });
  }

  ngOnInit() {
    // Se valida si exite una ot cargada
    const estado = this.compartidoServices.obtenerEstadoOT();
    estado ? this.cargarDespiece(estado.ot, estado.pedidoSeleccionado.consecutivoPedido)
      : this.redireccionarOT()
  }


  onExpandirResumen(): void {
    this.obserControl = !this.obserControl;
  }

  cargarDespiece(ot: string, pedido: number) {

    const dto = { ot, pedido };

    this.planoServicio.obtenerEstadoDiseno(dto).subscribe({
      next: (resp) => {
        const estaTerminado = resp.resultado.estadoTerminadoDiseño;
        if (estaTerminado) {

          // cargamos la infomacion del plano y el despiece
          this.planoServicio.cargarInfoPlano({ ot, pedido }).subscribe({
            next: (response: ApiResponse) => {
              if (response.isExitoso) {

                const infoPlano = response.resultado.infoPlano;
                const infoAseCli = response.resultado.infoAseCli;
                this.despiece = response.resultado.despiece;

                // sumamos en subtotal 
                const totalDespiece = this.despiece.reduce((acc, item) => acc + item.subtotal, 0);

                //Cargamos la informacion del plano 
                this.formPlano.patchValue({
                  dibuja: infoPlano.dibujante,
                  area: infoPlano.area,
                  plano: infoPlano.plano,
                  cliente: infoAseCli.cliente,
                  contacto: infoAseCli.contacto,
                  asesor: infoAseCli.asesor,
                  resumenPlano: infoAseCli.resumenPlano,
                  valorDespiece: totalDespiece
                });

                // control de Botones de plano 



              } else {
                console.error('Error del API:', response.mensaje);
              }
            },
            error: (err) => {
              console.error('Error HTTP:', err);
            }
          });

        } else {
          this.compartidoServices.mostrarAlerta('La Orden de trabajo seleccionada no ha sido terminada por dibujo', 'warn');
        }
      },
      error: (err) => {
        // console.error('Error al consultar el estado del diseño:', err);
        this.compartidoServices.mostrarAlerta('Ocurrió un eror, por favor intentelo nuevamente', 'error');
      }
    });
  }

  redireccionarOT() {
    this.router.navigate(['/isid/dashboard-frm-principal/orden-de-trabajo']);
  }

  ampliarTabla() {
    this.modoSoloTabla = !this.modoSoloTabla;
  }

}
