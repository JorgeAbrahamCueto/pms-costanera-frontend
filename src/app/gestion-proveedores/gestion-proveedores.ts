import { Component, OnInit } from '@angular/core';
import { ProveedorService } from '../services/proveedores';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-gestion-proveedores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-proveedores.html',
  styleUrl: './gestion-proveedores.css'
})
export class GestionProveedores implements OnInit {

  proveedores: any[] = [];

  ruc: string = '';

  razonSocial: string = '';

  estadoSunat: string = '';

  tipoProveedor: string = '';

  constructor(
    private proveedorService: ProveedorService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.cargarProveedores();

  }

  cargarProveedores() {

    this.proveedorService
      .listarProveedores()
      .subscribe({

        next: (data) => {

          this.proveedores = [...data];
          this.cdr.detectChanges();

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  buscarSunat() {

    if (!this.ruc.trim()) {
      return;
    }

    this.proveedorService
      .buscarSunat(this.ruc)
      .subscribe({

        next: (data) => {

          this.razonSocial =
            data.razonSocial;

          this.estadoSunat =
            data.estadoSunat;

        },

        error: (err) => {

          console.error(err);

          alert(
            'No se encontró el RUC.'
          );

        }

      });

  }

  guardarProveedor() {

    const proveedor = {

      ruc: this.ruc,

      razonSocial: this.razonSocial,

      estadoSunat: this.estadoSunat,

      tipoProveedor: this.tipoProveedor

    };

    this.proveedorService
      .crearProveedor(proveedor)
      .subscribe({

        next: (mensaje) => {

          alert(
            mensaje
          );

          this.limpiarFormulario();

          this.cargarProveedores();

        },

        error: (err) => {

          alert(
            err.error
          );

        }

      });

  }

  limpiarFormulario() {

    this.ruc = '';

    this.razonSocial = '';

    this.estadoSunat = '';

    this.tipoProveedor = '';

  }

activarProveedor(id: number) {

  this.proveedorService
    .activarProveedor(id)
    .subscribe({

      next: () => {

        this.cargarProveedores();

        setTimeout(() => {
          this.cargarProveedores();
        }, 500);

      },

      error: (err: any) => {

        console.error(err);

      }

    });

}

  desactivarProveedor(id: number) {

  this.proveedorService
    .desactivarProveedor(id)
    .subscribe({

      next: () => {

        this.cargarProveedores();

        setTimeout(() => {
          this.cargarProveedores();
        }, 500);

      },

      error: (err: any) => {

        console.error(err);

      }

    });

}

}