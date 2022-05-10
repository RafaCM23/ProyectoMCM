import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  constructor(private http:HttpClient, private authService:AuthService) { }

  api=environment.urlapi;

  
  subeImagen(id:number,imagen:File,nombre:string){
    const cabecera = new HttpHeaders()
    .set('Authorization',`Bearer ${this.authService.getToken()}` || '')
    const url=this.api+`/profesional/${id}/imagen`;
    const fd = new FormData();
    fd.append('file',imagen,nombre);
    return this.http.post(url,fd,{headers:cabecera});
  }

  getMiFoto(){
    const cabecera = new HttpHeaders()
    .set('Authorization',`Bearer ${this.authService.getToken()}` || '');
    const url=this.api+'/mifoto'
    return this.http.get(url,{responseType:'blob',headers:cabecera});
  }

  getFoto(id:number){
    const cabecera = new HttpHeaders()
    .set('Authorization',`Bearer ${this.authService.getToken()}` || '');
    const url=this.api+`/profesional/${id}/imagen`
    return this.http.get(url,{responseType:'blob',headers:cabecera});
  }

}

