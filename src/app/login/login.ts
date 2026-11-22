import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {

  }

  ingresar() {

    this.authService
      .login(
        this.username,
        this.password
      )
      .subscribe({

        next: (response) => {

          if (!response.token) {

            alert(response.mensaje);

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

          if (response.rol === 'ADMINISTRADOR') {

            this.router.navigate(
              ['/dashboard-admin']
            );

          }

          console.log(
            'Token guardado'
          );

          console.log(
            'Rol:',
            response.rol
          );

        },

        error: (err) => {

          console.error(err);

        }

      });

  }
}
