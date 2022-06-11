import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Profesional } from '../interfaces/calendario.interface';
import { comentario } from '../interfaces/comentario.interface';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private http:HttpClient, private authService:AuthService) { }

  api=environment.urlapi;

  getNuevosProfesionales(){
    const url=this.api+"/profesionales?verificado=false";
    return this.http.get<Profesional[]>(url);
  }
  getProfesionalesVerificados(){
    const url=this.api+"/profesionales?verificado=true";
    return this.http.get<Profesional[]>(url);
  }

  aceptaRegistro(id:number){
    const cabecera = new HttpHeaders()
    .set('Authorization',`Bearer ${this.authService.getToken()}` || '');
    const url=this.api+`/verifica/profesional/${id}`;
    return this.http.get(url,{headers:cabecera});
  }
  rechazaRegistro(id:number){
    const cabecera = new HttpHeaders()
    .set('Authorization',`Bearer ${this.authService.getToken()}` || '');
    const url=this.api+`/rechaza/profesional/${id}`;
    return this.http.get(url,{headers:cabecera});
  }
  isAdmin(){
    const cabecera = new HttpHeaders()
    .set('Authorization',`Bearer ${this.authService.getToken()}` || '');
    const url=this.api+'/isAdmin'
    return this.http.get<boolean>(url,{headers:cabecera});
  }
  getMisDatos(){
    const cabecera = new HttpHeaders()
    .set('Authorization',`Bearer ${this.authService.getToken()}` || '');
    const url=this.api+'/misdatos'
    return this.http.get<Profesional>(url,{headers:cabecera});
  }

  getAllProfesionales(){
    const cabecera = new HttpHeaders()
    .set('Authorization',`Bearer ${this.authService.getToken()}` || '');
    const url=this.api+'/allprofesionales'
    return this.http.get<Profesional[]>(url,{headers:cabecera});
  }
  putDatos( prof:Profesional){
    const cabecera = new HttpHeaders()
    .set('Authorization',`Bearer ${this.authService.getToken()}` || '');
    const url=this.api+`/profesional/${prof.id}`
    const body=prof;
    return this.http.put(url,body,{headers:cabecera});
  }

  borraProf(id:number){
    const cabecera = new HttpHeaders()
    .set('Authorization',`Bearer ${this.authService.getToken()}` || '');
    const url=this.api+`/profesional/${id}`;
    return this.http.delete(url,{headers:cabecera});
  }

  whoIs(){
    const cabecera = new HttpHeaders()
    .set('Authorization',`Bearer ${this.authService.getToken()}` || '');
    const url=this.api+'/whois'
    return this.http.get<number>(url,{headers:cabecera});
  }

  
}
