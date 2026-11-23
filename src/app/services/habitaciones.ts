import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitacionesService {

  private apiUrl = 'http://localhost:8080/habitaciones';

  constructor(private http: HttpClient) { }

  listarHabitaciones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  obtenerDisponibles(
    checkin: string,
    checkout: string
  ): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.apiUrl}/disponibles?checkin=${checkin}&checkout=${checkout}`
    );
  }
}