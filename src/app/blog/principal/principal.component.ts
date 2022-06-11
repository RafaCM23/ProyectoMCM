import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Categoria, Post } from '../../interfaces/blog.interface';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private blogService:BlogService, private router:Router) { }

  ngOnInit(): void {
    this.getNextPost();
    this.recuperaCategorias();
  }

  botonflotante:boolean=false;
  cuantos=0; //Control sobre la página
  todos:Post[]=[]; //Todos los post cargados actualmente

  categorias:Categoria[]=[];
  idCat=-1;
  fecha=1;
  busqueda='';

  recuperaCategorias(){
    this.blogService.recuperaCategorias().subscribe({
      next:resp=>{
        this.categorias=resp;
      },
      error:error=>{
        Swal.fire({
          title:'Ooops',
          icon: 'error',
          text:'Error al cargar las categorías',
          confirmButtonText:'ok'
        })
      }
    })
  }
  
  buscaNombre(){

    const titulo = this.busqueda;
    
    if(titulo==''){this.getPrimeros8SinCat();return}
    if(titulo.length<3){
      Swal.fire({
        title:'Error',
        icon: 'error',
        text:'Busqueda entre 3 y 10 caracteres',
        confirmButtonText:'ok'
      });
      return
    }
    this.blogService.buscaPorTitulo(titulo).subscribe({
      next:resp=>{
        this.todos=resp.reverse();
        this.fecha=1;
      },
      error:error=>{
      }
    })
  }

  buscaCategoria(){
    const id = this.idCat;
    if(id==-1){this.getPrimeros8SinCat();return}
    this.blogService.buscaPorCategoria(id).subscribe({
      next:resp=>{
        this.todos=resp.reverse();
        this.fecha=1;
      },
      error:error=>{
      }
    })
  }
  cambiaOrdenFecha(){
    this.todos=this.todos.reverse();
  }
  getPrimeros8SinCat(){
    this.blogService.loadNextPosts(0).subscribe({
      next:resp=>{
        this.todos=resp;
        this.cuantos=8;
        this.fecha=1;
      },
      error:error=>{
        Swal.fire({
          title:'Error al cargar más entradas',
          text:'Puede que no haya más',
          icon: 'error',
          confirmButtonText:'Ok'
        });
      }
    })
  }
  getNextPost(){
    this.blogService.loadNextPosts(this.cuantos).subscribe({
      next:resp=>{
        for (const p of resp) {
          this.todos.push(p);
        }
        this.cuantos+=8;
        this.fecha=1;
      },
      error:error=>{
        Swal.fire({
          title:'Error al cargar más entradas',
          text:'Puede que no haya más',
          icon: 'error',
          confirmButtonText:'Ok'
        });
      }
    })
  }

  redirige(id:number){
    this.router.navigateByUrl(`/blog/post?id=${id}`)
  }
  fechaSimple(fecha:Date){
    return fecha.toString().substr(0,10)
  }




  //Para mostrar el boton de scroll-up cuando baje un poco
  @HostListener('window:scroll', ['$event']) private onScroll(event: { path: any[]; }) {
    const window = event.path[1];
    const currentScrollHeight = window.scrollY;

    if(currentScrollHeight>350){this.botonflotante=true;}
    else{this.botonflotante=false; }
  }

}
