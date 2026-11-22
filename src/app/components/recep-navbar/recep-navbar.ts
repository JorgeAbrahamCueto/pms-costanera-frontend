import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recep-navbar',
  standalone: true,
  imports: [],
  templateUrl: './recep-navbar.html',
  styleUrl: './recep-navbar.css'
})
export class RecepNavbar {

  constructor(
    private router: Router
  ) { }

  irRecepcion() {

    this.router.navigate(
      ['/dashboard-recepcion']
    );

  }


  irHabitaciones() {

    alert('Módulo en construcción');

  }

  irCajaPagos() {

    alert('Módulo en construcción');

  }

  irConsumos() {

    alert('Módulo en construcción');

  }

  irMiniBar() {

    alert('Módulo en construcción');

  }

  cerrarSesion() {

    localStorage.removeItem('token');

    localStorage.removeItem('rol');

    this.router.navigate(
      ['/login']
    );

  }

}