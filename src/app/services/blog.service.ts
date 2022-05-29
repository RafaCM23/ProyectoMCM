import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Categoria, Comentario, Post } from '../interfaces/blog.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http:HttpClient, private authService:AuthService) { }

  api=environment.urlapi;

  creaCategoria(categoria:String){
    const cabecera = new HttpHeaders()
    .set('Authorization',`Bearer ${this.authService.getToken()}` || '');
    const url=this.api+'/categoria'
    const body ={
      'nombre':categoria
    }
    return this.http.post(url,body,{headers:cabecera});
  }

  recuperaCategorias(){
    const url=this.api+'/categorias'
    return this.http.get<Categoria[]>(url);
  }

  nuevoPost(post:Post){
    const cabecera = new HttpHeaders()
    .set('Authorization',`Bearer ${this.authService.getToken()}` || '');
    const url=this.api+'/post'
    const body=post;
    return this.http.post<number>(url,body,{headers:cabecera});
  }

  loadNextPosts(pagina:number){
    const cabecera = new HttpHeaders()
    .set('Authorization',`Bearer ${this.authService.getToken()}` || '');
    const url=this.api+`/posts?page=${pagina}` //Cada página son 10 posts
    return this.http.get<Post[]>(url,{headers:cabecera});
  }

  getPost(id:number){
    const cabecera = new HttpHeaders()
    .set('Authorization',`Bearer ${this.authService.getToken()}` || '');
    const url=this.api+`/post/${id}`
    return this.http.get<Post>(url,{headers:cabecera});
  }

  getAllPosts(){
    const cabecera = new HttpHeaders()
    .set('Authorization',`Bearer ${this.authService.getToken()}` || '');
    const url=this.api+`/allPosts`
    return this.http.get<Post[]>(url,{headers:cabecera});
  }
  deletePost(id:number){
    const cabecera = new HttpHeaders()
    .set('Authorization',`Bearer ${this.authService.getToken()}` || '');
    const url=this.api+`/post/${id}`
    return this.http.delete(url,{headers:cabecera});
  }
  deleteComentarioPost(idPost:number,idComent:number){
    const cabecera = new HttpHeaders()
    .set('Authorization',`Bearer ${this.authService.getToken()}` || '');
    const url=this.api+`/post/${idPost}/comentario/${idComent}`
    return this.http.delete(url,{headers:cabecera});
  }

  creaComentario(id:number, comentario:Comentario){
    const url=this.api+`/post/${id}/comentario`
    const body= comentario;
    return this.http.post(url,body);
  }

  editaPost(post:Post){
    const cabecera = new HttpHeaders()
    .set('Authorization',`Bearer ${this.authService.getToken()}` || '');
    const url=this.api+`/post/${post.id}`;
    const body=post;
    return this.http.put<number>(url,body,{headers:cabecera});
  }

  getRelacionados(categoria:number){//Saca 3 post de la misma categoría, aleatorios
    const url=this.api+`/postRelacionados/${categoria}`;
    return this.http.get<Post[]>(url);
  }

  getBlogPreview(){//Saca 3 post de la misma categoría, aleatorios
    const url=this.api+`/blogPreview`;
    return this.http.get<Post[]>(url);
  }

  // -- Filtros -- //

  buscaPorCategoria(id:number){
    const url=this.api+`/posts?categoria=${id}`;
    return this.http.get<Post[]>(url);
  }
  buscaPorTitulo(titulo:string){
    const url=this.api+`/posts?titulo=${titulo}`;
    return this.http.get<Post[]>(url);
  }
}
