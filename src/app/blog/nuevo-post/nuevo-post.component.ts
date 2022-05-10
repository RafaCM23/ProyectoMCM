import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Categoria, Post } from '../blog.interface';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-nuevo-post',
  templateUrl: './nuevo-post.component.html',
  styleUrls: ['./nuevo-post.component.css']
})
export class NuevoPostComponent implements OnInit {

  constructor(private fb: FormBuilder, private blogService: BlogService,private modalService:NgbModal) { }

  nuevaCat=false;
  categorias:Categoria[]=[];
  
  post:Post={
    nombre:'',
    contenido:'',
    categoria:0
  }
  cerrarModal:string='';
  imagen='';
  ngOnInit(): void {
    this.recuperaCategorias();
  }


  postForm: FormGroup = this.fb.group({
    nombre: ['',[Validators.required, Validators.minLength(5)]],  
    categoria: ['0',[]],
    contenido:['',[Validators.required, Validators.minLength(150)]],
    nuevaCategoria:['     ',[Validators.minLength(5)]]
    //imagen
  })

  recuperaCategorias(){
    this.blogService.recuperaCategorias().subscribe({
      next:resp=>{
        this.categorias=resp;
      },
      error:error=>{
        Swal.fire({
          title:'Ooops',
          icon: 'error',
          text:'Error al cargar las categorías',
          confirmButtonText:'ok'
        })
      }
    })
  }

  cancelarNuevaCat(){
    this.nuevaCat=false;
    this.postForm.controls['nuevaCategoria'].setValue('');
    this.postForm.controls['nuevaCategoria'].markAsUntouched();
  }
  creaCategoria(){
    if(!this.campoEsInvalido('nuevaCategoria')){
      this.blogService.creaCategoria(this.postForm.get("nuevaCategoria")?.value).subscribe({
        next:resp=>{
          Swal.fire({
            title:'Categoria Creada con éxito',
            icon: 'success',
            confirmButtonText:'ok'
          });
          this.recuperaCategorias();
          this.nuevaCat=false;
          this.postForm.controls['nuevaCategoria'].setValue('');
          this.postForm.controls['nuevaCategoria'].markAsUntouched();
        },
        error:error=>{
          Swal.fire({
            title:'Error al crear la categoría',
            icon: 'error',
            text:'Intentelo más tarde',
            confirmButtonText:'ok'
          })
        }
      })
    }

  }

  campoEsInvalido(campo:string){
    return this.postForm.controls[campo].errors && this.postForm.controls[campo].touched;
  }


  guardaPost(){
    if(this.postForm.valid){
      this.post.nombre=this.postForm.get('nombre')?.value;
      this.post.categoria=this.postForm.get('categoria')?.value;
      this.post.contenido=this.postForm.get('contenido')?.value;
      this.blogService.nuevoPost(this.post).subscribe({
        next:resp=>{
          Swal.fire({
            title:'Post publicado con éxito',
            icon: 'success',
            confirmButtonText:'ok'
          }).then(()=>{
            this.ngOnInit();
          })
        },
        error:error=>{
          Swal.fire({
            title:'Error al publicar el Post',
            icon: 'error',
            text:'Intentelo más tarde',
            confirmButtonText:'ok'
          })
        }
      })
    }
    else{
      this.postForm.controls['nombre'].markAsTouched();
      this.postForm.controls['contenido'].markAsTouched();
      this.imprimeErrores();
    }
  }

  imprimeErrores(){
    console.log(this.postForm.errors)
      let resp='';
      let p=this.post;

      if(this.campoEsInvalido('nombre')){
        resp+="<br>*Nombre mínimo 5 carácteres"
      }
      if(this.campoEsInvalido('contenido')){
        resp+="<br>*Descripción mínimo 140 carácteres"
      }
      if(this.campoEsInvalido('categoria')){
        console.log("categoria invalida")
      }
      if(this.campoEsInvalido('nuevaCategoria')){
        console.log("nueva cat invalida")
      }
  
     if(resp!=''){  Swal.fire({
        title:'Formulario invalido',
        html:resp,
        icon: 'error',
        confirmButtonText:'Ok'
      });
        return false;}   else{return true;}
    
  }
//-----------------------------------MODAL IMG----------------------------------------------//
  //abre Modal
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
  //Recoge la imagen del input file
  capturaImg($evento:any){
    const imagen=$evento.target.files[0];
    //this.archivoImagen=imagen;
    if(imagen){
      var reader = new FileReader();
      reader.readAsDataURL(imagen);
      reader.onload=(event:any)=>{
        this.imagen=event.target.result;
      }
    }
    
  }
  generaIdImagen(){
    let respuesta="";
    let cabeza="fotoPerfil_";
   // let prof= this.prof.id+"_";
    let fecha=new Date().getMilliseconds()
   // respuesta=cabeza+prof+fecha;
    return respuesta;
  }
  //Si hay una imagen seleccionada, se genera un nombre y se guarda en el Back
  // guardaImagen(){
  //   if(this.archivoImagen==null){
  //     Swal.fire({
  //       title:'Debe Seleccionar un archivo',
  //       text:'Intentelo de nuevo',
  //       icon: 'error',
  //       confirmButtonText:'Ok'
  //     });
  //   }
  //   else{
  //   let nombreImagen=this.generaIdImagen();
  //   this.imagenService.subeImagen(this.archivoImagen,nombreImagen).subscribe({
  //     next:resp=>{
  //       this.archivoImagen=null;
  //       this.modalService.dismissAll();
  //       Swal.fire({
  //         title:'Imagen Subida con éxito',
  //         icon: 'success',
  //         confirmButtonText:'Ok'
  //       }).then(()=>{
  //         this.router.navigateByUrl("/staff/hub/mis-datos");
  //       })
  //     },
  //     error:error=>{
  //       Swal.fire({
  //         title:'Error al subir la imagen',
  //         text:'Intentelo de nuevo',
  //         icon: 'error',
  //         confirmButtonText:'Ok'
  //       });
  //     }
  //   });
  //   }
  // }
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
