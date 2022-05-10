import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../blog.interface';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private router:Router, private blogService:BlogService) { }

  post:Post={
    nombre:'',
    contenido:'',
    categoria:0
  }
  ngOnInit(): void {
    this.iniciaPost();
  }



  iniciaPost(){
    const queryString = window.location.search;
    const id = new URLSearchParams(queryString).get("id");;
    if(id==null){this.router.navigateByUrl("/blog");}
    else{
      this.getPost(parseInt(id));
    }
  }

  getPost(id:number){
    this.blogService.getPost(id).subscribe({
      next:resp=>{
        this.post=resp;
        console.log(resp);
      },
      error:error=>{
        console.log(error);

      }
    })
  }

}
