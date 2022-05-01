import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Profesional } from '../cita-previa/calendario.interface';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private httpClient:HttpClient) { }

  api=environment.urlapi;

  getNuevosProfesionales(){
    const url=this.api+"/profesionales?verificado=false";
    return this.httpClient.get<Profesional[]>(url);
  }

  aceptaRegistro(id:number){
    const url=this.api+`/verifica/profesional/${id}`;
    console.log(url);
    return this.httpClient.get(url);
  }
  rechazaRegistro(id:number){
    const url=this.api+`/rechaza/profesional/${id}`;
    return this.httpClient.get(url);
  }
}
