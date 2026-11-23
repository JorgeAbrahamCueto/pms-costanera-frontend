import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RecepNavbar } from '../components/recep-navbar/recep-navbar';

import { HabitacionesService } from '../services/habitaciones';
import { ReservasService } from '../services/reservas';

@Component({
  selector: 'app-gestion-reservas',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecepNavbar
  ],
  templateUrl: './gestion-reservas.html',
  styleUrl: './gestion-reservas.css'
})
export class GestionReservas implements OnInit {

  reservaForm: FormGroup;

  habitacionesDisponibles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private habitacionesService: HabitacionesService,
    private reservasService: ReservasService
  ) {

    this.reservaForm = this.fb.group({

      checkin: ['', Validators.required],

      checkout: ['', Validators.required],

      habitacion: ['', Validators.required]

    });

  }
  buscarHabitacionesDisponibles() {

    const checkin =
      this.reservaForm.get('checkin')?.value;

    const checkout =
      this.reservaForm.get('checkout')?.value;

    if (!checkin || !checkout) {
      return;
    }

    this.habitacionesService
      .obtenerDisponibles(checkin, checkout)
      .subscribe({

        next: (data) => {

          console.log(
            'Habitaciones disponibles:',
            data
          );

          this.habitacionesDisponibles = data;

        },

        error: (err) =>
          console.error(err)

      });

  }
  ngOnInit(): void {

    this.reservaForm.get('checkin')?.valueChanges.subscribe(() => {
      this.buscarHabitacionesDisponibles();
    });

    this.reservaForm.get('checkout')?.valueChanges.subscribe(() => {
      this.buscarHabitacionesDisponibles();
    });

  }

}