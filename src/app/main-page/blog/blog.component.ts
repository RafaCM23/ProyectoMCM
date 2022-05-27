import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/interfaces/blog.interface';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(private blogService:BlogService, private router:Router) { }

  ngOnInit(): void {
    this.getPreview();
  }

  posts:Post[]=[];

  vacio=false;
  getPreview(){
    this.blogService.getBlogPreview().subscribe({
      next:resp=>{
        console.log(resp);
        this.posts=resp;
      },
      error:error=>{
        this.vacio=true;
      }
    })
  }

  redirige(id:number){
    this.router.navigateByUrl(`/blog/post?id=${id}`)
  }

  fechaSimple(fecha:Date){
    return fecha.toString().substr(0,10)
  }


}
