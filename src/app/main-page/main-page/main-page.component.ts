import { Component, HostListener, OnInit } from '@angular/core';

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

  


  //Para mostrar el boton de scroll-up cuando baje un poco
  @HostListener('window:scroll', ['$event']) onScroll(event: { path: any[]; }) {
    const window = event.path[1];
    const currentScrollHeight = window.scrollY;

    if(currentScrollHeight>450){this.botonflotante=true;}
    else{this.botonflotante=false; }
  }

}
