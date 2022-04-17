import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cita, Mes } from './calendario.interface';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(private httpClient: HttpClient) { }


  getMes(numero:number){
    const url="http://localhost:8080/mes/"+numero;//profesional-agenda-mes-anio
    return this.httpClient.get<Mes>(url);
  }

  guardarCita(cita:Cita){
    const url="http://localhost:8080/reserva"
    const body=cita
    return this.httpClient.post(url,body);

  }
}
