import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal ,NgbModalOptions } from '@ng-bootstrap/ng-bootstrap'
import Swal from 'sweetalert2';
import { comentario } from '../../interfaces/comentario.interface';
import { ComentarioService } from '../../services/comentario.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {


  cerrarModal:string='';
  constructor(private modalService:NgbModal, private comentService:ComentarioService) {}

  ngOnInit(): void {
    this.getComentarios();
  }
  comentario:comentario={
    autor:'',
    contenido:''
  }

  comentarios:comentario[]=[];


  getComentarios(){
    this.comentService.getComentariosVerificados().subscribe({
      next:resp=>{
        this.comentarios=resp;
        console.log(this.comentarios);
      },
      error:error=>{
      }
    })
  }
  guardarComentario(){
    if(this.comentario.autor.length>4 && this.comentario.contenido.length>20){
      this.comentService.postComentario(this.comentario).subscribe({
        next:resp=>{
          Swal.fire({
            title:'Comentario Creado!',
            icon: 'success',
            text:'Muchas gracias por compartir tu experiencia. Solo falta que un administrador lo revise',
            confirmButtonText:'ok'
          }
        ).then((result) =>{
          this.modalService.dismissAll('Exitoso');
        })        
        },
        error:error=>{
          Swal.fire({
            title:'Compruebe los campos',
            icon: 'error',
            text:error.error,
            confirmButtonText:'ok'
          }
        );
        }
      })


    }
    else{
      Swal.fire({
        title:'Compruebe los campos',
        icon: 'error',
        text:'Autor: mínimo 5 carácteres, Comentario: mínimo 20 carácteres',
        confirmButtonText:'ok'
      }
    );
    }
  }

  open(content: any) {
    this.modalService.open(content,
       {ariaLabelledBy: 'modal-basic-title',windowClass:'modal'}).result.then((result) => {
      this.cerrarModal = `Closed with: ${result}`;
    }, (reason) => {
      this.cerrarModal = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
