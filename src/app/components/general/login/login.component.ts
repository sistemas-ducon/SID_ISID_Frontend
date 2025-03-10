import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/login/auth.services.ts.service';
import { LoginDto } from '../../../models/login/LoginDto';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon'; 
import { UsuarioDto } from '../../../models/login/UsuarioDto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule, InputGroupModule, ToastModule, InputGroupAddonModule, FormsModule],
  providers: [MessageService] // Importamos MessageService para el Toast
})
export class LoginComponent {
  loginForm: FormGroup;
  value!: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private messageService: MessageService) {
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
        this.authService.guardarUsuario(usuario); // Guarda el usuario en memoria
  
        // Obtener las opciones de acceso del usuario
        const opcionesAcceso = usuario.opcionesDeAcceso || [];
  
        // Validar cuántas opciones tiene
        if (opcionesAcceso.length === 1) {
          const opcion = opcionesAcceso[0];
  
          // Redirigir según la única opción que tenga
          if (opcion === 'isid') {
            this.router.navigate(['/menu-isid']);
          } else if (opcion === 'sid') {
            this.router.navigate(['/menu-sid']);
          }
        } else {
          // Si tiene más de una opción, redirigir al menú principal
          this.router.navigate(['/menu-principal']);
        }
      },
      error: (error) => {
        console.error('Error en el login:', error);
        const mensajeError = error?.error?.message || 'Credenciales inválidas. Por favor, inténtalo de nuevo.';
        this.mostrarMensaje(mensajeError, 'error');
      }
    });
  }
  
  

  mostrarMensaje(detalle: string, tipo: 'success' | 'info' | 'warn' | 'error') {
    this.messageService.add({ severity: tipo, summary: 'Login', detail: detalle });
  }
}

