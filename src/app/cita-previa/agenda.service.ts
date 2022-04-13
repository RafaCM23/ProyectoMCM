import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cita, Mes } from './calendario.interface';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(private httpClient: HttpClient) { }


  getEnero(){
    const url="http://localhost:8080/diasEnero";
    return this.httpClient.get<Mes>(url);
  }

  guardarCita(cita:Cita){
    const url="http://localhost:8080/reserva"
    const body=cita
    return this.httpClient.post(url,body);

  }
}
