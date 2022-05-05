import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profesional } from 'src/app/cita-previa/calendario.interface';
import Swal from 'sweetalert2';
import { StaffService } from '../staff.service';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.css']
})
export class MisDatosComponent implements OnInit {

  constructor(private staffService:StaffService,private router:Router) { }

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

  ngOnInit(): void {
    this.cargaProfesiona();
  }

  cargaProfesiona(){
    this.staffService.getMisDatos().subscribe({
      next:resp=>{
        this.prof=resp;
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
          console.log(error);
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

}
