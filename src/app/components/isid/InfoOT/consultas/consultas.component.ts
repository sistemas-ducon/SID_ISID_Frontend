import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from "primeng/floatlabel"
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PRIME_NG_IMPORTS } from '../../../../shared/NgPrime/prime-imports';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-consultas',
  standalone: true,
  imports: [FormsModule, DropdownModule, FloatLabelModule, ...PRIME_NG_IMPORTS, InputTextModule, CommonModule, TriStateCheckboxModule, InputTextareaModule],
  templateUrl: './consultas.component.html',
  styleUrl: './consultas.component.css'
})
export class ConsultasComponent{
  countries: any[] | undefined;
  value: string | undefined;

  selectedCountry: string | undefined;

  ngOnInit() {
    this.countries = [
        { name: 'Australia', code: 'AU' },
        { name: 'Brazil', code: 'BR' },
        { name: 'China', code: 'CN' },
        { name: 'Egypt', code: 'EG' },
        { name: 'France', code: 'FR' },
        { name: 'Germany', code: 'DE' },
        { name: 'India', code: 'IN' },
        { name: 'Japan', code: 'JP' },
        { name: 'Spain', code: 'ES' },
        { name: 'United States', code: 'US' }
    ];
}
}
