import { Component, HostListener, OnInit } from '@angular/core';
import { getWindowScrollTop } from 'handsontable/helpers/dom';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  botonflotante:boolean=false;
  posicion=0;
  


  //Para mostrar el boton de scroll-up cuando baje un poco
  @HostListener('window:mousewheel', ['$event'])
    apareceBoton(event:any) {
      let direccion = event.wheelDelta;
      if(direccion>1 && this.posicion<=0){ this.posicion++; }
      else{  this.posicion--;   }
      this.botonflotante = (this.posicion<-5)? this.botonflotante=true : this.botonflotante=false ;
    }
  
    resetPosicion(){
      this.posicion=0;
      this.botonflotante=false;
    }

}
