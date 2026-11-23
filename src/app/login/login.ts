import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  username: string = '';
  password: string = '';
  mensajeError: string = '';

  constructor(private authService: AuthService, private router: Router) {

  }

  ingresar() {

    this.mensajeError = '';

    this.authService
      .login(
        this.username,
        this.password
      )
      .subscribe({

        next: (response) => {

          if (!response.token) {

            this.mensajeError =
              response.mensaje;

            return;

          }

          localStorage.setItem(
            'token',
            response.token
          );

          localStorage.setItem(
            'rol',
            response.rol
          );

          localStorage.setItem(
            'idUsuario',
            response.idUsuario
          );

          if (response.rol === 'ADMINISTRADOR') {

            this.router.navigate(
              ['/dashboard-admin']
            );

          }

          if (response.rol === 'RECEPCIONISTA') {

            this.router.navigate(
              ['/dashboard-recepcion']
            );

          }

          if (response.rol === 'HOUSEKEEPING') {

            this.router.navigate(
              ['/dashboard-housekeeping']
            );

          }

        },

        error: () => {

          this.mensajeError =
            'Error de conexión con el servidor';

        }

      });

  }
}
