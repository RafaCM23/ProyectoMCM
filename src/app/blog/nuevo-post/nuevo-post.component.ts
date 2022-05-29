import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImagenService } from '../../services/imagen.service';
import Swal from 'sweetalert2';
import { Categoria, Post } from '../../interfaces/blog.interface';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-nuevo-post',
  templateUrl: './nuevo-post.component.html',
  styleUrls: ['./nuevo-post.component.css']
})
export class NuevoPostComponent implements OnInit {

  constructor(private fb: FormBuilder, private blogService: BlogService,private modalService:NgbModal,
    private imagenService:ImagenService) { }

  nuevaCat=false;
  categorias:Categoria[]=[];
  edicion=false;
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
  cerrarModal:string='';
  archivoImagen:any=null;

  ngOnInit(): void {
    this.iniciaEditar()
    this.recuperaCategorias();
  }

  iniciaEditar(){
    const queryString = window.location.search;
    const id = new URLSearchParams(queryString).get("id");
    if(id!=null){
      this.edicion=true;
      this.recuperaPost(Number.parseInt(id));
    }
  }


  postForm: FormGroup = this.fb.group({
    nombre: ['',[Validators.required, Validators.minLength(5)]],  
    categoria: ['0',[]],
    contenido:['',[Validators.required, Validators.minLength(150)]],
    nuevaCategoria:['',[Validators.minLength(5)]],
    imagen:['./assets/imagenes/ocupado.png',[]]
  })

  img='./assets/imagenes/ocupado.png';
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

  recuperaPost(id:number){
    this.blogService.getPost(id).subscribe({
      next:resp=>{
        this.post=resp;
        this.cargaValores(resp);
        this.recuperaImagen(resp.id)
      },
      error:error=>{
        console.log("error al cargar")
      }
    })
  }

  recuperaImagen(id:number){
    this.imagenService.getFotoPost(this.post.id).subscribe({
      next:resp=>{
        if(resp.size==0){this.img='./assets/imagenes/ocupado.png'}

        else{this.formateaBlob(resp);}
      },
      error:error=>{
        this.img='./assets/imagenes/ocupado.png'
      }
    })

  }

  cargaValores(post:Post){
    this.postForm.controls['nombre'].setValue(post.nombre);
    this.postForm.controls['contenido'].setValue(post.contenido);
    this.postForm.controls['categoria'].setValue(post.categoria.nombre);
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
  imagenValida(){
    return this.postForm.controls['imagen'].value=='./assets/imagenes/ocupado.png' && this.postForm.controls['imagen'].touched;
  }


  guardaPost(){
    if(this.archivoImagen==null && this.img=='./assets/imagenes/ocupado.png'){
      Swal.fire({
        title:'Debe Seleccionar un archivo',
        text:'Intentelo de nuevo cuando haya subido una imagen',
        icon: 'error',
        confirmButtonText:'Ok'
      });
    }
    else if(this.postForm.valid && this.edicion==false){
      this.post.nombre=this.postForm.get('nombre')?.value;
      this.post.categoria.id=this.postForm.get('categoria')?.value;
      this.post.contenido=this.postForm.get('contenido')?.value;
      console.log(this.post);
      this.blogService.nuevoPost(this.post).subscribe({
        next:resp=>{
          Swal.fire({
            title:'Post publicado con éxito',
            icon: 'success',
            confirmButtonText:'ok'
          }).then(()=>{
            this.guardaImagen(resp)
            this.ngOnInit();
          })
        },
        error:error=>{
          console.log(error);
          Swal.fire({
            title:'Error al publicar el Post',
            icon: 'error',
            text:error.error,
            confirmButtonText:'ok'
          })
        }
      })
    }
    else if(this.postForm.valid && this.edicion==true){
      this.post.nombre=this.postForm.get('nombre')?.value;
      this.post.categoria.id=this.postForm.get('categoria')?.value;
      this.post.contenido=this.postForm.get('contenido')?.value;
      this.blogService.editaPost(this.post).subscribe({
        next:resp=>{
          Swal.fire({
            title:'Post modificado con éxito',
            icon: 'success',
            confirmButtonText:'ok'
          }).then(()=>{
            this.guardaImagen(resp)
            this.ngOnInit();
          })
        },
        error:error=>{
          console.log(error);
          Swal.fire({
            title:'Error al modificar el Post',
            icon: 'error',
            text:error.error,
            confirmButtonText:'ok'
          })
        }
      })
    }
    
    else{
      this.postForm.controls['nombre'].markAsTouched();
      this.postForm.controls['contenido'].markAsTouched();
      this.postForm.controls['imagen'].markAsTouched();
    }
    
  }

  imprimeErrores(){
      let resp='';

      if(this.campoEsInvalido('nombre')){
        resp+="<br>*Nombre mínimo 5 carácteres"
      }
      if(this.campoEsInvalido('contenido')){
        resp+="<br>*Descripción mínimo 140 carácteres"
      }
      if(this.campoEsInvalido('categoria')){
        resp+="<br>*Categoría inválida"
      }
      if(this.campoEsInvalido('nuevaCategoria')){
        resp+="<br>*Nueva categoría inválida"
      }
      if(this.postForm.controls['imagen'].value=='./assets/imagenes/ocupado.png'){
        resp+="<br>*Debe subir una imagen"
      }
  
     if(resp!=''){  Swal.fire({
        title:'Formulario invalido',
        html:resp,
        icon: 'error',
        confirmButtonText:'Ok'
      });
        return false;}   else{this.guardaPost(); return true;}
    
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
    this.archivoImagen=imagen;
    if(imagen){
      var reader = new FileReader();
      reader.readAsDataURL(imagen);
      reader.onload=(event:any)=>{
        this.img=event.target.result;
        this.postForm.controls['imagen'].setValue(this.img);
      }
    }
    
  }
  cierraImagen(){
    this.img='./assets/imagenes/ocupado.png';
    this.archivoImagen=null;
    this.modalService.dismissAll();
  }
  
  subeImagen(){
    if(this.archivoImagen!=null){
      Swal.fire({
        title:'Imagen guardada',
        text:'RECUERDA, la imagen no quedara guardada si no guarda el post',
        icon: 'success',
        confirmButtonText:'Ok'
      });
      this.modalService.dismissAll();
    }
    else{
      Swal.fire({
        title:'Debe Seleccionar un archivo',
        text:'Intentelo de nuevo',
        icon: 'error',
        confirmButtonText:'Ok'
      });
    }
  }
  generaIdImagen(id:number){
    let respuesta="";
    let cabeza="imagenPost_";
    let post= id+"_";
    let fecha=new Date().getMilliseconds()
    respuesta=cabeza+post+fecha;
    return respuesta;
  }
  //Si hay una imagen seleccionada, se genera un nombre y se guarda en el Back
  guardaImagen(id:number){
    let nombreImagen=this.generaIdImagen(id);
    console.log(nombreImagen)
    this.imagenService.subeImagenPost(id,this.archivoImagen,nombreImagen).subscribe({
      next:resp=>{
        this.archivoImagen=null;
        this.modalService.dismissAll();
        Swal.fire({
          title:'Imagen Subida con éxito',
          icon: 'success',
          confirmButtonText:'Ok'
        })
      },
      error:error=>{
        Swal.fire({
          title:'Error al subir la imagen',
          text:error.error,
          icon: 'error',
          confirmButtonText:'Ok'
        });
      }
    });
    
  }
  //transforma blob en imagen y la asigna
  formateaBlob(blob:Blob){
    var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload=(event:any)=>{
        let imagen:string=event.target.result
        let imagenMod=imagen.replace("data:application/octet-stream","data:image/png");
        this.postForm.controls['imagen'].setValue(imagenMod)
        this.img=imagenMod;
      }
  }
  

}
