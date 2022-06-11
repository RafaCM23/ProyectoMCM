import { Component, OnInit } from '@angular/core';
import { Profesional } from 'src/app/interfaces/calendario.interface';
import { comentario } from 'src/app/interfaces/comentario.interface';
import { ComentarioService } from 'src/app/services/comentario.service';
import { StaffService } from 'src/app/services/staff.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-acepta-comentario',
  templateUrl: './acepta-comentario.component.html',
  styleUrls: ['./acepta-comentario.component.css']
})
export class AceptaComentarioComponent implements OnInit {

  constructor(private comentService:ComentarioService) { }

  comentarios:comentario[]=[];

  existentes=0;
  ngOnInit(): void {
    this.getComentarios();
  }

  cargaComentarios(){
    if(this.existentes==0){
      this.comentarios=[];
      this.getComentarios();
    }
    else{
      this.comentarios=[];
      this.getComentariosPublicos();
    }
  }

  
  getComentarios(){
    this.comentService.getComentariosSinVerificar().subscribe({
      next:resp=>{
        this.comentarios=resp;
        this.comentarios.reverse();
      },
      error:error=>{
        this.comentarios=[];
      }
    })
  }

  getComentariosPublicos(){
    this.comentService.getComentariosVerificados().subscribe({
      next:resp=>{
        this.comentarios=resp;
        this.comentarios.reverse();
      },
      error:error=>{
        this.comentarios=[];
      }
    })
  }

  acepta(event:any) {
    let id= event.target.id;
    this.comentService.aceptaComentario(id).subscribe({
      next:resp=>{
        Swal.fire({
          title:'Comentario aceptado con éxito',
          text:'Ya es visible en la página principal',
          icon: 'success',
          confirmButtonText:'Ok'
        }).then(()=>{
          this.getComentarios();
        })
      },
      error:error=>{
        Swal.fire({
          title:'Error al aceptar el comentario',
          text:'Recargue la página e intentelo de nuevo',
          icon: 'error',
          confirmButtonText:'Ok'
        });
      }
    })
  }
  rechaza(event:any) {
    let id= event.target.id;
    this.comentService.rechazaComentario(id).subscribe({
      next:resp=>{
        Swal.fire({
          title:'Comentario rechazado con éxito',
          icon: 'success',
          confirmButtonText:'Ok'
        }).then(()=>{
          this.getComentarios();
        })
      },
      error:error=>{
        Swal.fire({
          title:'Error al rechazar el comentario',
          text:'Recargue la página e intentelo de nuevo',
          icon: 'error',
          confirmButtonText:'Ok'
        });
      }
    })
  }

  fechaSimple(fecha:Date){
    return fecha.toString().substr(0,10)
  }

  borraComentario(evento:any){
    this.comentService.rechazaComentario(evento.id).subscribe({
      next:resp=>{
        Swal.fire({
          title:'Comentario borrado con éxito',
          icon: 'success',
          confirmButtonText:'Ok'
        }).then(()=>{
          this.getComentariosPublicos();
        })
      },
      error:error=>{
        Swal.fire({
          title:'Error al borrar el comentario',
          icon: 'error',
          text:'Recargue la página e intentelo de nuevo',
          confirmButtonText:'Ok'
        })
      }
    })
  }


}
