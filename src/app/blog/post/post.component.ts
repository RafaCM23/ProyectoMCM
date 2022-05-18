import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImagenService } from 'src/app/services/imagen.service';
import Swal from 'sweetalert2';
import { Comentario, Post } from '../../interfaces/blog.interface';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private router:Router, private blogService:BlogService, private imagenService:ImagenService,
    private fb: FormBuilder) { }

  post:Post={
    id:0,
    nombre:'',
    contenido:'',
    categoria:{
      id:0,
      nombre:''
    },
    autor:{
      id:0,
      nombre:'',
      apellidos:'',
      contrasenia:'',
      img:'',
      email:'',
      tlfn:'',
      especialidad:'',
      descripcion:''
    },
    fecha:new Date()
  }
  comentarios:any=[];
  
  comentarioForm: FormGroup = this.fb.group({
    nombre: ['',[Validators.required, Validators.minLength(5)]],  
    contenido: ['',[Validators.required, Validators.minLength(5),Validators.maxLength(100)]]
  })

  campoEsValido(campo:string){
    return this.comentarioForm.controls[campo].errors && this.comentarioForm.controls[campo].touched;
  }

  nuevoComentario=false;
  imagen='';
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
        this.getImgPost();
        this.comentarios=resp.comentarios?.reverse();
      },
      error:error=>{
        Swal.fire({
          title:'Error al cargar el Post',
          icon: 'error',
          text:'Intentelo de nuevo más tarde',
          confirmButtonText:'ok'
        })

      }
    })
  }
  fechaSimple(fecha:Date){
    return fecha.toString().substr(0,10)
  }

  enviarComentario(){
    if ( this.comentarioForm.invalid)  {
      this.comentarioForm.markAllAsTouched();
      Swal.fire({
        title:'Compruebe los campos',
        text:'Compruebe los campos',
        icon: 'error',
        confirmButtonText:'Ok'
      }
    );
      return
    }
    else{
    
      let comentario:Comentario={
        id:0, autor:this.comentarioForm.controls['nombre'].value,contenido:this.comentarioForm.controls['contenido'].value
       }
       this.blogService.creaComentario(this.post.id,comentario).subscribe({
         next:resp=>{
          console.log(resp);
          Swal.fire({
            title:'Comentario publicado con éxito',
            icon: 'success',
            confirmButtonText:'Ok'
          });
          this.comentarios.unshift(comentario)
          console.log(this.comentarios[0]);
         },
         error:error=>{
          Swal.fire({
            title:'Crecenciales Invalidas',
            text: error.error,
            icon: 'error',
            confirmButtonText:'Ok'
          });
         }
       })

    }
  }



  getImgPost(){
    this.imagenService.getFotoPost(this.post.id).subscribe({
      next:resp=>{
        if(resp.size==0){this.imagen=""}
        else{this.formateaBlob(resp);}
      },
      error:error=>{
        this.imagen=""
      }
    })

  }
  //transforma blob en imagen y la asigna
  formateaBlob(blob:Blob){
    var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload=(event:any)=>{
        let imagen:string=event.target.result
        let imagenMod=imagen.replace("data:application/octet-stream","data:image/png");
        this.imagen=imagenMod;

      }
  }

}
