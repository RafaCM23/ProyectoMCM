import { Component, HostListener, OnInit } from '@angular/core';
import { Post } from '../blog.interface';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private blogService:BlogService) { }

  ngOnInit(): void {
    this.getAllPost();
  }
  botonflotante:boolean=false;

  todos:Post[]=[];

  getAllPost(){
    this.blogService.getAllPosts().subscribe({
      next:resp=>{
        console.log(resp);
        this.todos=resp;
      },
      error:error=>{
        console.log(error);
      }
    })
  }








  //Para mostrar el boton de scroll-up cuando baje un poco
  @HostListener('window:scroll', ['$event']) onScroll(event: { path: any[]; }) {
    const window = event.path[1];
    const currentScrollHeight = window.scrollY;

    if(currentScrollHeight>350){this.botonflotante=true;}
    else{this.botonflotante=false; }
  }

}
