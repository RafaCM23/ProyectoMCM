import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap'
@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {


  cerrarModal:string='';
    constructor() {}

  ngOnInit(): void {
  }

  comentarios:String[]=[];

  addComentario(comentario:String){
    this.comentarios.push(comentario);
  }

  open(){
    
  }
}
