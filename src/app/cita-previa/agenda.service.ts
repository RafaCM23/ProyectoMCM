import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cita, Mes } from './calendario.interface';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(private httpClient: HttpClient) { }

  api=environment.urlapi;
  getMes(numero:number){
    const url=this.api+"/mes/"+numero;//profesional-agenda-mes-anio
    return this.httpClient.get<Mes>(url);
  }

  guardarCita(cita:Cita){
    const url=this.api+"/reserva"
    const body=cita
    return this.httpClient.post(url,body);

  }
}
