import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Profesional } from '../../interfaces/calendario.interface';
import Swal from 'sweetalert2';
import { RegistroService } from '../registro.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private registroService: RegistroService, private router:Router,private authService:AuthService) { }

  ngOnInit(): void {
  }

  loginForm: FormGroup = this.fb.group({
    email: ['',[Validators.required, Validators.minLength(10)]],  
    contrasenia: ['',[Validators.required, Validators.minLength(8)]]
  })

  campoEsValido(campo:string){
    return this.loginForm.controls[campo].errors && this.loginForm.controls[campo].touched;
  }

  enviar(){
    if ( this.loginForm.invalid)  {
      this.loginForm.markAllAsTouched();
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
    
      let prof:Profesional={
        id:0,        nombre:'',        apellidos:'',        contrasenia:this.loginForm.get("contrasenia")?.value,
        email:this.loginForm.get("email")?.value,        tlfn:'',        img:'',        especialidad:'',        descripcion:''
       }
      this.registroService.loginProfesional(prof).subscribe({
        next:resp=>{
          const respuesta=JSON.stringify(resp["jwt-token"]);
          this.authService.setToken(respuesta.slice(1,respuesta.length-1));
          this.router.navigateByUrl("/staff/hub")
        },
        error:error=>{
          Swal.fire({
            title:'Crecenciales Invalidas',
            text:error.error,
            icon: 'error',
            confirmButtonText:'Ok'
          }
        );
        }
      })
    }
  }
}
