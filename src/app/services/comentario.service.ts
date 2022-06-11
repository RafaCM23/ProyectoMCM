import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { comentario } from '../interfaces/comentario.interface'
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(private http: HttpClient,private authService:AuthService) { }

  api=environment.urlapi;


  postComentario(comentario:comentario){
    const url=this.api+"/comentario";
    const body=comentario;
    return this.http.post(url,body);
  }

  getComentariosSinVerificar(){
    const cabecera = new HttpHeaders()
    .set('Authorization',`Bearer ${this.authService.getToken()}` || '');
    const url=this.api+'/comentarios?verificado=false'
    return this.http.get<comentario[]>(url,{headers:cabecera});
  }

  getComentariosVerificados(){
    const url=this.api+'/comentarios?verificado=true'
    return this.http.get<comentario[]>(url);
  }

  aceptaComentario(id:number){
    const cabecera = new HttpHeaders()
    .set('Authorization',`Bearer ${this.authService.getToken()}` || '');
    const url=this.api+`/verifica/comentario/${id}`;
    return this.http.get(url,{headers:cabecera});
  }

  rechazaComentario(id:number){
    const cabecera = new HttpHeaders()
    .set('Authorization',`Bearer ${this.authService.getToken()}` || '');
    const url=this.api+`/rechaza/comentario/${id}`;
    return this.http.get(url,{headers:cabecera});
  }

}
