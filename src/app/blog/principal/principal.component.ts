import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Post } from '../../interfaces/blog.interface';
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
  }
  botonflotante:boolean=false;
  cuantos=0;
  todos:Post[]=[];


  getNextPost(){
    this.blogService.loadNextPosts(this.cuantos).subscribe({
      next:resp=>{
        for (const p of resp) {
          this.todos.push(p);
        }
        this.cuantos+=8;
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
  @HostListener('window:scroll', ['$event']) onScroll(event: { path: any[]; }) {
    const window = event.path[1];
    const currentScrollHeight = window.scrollY;

    if(currentScrollHeight>350){this.botonflotante=true;}
    else{this.botonflotante=false; }
  }

}
