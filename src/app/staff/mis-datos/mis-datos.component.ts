import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Profesional } from '../../interfaces/calendario.interface';
import Swal from 'sweetalert2';
import { StaffService } from '../../services/staff.service';

import { ImagenService } from '../../services/imagen.service';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.css']
})
export class MisDatosComponent implements OnInit {

  constructor(private staffService:StaffService,private router:Router, 
    private modalService:NgbModal, private imagenService:ImagenService) { }

  cerrarModal:string='';
  
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

  imagenNueva!: string;
  archivoImagen:any;

  ngOnInit(): void {
    this.cargaProfesiona();
  }

  cargaProfesiona(){
    this.staffService.getMisDatos().subscribe({
      next:resp=>{
        this.prof=resp;
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
    this.ngOnInit()
  }
  //guarda los cambios en el profesional, si los datos son correctos. Este método no guarda la imagen
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

    var regex = new RegExp('^[a-zA-ZáéíóúÁÉÍÓÚ,\\-\\s]{20,}$');
    if(!regex.test(p.descripcion)){resp+="<br>*Descripción mínimo 20 carácteres"}

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
    this.archivoImagen=imagen;
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
  cierraImagen(){
    this.imagenNueva='./assets/imagenes/ocupado.png';
    this.archivoImagen=null;
    this.modalService.dismissAll();
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
          this.router.navigateByUrl("/staff/hub/mis-datos");
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
        if(resp.size==0){this.imagenNueva="./assets/imagenes/usuario.png"}
        else{this.formateaBlob(resp);}
      },
      error:error=>{
        this.imagenNueva="./assets/imagenes/usuario.png"
        this.prof.img=this.imagenNueva;
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
