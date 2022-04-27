import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailOcupadoService {

  constructor(private httpClient: HttpClient) { }
  api=environment.urlapi;

  validate(control:AbstractControl):Observable<ValidationErrors | null>{
    const url=this.api+"/correoOcupado";
    const body=control.value;
    return this.httpClient.post(url,body)
    .pipe(
      //devuelve 404 si no lo encuentra y 200 si lo encuentra
      map( resp => {
        
        return  { emailOcupado: true }
      }),
      catchError(() => of(null))
    );
    
    
  }
}
