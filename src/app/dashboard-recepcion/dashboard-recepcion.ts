import { Component } from '@angular/core';
import { RecepNavbar } from '../components/recep-navbar/recep-navbar';
import { Router } from '@angular/router';

@Component({
  imports: [RecepNavbar],
  selector: 'app-dashboard-recepcion',
  styleUrl: './dashboard-recepcion.css',
  templateUrl: './dashboard-recepcion.html',
})
export class DashboardRecepcion {
  constructor(private router: Router) {
    
  }
cerrarSesion() {
throw new Error('Method not implemented.');
}
}
