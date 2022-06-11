import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import Swal from 'sweetalert2';
import { ImagenService } from '../../services/imagen.service';
import { StaffService } from '../../services/staff.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css']
})
export class HubComponent implements OnInit {

  constructor(private router:Router,private staffService:StaffService,
     private authService:AuthService,private imagenService:ImagenService
     ,private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.isAdmin();
    this.whoIs();
    
  }

  idProf=1;
  esAdmin=false;
  img="";

  navigateTo(valor:any) {
    
    if (valor) {
      this.router.navigate([`/staff/hub/`+valor.value]);
    }
    return false;
  }
   whoIs(){
    this.staffService.whoIs().subscribe({
      next:resp=>{
        this.idProf=resp
        this.getImg(); }
    })
  
  }

  cerrarSesion(){
    this.authService.delToken();
    this.router.navigateByUrl("/admin/login")
  }

  getImg(){
    this.imagenService.getFoto(this.idProf).subscribe({
      next:resp=>{
        if(resp.size==0){this.img="./assets/imagenes/usuario.png"}
        else{this.formateaBlob(resp);}
        
      },
      error:error=>{
        //Si no tiene imagen se pone una por defecto
        this.img="./assets/imagenes/usuario.png"
      }
    })

  }

    formateaBlob(blob:Blob){
    var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload=(event:any)=>{
        let imagen:string=event.target.result
        let imagenMod=imagen.replace("data:application/octet-stream","data:image/png");
        this.img= imagenMod;
      }
  }
  
  isAdmin(){
    this.staffService.isAdmin().subscribe({
      next:resp=>{
        this.esAdmin=resp;
      },
      error:error=>{
        Swal.fire({
          title:'Error al comprobar su rol',
          text:'Intentelo de nuevo más tarde',
          icon: 'error',
          confirmButtonText:'Ok'
        }
      ).then(()=>{
        this.router.navigateByUrl("/");
      })
      }
    })

  }

}
