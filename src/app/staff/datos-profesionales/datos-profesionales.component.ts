import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Profesional } from 'src/app/cita-previa/calendario.interface';
import Swal from 'sweetalert2';
import { ImagenService } from '../imagen.service';
import { StaffService } from '../staff.service';

@Component({
  selector: 'app-datos-profesionales',
  templateUrl: './datos-profesionales.component.html',
  styleUrls: ['./datos-profesionales.component.css']
})
export class DatosProfesionalesComponent implements OnInit {

  constructor(private staffService:StaffService,private router:Router,
    private modalService:NgbModal, private imagenService:ImagenService) { }

  prof:Profesional={
    id:0,
    nombre:'',
    apellidos:'',
    contrasenia:'',
    tlfn:'',
    email:'',
    img:'',
    especialidad:'',
    descripcion:''
  }
  indice:number=0;
  profesionales:Profesional[]=[]

  imagenNueva!: string;
  archivoImagen:any;

  cerrarModal="";
  ngOnInit(): void {
    this.cargaProfesionales(0);
  }

  cambiaProfesional(prof:any){
    this.prof=this.profesionales[prof.value]
    this.indice=prof.value;
    this.getImg();
  }
  cargaProfesionales(indice:number){
    this.staffService.getAllProfesionales().subscribe({
      next:resp=>{
        this.profesionales=resp;
        this.prof=this.profesionales[indice];
        this.getImg();
      },
      error:error=>{
        Swal.fire({
          title:'Error al cargar los datos',
          text:'Intentelo mas tarde',
          icon: 'error',
          confirmButtonText:'Ok'
        }).then(()=>{
          this.router.navigateByUrl("/staff/hub");
        })
      }
    })
  }
  restablecer(){
    this.cargaProfesionales(this.indice)
  }
  guardaDatos(){
      
    if(!this.compruebaDatos()){return }
    else{
      this.staffService.putDatos(this.prof).subscribe({
        next:resp=>{
          Swal.fire({
            title:'Datos guardados con éxito',
            icon: 'success',
            confirmButtonText:'Ok'
          });
        },
        error:error=>{
          console.log(error)
          Swal.fire({
            title:'Error al guardar',
            text:'Intentelo mas tarde',
            icon: 'error',
            confirmButtonText:'Ok'
          });
        }
      })
      
     
    }
    
  }

  compruebaDatos(){
    let resp='';
    let p=this.prof;
    var regex = new RegExp('^[a-zA-ZáéíóúÁÉÍÓÚ\\-]{5,}$');
    if(!regex.test(p.nombre)){resp+="'<br>'*Nombre al menos 5 carácteres"}

    var regex = new RegExp('^(([a-zA-ZáéíóúÁÉÍÓÚ\\-]{3,})|\\s){3,7}$');
    if(!regex.test(p.apellidos)){resp+="<br>*Apellidos al menos dos con tres letras"}

    var regex = new RegExp('^[a-zA-Z0-9_\-\_\.]{3,}@[a-zA-Z0-9_\-\_]{3,}(\\.[a-zA-Z\.]{2,12})$');
    if(!regex.test(p.email)){resp+="<br>*Email no cumple el formato EJ: correo@dominio.es"}

    var regex = new RegExp('^(\\+[0-9]{2})?(\\s)?([0-9]{9})$');
    if(!regex.test(p.tlfn)){resp+="<br>*Telefono no cumple el formato EJ: 600000000 +34 600000000"}

    var regex = new RegExp('^[a-zA-ZáéíóúÁÉÍÓÚ\\-\\s]{5,}$');
    if(!regex.test(p.especialidad)){resp+="<br>*Especialidad mínimo 5 carácteres"}

    var regex = new RegExp('^[a-zA-ZáéíóúÁÉÍÓÚ\\-\\s]{20,}$');
    if(!regex.test(p.descripcion)){}

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
    console.log(this.archivoImagen);
    const imagen=$evento.target.files[0];
    this.archivoImagen=imagen;
    console.log(this.archivoImagen);
    if(imagen){
      var reader = new FileReader();
      reader.readAsDataURL(imagen);
      reader.onload=(event:any)=>{
        this.imagenNueva=event.target.result;
      }
    }
    
  }
  generaIdImagen(){
    let respuesta="";
    let cabeza="fotoPerfil_";
    let prof= this.prof.id+"_";
    let fecha=new Date().getMilliseconds()
    respuesta=cabeza+prof+fecha;
    return respuesta;
  }
  //Si hay una imagen seleccionada, se genera un nombre y se guarda en el Back
  guardaImagen(){
    if(this.archivoImagen==null){
      Swal.fire({
        title:'Debe Seleccionar un archivo',
        text:'Intentelo de nuevo',
        icon: 'error',
        confirmButtonText:'Ok'
      });
    }
    else{
    let nombreImagen=this.generaIdImagen();
    this.imagenService.subeImagen(this.prof.id,this.archivoImagen,nombreImagen).subscribe({
      next:resp=>{
        this.archivoImagen=null;
        this.modalService.dismissAll();
        Swal.fire({
          title:'Imagen Subida con éxito',
          icon: 'success',
          confirmButtonText:'Ok'
        }).then(()=>{
          this.router.navigateByUrl("/staff/hub/datos-profesionales");
        })
      },
      error:error=>{
        Swal.fire({
          title:'Error al subir la imagen',
          text:'Intentelo de nuevo',
          icon: 'error',
          confirmButtonText:'Ok'
        });
      }
    });
    }
  }
  //recupera la imagen en formato Blob y lo pasa a otra funcion que la convierte a imagen
  getImg(){
    this.imagenService.getFoto(this.prof.id).subscribe({
      next:resp=>{
        console.log(resp);
        if(resp.size==0){this.imagenNueva="./assets/imagenes/usuario.png"}
        else{this.formateaBlob(resp);}
      },
      error:error=>{
        console.log(error);
        this.prof.img="./assets/imagenes/usuario.png"
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
        this.imagenNueva=imagenMod;

      }
  }
}
