import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-dashboard-admin',
  styleUrl: './dashboard-admin.css',
  templateUrl: './dashboard-admin.html',
})
export class DashboardAdmin {
  constructor(
    private router: Router
  ) { }
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
