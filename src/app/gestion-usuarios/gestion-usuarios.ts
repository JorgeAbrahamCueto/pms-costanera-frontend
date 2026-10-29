import { Component, OnInit } from '@angular/core'; // Importa los módulos necesarios para el componente
import { CommonModule } from '@angular/common'; // Importa el módulo CommonModule para usar directivas comunes de Angular
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa los módulos necesarios para trabajar con formularios reactivos
import { UsuarioService } from '../services/usuarios';

// Define el componente GestionUsuarios con su selector, plantilla y estilos
@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gestion-usuarios.html',
  styleUrl: './gestion-usuarios.css'
})
export class GestionUsuarios implements OnInit {
  usuarioForm: FormGroup;
  usuarios: any[] = [];
  usuarioSeleccionado: any = null;
  terminoBusqueda: string = '';

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.usuarioForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      dni: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rol: ['Administrador', Validators.required]
    });
  }
  ngOnInit(): void {
    this.cargarUsuarios(); // Se llama a la BD al abrir la pantalla
  }

  cargarUsuarios() {
    this.usuarioService.buscarUsuarios('').subscribe({
      next: (data: any[]) => {

        this.usuarios = [...data];

        console.log('usuarios variable:', this.usuarios);

      },
      error: (err: any) => console.error('Error al cargar usuarios', err)
    });
  }

  onBuscar(event: any) {

    const texto = event.target.value.trim();

    if (!texto) {
      this.cargarUsuarios();
      return;
    }

    this.usuarioService.buscarPorNombre(texto)
      .subscribe({
        next: (data: any[]) => {
          console.log('Usuarios recibidos:', data);

          setTimeout(() => {
            this.usuarios = data;
          });
        },
      });

  }

  seleccionarUsuario(usuario: any) {

    console.log('Usuario seleccionado:', usuario);

    this.usuarioSeleccionado = usuario;

    this.usuarioForm.patchValue({

      nombres: usuario.nombreusuario,

      apellidos: usuario.apellidousuario,

      dni: usuario.dniusuario,

      email: usuario.correousuario,

      username: usuario.usernameusuario,

      password: usuario.passwordHash,

      rol: usuario.rol?.nombreRol

    });

  }


  nuevoUsuario() {
    this.usuarioSeleccionado = null;
    this.usuarioForm.reset({ rol: 'Administrador' });
  }

  grabarUsuario() {

    if (this.usuarioForm.invalid) return;

    let idRol = 1;

    if (this.usuarioForm.value.rol === 'RECEPCIONISTA') {
      idRol = 2;
    }

    if (this.usuarioForm.value.rol === 'HOUSEKEEPING') {
      idRol = 3;
    }

    const nuevoUsuario = {

      nombreusuario: this.usuarioForm.value.nombres,

      apellidousuario: this.usuarioForm.value.apellidos,

      dniusuario: this.usuarioForm.value.dni,

      correousuario: this.usuarioForm.value.email,

      usernameusuario: this.usuarioForm.value.username,

      passwordHash: this.usuarioForm.value.password,

      rol: {
        idRol: idRol
      }

    };

    this.usuarioService.crearUsuario(nuevoUsuario)
      .subscribe({
        next: () => {
          this.cargarUsuarios();
          this.nuevoUsuario();
        },
        error: (err) => console.error(err)
      });

  }

  editarUsuario() {

    if (!this.usuarioSeleccionado || this.usuarioForm.invalid) return;

    console.log(this.usuarioForm.value.rol);

    const usuarioActualizar = {
      nombreusuario: this.usuarioForm.value.nombres,
      apellidousuario: this.usuarioForm.value.apellidos,
      dniusuario: this.usuarioForm.value.dni,
      correousuario: this.usuarioForm.value.email,
      usernameusuario: this.usuarioForm.value.username,
      passwordHash: this.usuarioForm.value.password,
      rol: {
        idRol: this.usuarioForm.value.rol === 'ADMINISTRADOR' ? 1 :
          this.usuarioForm.value.rol === 'RECEPCIONISTA' ? 2 : 3
      }
    };

    console.log(usuarioActualizar);

    this.usuarioService.actualizarUsuario(
      this.usuarioSeleccionado.idUsuario,
      usuarioActualizar
    ).subscribe({
      next: () => {
        this.cargarUsuarios();
        //this.nuevoUsuario();
      },
      error: (err) => console.error(err)
    });
  }

  inactivarUsuario() {
    if (!this.usuarioSeleccionado) return;

    this.usuarioService.inactivarUsuario(this.usuarioSeleccionado.idUsuario).subscribe({
      next: () => {
        this.cargarUsuarios();
        this.nuevoUsuario();
      }
    });
  }

  activarUsuario() {

    if (!this.usuarioSeleccionado) return;

    this.usuarioService.activarUsuario(
      this.usuarioSeleccionado.idUsuario
    ).subscribe({
      next: () => {
        this.cargarUsuarios();
        this.nuevoUsuario();
      }
    });
  }

}
