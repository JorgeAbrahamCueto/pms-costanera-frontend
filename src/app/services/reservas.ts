import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  private apiUrl = 'http://localhost:8080/reservas';

  constructor(private http: HttpClient) { }

  listarReservas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearReserva(reserva: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl,
      reserva
    );
  }

  realizarCheckin(id: number): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${id}/checkin`,
      {}
    );

  }

  realizarCheckout(id: number): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${id}/checkout`,
      {}
    );
  }
}