import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cita, Mes, Profesional } from './calendario.interface';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(private httpClient: HttpClient) { }

  api=environment.urlapi;
  getMes(id:number,anio:number,mes:number){
    const url=this.api+`/profesional/${id}/agenda/anio/${anio}/mes/${mes}`;//profesional-agenda-mes-anio
    return this.httpClient.get<Mes>(url);
  }

  guardarCita(id:number,anio:number,mes:number,cita:Cita){
    const url=this.api+`/profesional/${id}/agenda/anio/${anio}/mes/${mes}`;
    const body=cita
    return this.httpClient.post(url,body);

  }
  getProfesionales(){
    const url=this.api+'/profesionales'
    return this.httpClient.get<Profesional[]>(url);
  }
}
