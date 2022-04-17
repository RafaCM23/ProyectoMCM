import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { comentario } from '../main-page/comentario.interface'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(private httpClient: HttpClient) { }

  api=environment.urlapi;
  
  getComentarios(){

  }

  postComentario(comentario:comentario){
    const url=this.api+"/comentario";
    const body=comentario;
    return this.httpClient.post(url,body);
  }
}
