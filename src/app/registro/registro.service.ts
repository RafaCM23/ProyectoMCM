import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profesional } from '../cita-previa/calendario.interface';

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
}
