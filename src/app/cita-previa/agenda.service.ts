import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Cita, Mes, Profesional } from './calendario.interface';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(private http: HttpClient,private authService:AuthService) { }

  api=environment.urlapi;
  getMes(id:number,anio:number,mes:number){
    const url=this.api+`/profesional/${id}/agenda/anio/${anio}/mes/${mes}`;//profesional-agenda-mes-anio
    return this.http.get<Mes>(url);
  }

  guardarCita(id:number,anio:number,mes:number,cita:Cita){
    const url=this.api+`/profesional/${id}/agenda/anio/${anio}/mes/${mes}`;
    const body=cita
    return this.http.post(url,body);

  }
  ocupaDia(id:number,anio:number,mes:number,dia:number){
    const url=this.api+`/ocupado/profesional/${id}/agenda/anio/${anio}/mes/${mes}/dia/${dia}`;
    let token=this.authService.getToken();
    const cabecera = new HttpHeaders()
    .set('Authorization',`Bearer ${token}`);
    console.log(cabecera);
    return this.http.post(url,{headers:cabecera});//PORQUE NO FUNCIONAA
  }
  getProfesionales(){
    const url=this.api+'/profesionales'
    return this.http.get<Profesional[]>(url);
  }

  whoIs(){
    const cabecera = new HttpHeaders()
    .set('Authorization',`Bearer ${this.authService.getToken()}` || '');
    const url=this.api+'/whois'
    return this.http.get(url,{headers:cabecera});
  }

}
