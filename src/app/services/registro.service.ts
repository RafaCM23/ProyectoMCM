import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Profesional } from '../interfaces/calendario.interface';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private httpClient: HttpClient) { }
  api=environment.urlapi;


  nuevoProfesional(prof:Profesional){
    const url=this.api+"/profesional";
    const body=prof;
    return this.httpClient.post(url,body);
  }

  loginProfesional(prof:Profesional){
    const url=this.api+"/auth/login";
    const body=prof;
    return this.httpClient.post<any>(url,body);
  }
}
