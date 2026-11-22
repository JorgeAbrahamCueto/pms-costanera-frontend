import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [],
  templateUrl: './admin-navbar.html',
  styleUrl: './admin-navbar.css'
})
export class AdminNavbar {
irRecepcion() {
throw new Error('Method not implemented.');
}

  constructor(
    private router: Router
  ) { }

  irDashboard() {

    this.router.navigate(
      ['/dashboard-admin']
    );

  }

  irUsuarios() {

    this.router.navigate(
      ['/usuarios']
    );

  }

  irProveedores() {

    this.router.navigate(
      ['/proveedores']
    );

  }

  cerrarSesion() {

    localStorage.removeItem('token');

    localStorage.removeItem('rol');

    this.router.navigate(
      ['/login']
    );

  }

}