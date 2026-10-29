import { Injectable } from '@angular/core'; // Importa el decorador Injectable para marcar la clase como un servicio inyectable
import { HttpClient, HttpParams } from '@angular/common/http'; // Importa HttpClient para realizar solicitudes HTTP y HttpParams para manejar parámetros de consulta
import { Observable } from 'rxjs'; // Importa Observable de RxJS para manejar flujos de datos asíncronos

// Define el servicio UsuarioService con el decorador Injectable, lo que permite que sea inyectado en otros componentes o servicios
@Injectable({
  providedIn: 'root'
})
// Define la clase UsuarioService que contiene métodos para interactuar con la API de usuarios
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/usuarios'; 

  constructor(private http: HttpClient) { }

  buscarUsuarios(filtro: string): Observable<any[]> {
    let params = new HttpParams();
    if (filtro) {
      params = params.set('termino', filtro);
    }
    return this.http.get<any[]>(this.apiUrl, { params });
  }

  crearUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }

  actualizarUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, usuario);
  }

  inactivarUsuario(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/desactivar`, {});
}

activarUsuario(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/activar`, {});
  }

buscarPorNombre(nombre: string): Observable<any[]> {
  return this.http.get<any[]>(
    `${this.apiUrl}/buscar/${nombre}`
  );
}
}