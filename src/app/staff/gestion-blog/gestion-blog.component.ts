import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Comentario, Post } from 'src/app/interfaces/blog.interface';
import { BlogService } from 'src/app/services/blog.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-gestion-blog',
  templateUrl: './gestion-blog.component.html',
  styleUrls: ['./gestion-blog.component.css']
})
export class GestionBlogComponent implements OnInit,OnDestroy {

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  
  posts:Post[]=[];
  dtOptions: DataTables.Settings = {};
  dtTrigger:Subject<any> = new Subject<any>();

  idPostComentarios=-1;
  comentarios:Comentario[]=[];
  constructor(private blogService: BlogService, private router:Router) { }
  
  
  ngOnInit(): void {
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      responsive: true,
      scrollX:true,
      language: {
        url: '../assets/es-Es.json'
      }
    };
    this.imprimePosts();
  }

  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();
  }
  imprimePosts():any{
    this.blogService.getAllPosts().subscribe(
      {
        next:resp=>{
          this.posts=resp;
          this.dtTrigger.next(this.dtOptions);
        },
        error:error=>{
          Swal.fire({
            title:'No se han podido recuperar ningun post',
            icon: 'error',
            confirmButtonText:'ok'
          }
        ).then(()=>{
          this.router.navigateByUrl("/staff/hub")
        })
        }
      }
    )
  }

  comentariosPost(event:any){
    this.comentarios=this.posts[event.id].comentarios!;
    this.idPostComentarios=event.id;
    if(this.comentarios.length==0){
      Swal.fire({
        title:'No se encontraron comentario sobre el post con id: '+this.idPostComentarios,
        icon: 'error',
        confirmButtonText:'ok'
      })
    }
  }

  borraComentario(event:any){
    if(event.id<0 || this.idPostComentarios<0){
      Swal.fire({
        title:'Asegurese de seleccionar el post y el comentario',
        icon: 'error',
        text:'Ha habido un error al seleccionar el comentario',
        confirmButtonText:'ok'
      })
    }
    else{
      let postId= this.posts[this.idPostComentarios].id
      this.blogService.deleteComentarioPost(postId,event.id).subscribe({
        next:resp=>{
          Swal.fire({
            title:'Comentario Borrado con éxito',
            icon: 'success',
            confirmButtonText:'ok'
          }).then(()=>{
            this.reloadDatatable();
            this.comentarios=this.posts[event.id].comentarios!;
          })
        },
        error:error=>{
          Swal.fire({
            title:'Error al borrar el comentario',
            icon: 'error',
            text:'Recargue la página e intentelo de nuevo',
            confirmButtonText:'ok'
          })
        }
      })
    }
  }

  reloadDatatable(){
    this.blogService.getAllPosts().subscribe(
      {
        next:resp=>{
          this.posts=resp;
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
          
          this.dtTrigger.next(this.dtOptions)});
          this.comentarios=this.posts[this.idPostComentarios].comentarios!;
        }
        ,error:error=>{
          Swal.fire({
            title:'Algo ha salido mal...',
            icon: 'error',
            text:'Ha habido un error al borrar su anuncio',
            confirmButtonText:'ok'
          }
        );
        }});

  }

  editarPost(event:any){
    this.router.navigateByUrl(`/staff/hub/editar-post?id=${event.id}`)
  }

  borrarPost(event:any){
    const id= event.id;
    Swal.fire({
      title: "Post: "+id,
      text: "¿Está seguro que desea eliminar este post?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
  })
  .then(resultado => {
      if (resultado.value) {
          // Dice que si
          this.blogService.deletePost(id).subscribe({
            
            next:resp=>{
              this.reloadDatatable();
            },error:error=>{

              Swal.fire({
                title:'Algo ha salido mal...',
                icon: 'error',
                text:'Ha habido un error al borrar su anuncio',
                confirmButtonText:'ok'
              }
            );
            }
          });
                } 
            });
          }
  
  fechaSimple(fecha:Date){
    return fecha.toString().substr(0,10)
  }
    

}
