import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { PRIME_NG_IMPORTS } from '../../../../shared/NgPrime/prime-imports';

interface Consecutivo {
  name: string | null;
}

@Component({
  selector: 'app-orden-trabajo-sid',
  standalone: true,
  imports: [CommonModule, RouterModule, TabMenuModule, DropdownModule, FormsModule, InputTextModule, FloatLabelModule, PRIME_NG_IMPORTS],
  templateUrl: './orden-trabajo-sid.component.html',
  styleUrl: './orden-trabajo-sid.component.css'
})
export class OrdenTrabajoSidComponent implements OnInit{

  id_OT: string | undefined;
  selectedCountry: Consecutivo | undefined = undefined;
  countries: Consecutivo[] = [];

  pedido: string | undefined;
  t_ped: string | undefined;
  asesor: string | undefined;
  cliente: string | undefined;
  obra: string | undefined;
  direccion: string | undefined;
  departameto: string | undefined;
  pais: string | undefined;
  ciudad: string | undefined;
  telefono: string | undefined;
  Contacto: string | undefined;
  Mail: string | undefined;
  Plano: string | undefined;
  Dibuja: string | undefined;
  observacionpedido: string | undefined;
  venta: string | undefined;
  okventa: string | undefined;
  okempaquevta: string | undefined;
  okdibujo: string | undefined;
  okdespacho: string | undefined;
  empaqueprod: string | undefined;

  constructor(
  ) {}

  ngOnInit() {
    
  }
}
