import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';
import { StaffService } from '../staff.service';
@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css']
})
export class HubComponent implements OnInit {

  constructor(private router:Router,private staffService:StaffService, private authService:AuthService) { }

  ngOnInit(): void {
    this.isAdmin();
    this.getImg();
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
   redirigeAgenda(){
    this.router.navigateByUrl(`/staff/hub/mi-agenda?id=${this.idProf}`)
  }
   whoIs(){
    this.staffService.whoIs().subscribe({
      next:resp=>{this.idProf=resp }
    })
  
  }

  cerrarSesion(){
    this.authService.delToken();
    this.router.navigateByUrl("/admin/login")
  }
  getImg(){
    this.staffService.miFoto().subscribe({
      next:resp=>{
        this.img=resp;
      },
      error:error=>{
        //Si no tiene imagen se pone una por defecto
        this.img="./assets/imagenes/usuario.png"
      }
    })

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
