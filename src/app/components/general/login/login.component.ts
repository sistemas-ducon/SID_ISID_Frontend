import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/login/auth.services.ts.service';
import { LoginDto } from '../../../models/login/LoginDto';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { InputGroupModule } from 'primeng/inputgroup';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon'; 
import { UsuarioDto } from '../../../models/login/UsuarioDto';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/enviroments';
import { SessionServiceService } from '../../../services/login/guardarsesion/session-service.service';
import { PRIME_NG_IMPORTS } from '../../../shared/NgPrime/prime-imports';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  host: {
    '[style.background-image]': `'url(${environment.assetUrl}LOGINFONDO.jpg)'`
  },
  imports: [PRIME_NG_IMPORTS ,CommonModule, ReactiveFormsModule, InputTextModule, PasswordModule, 
    InputGroupModule, ToastModule, InputGroupAddonModule, FormsModule],
  providers: [MessageService] // Importamos MessageService para el Toast
})
export class LoginComponent {
  loginForm: FormGroup;
  value!: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,
     private messageService: MessageService, private sessionService: SessionServiceService,) {
    this.loginForm = this.fb.group({
      Usuario: ['', Validators.required],  // Cambiar de username a Usuario
      Contrasenia: ['', Validators.required] // Cambiar de password a Contrasenia
    });    
  }

  
  
  
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.mostrarMensaje('Por favor, completa todos los campos.', 'warn');
      return;
    }
  
    const loginDto: LoginDto = this.loginForm.value;
    
    this.authService.login(loginDto).subscribe({
      next: (usuario: UsuarioDto) => {

        this.sessionService.guardarUsuario(usuario);
        this.router.navigate(['/menu-principal']);
      },
      error: (error) => {
        console.error('Error en el login:', error);
        this.mostrarMensaje(error?.error?.message || 'Credenciales inválidas.', 'error');
      }
    });
    
    

  }
  
  

  mostrarMensaje(detalle: string, tipo: 'success' | 'info' | 'warn' | 'error') {
    this.messageService.add({ severity: tipo, summary: 'Login', detail: detalle });
  }
}

