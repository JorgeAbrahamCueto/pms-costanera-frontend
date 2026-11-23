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

      habitacion: ['', Validators.required],

      cantidadHuespedes: [1, Validators.required],

      observaciones: ['']

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

 confirmarReserva() {

  const reserva = {

    habitacion: {
      idHabitacion: Number(
        this.reservaForm.value.habitacion
      )
    },

    usuario: {
      idUsuario: Number(
        localStorage.getItem('idUsuario')
      )
    },

    estadoReserva: {
      idEstadoReserva: 1
    },

    canalReserva: {
      idCanal: 1
    },

    fechaHoraCheckinProgramado:
      this.reservaForm.value.checkin,

    fechaHoraCheckoutProgramado:
      this.reservaForm.value.checkout,

    cantidadHuespedes:
      this.reservaForm.value.cantidadHuespedes,

    observaciones:
      this.reservaForm.value.observaciones

  };

  console.log('Reserva a enviar:', reserva);

  this.reservasService
    .crearReserva(reserva)
    .subscribe({

      next: (response: any) => {

        console.log(
          'Reserva creada:',
          response
        );

        alert(
          'Reserva registrada correctamente'
        );

      },

      error: (err: any) => {

        console.error(err);

        alert(
          'Error al registrar la reserva'
        );

      }

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