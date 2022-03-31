import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal ,NgbModalOptions } from '@ng-bootstrap/ng-bootstrap'
@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {


  cerrarModal:string='';
  constructor(private modalService:NgbModal) {}

  ngOnInit(): void {
  }

  comentarios:String[]=[];

  addComentario(comentario:String){
    this.comentarios.push(comentario);
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
