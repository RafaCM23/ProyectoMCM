import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Categoria, Post } from './blog.interface';

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
    const cabecera = new HttpHeaders()
    .set('Authorization',`Bearer ${this.authService.getToken()}` || '');
    const url=this.api+'/categorias'
    return this.http.get<Categoria[]>(url,{headers:cabecera});
  }

  nuevoPost(post:Post){
    const cabecera = new HttpHeaders()
    .set('Authorization',`Bearer ${this.authService.getToken()}` || '');
    const url=this.api+'/post'
    const body=post;
    return this.http.post(url,body,{headers:cabecera});
  }

  getAllPosts(){
    const cabecera = new HttpHeaders()
    .set('Authorization',`Bearer ${this.authService.getToken()}` || '');
    const url=this.api+'/posts'
    return this.http.get<Post[]>(url,{headers:cabecera});
  }

  getPost(id:number){
    const cabecera = new HttpHeaders()
    .set('Authorization',`Bearer ${this.authService.getToken()}` || '');
    const url=this.api+`/post/${id}`
    return this.http.get<Post>(url,{headers:cabecera});
  }

}
