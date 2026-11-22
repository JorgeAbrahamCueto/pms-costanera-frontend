import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-admin',
  imports: [],
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.css'
})
export class DashboardAdmin {

  constructor(
    private router: Router
  ) { }

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

  irDashboard() {

    this.router.navigate(
      ['/dashboard-admin']
    );

  }

  cerrarSesion() {

    localStorage.removeItem(
      'token'
    );

    localStorage.removeItem(
      'rol'
    );

    this.router.navigate(
      ['/login']
    );

  }

}
