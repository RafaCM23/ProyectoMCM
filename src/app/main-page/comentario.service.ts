import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { comentario } from '../main-page/comentario.interface'
@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(private httpClient: HttpClient) { }

  getComentarios(){

  }

  postComentario(comentario:comentario){
    const url="http://localhost:8080/comentario";
    const body=comentario;
    return this.httpClient.post(url,body);
  }
}
