import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  botonflotante:boolean=false;

  


  //Para mostrar el boton de scroll-up cuando baje un poco
  @HostListener('window:scroll', ['$event']) onScroll(event: { path: any[]; }) {
    const window = event.path[1];
    const currentScrollHeight = window.scrollY;

    if(currentScrollHeight>350){this.botonflotante=true;}
    else{this.botonflotante=false; }
  }

}
