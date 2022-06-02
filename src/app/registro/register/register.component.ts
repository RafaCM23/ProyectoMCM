import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Profesional } from '../../interfaces/calendario.interface';
import Swal from 'sweetalert2';
import { RegistroService } from 'src/app/services/registro.service';
import { EmailOcupadoService } from 'src/app/services/email-ocupado.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 
  //EmailValidator Service,
  constructor( private fb: FormBuilder, private registroService:RegistroService, private emailOcupado:EmailOcupadoService) { }

  ngOnInit(): void {
    this.registroForm.reset({
      terminos:false,
      mayorEdad:false
    })
  }
  //formulario -> Faltan validadores externos
  registroForm: FormGroup = this.fb.group({
    nombre: ['',[Validators.required, Validators.minLength(3)]],                  
    apellidos: ['',[Validators.required, Validators.minLength(7),this.apellidosValido]],      
    contrasenia: ['',[Validators.required, Validators.minLength(8),this.contraValida]],      
    recontrasenia: ['',[Validators.required, Validators.minLength(8)]],    
    email: ['',[Validators.required, Validators.minLength(10),this.emailValido],[this.emailOcupado]],    
    tlfn: ['',[Validators.required, Validators.minLength(9),this.tlfnValido]],      
    especialidad: ['',[Validators.required, Validators.minLength(5)]],      
    descripcion: ['',[Validators.required, Validators.minLength(40)]],      
  }
  ,{//validadores extra
    validators:[this.contra2Valida('contrasenia','recontrasenia')],
   }
  )

   prof:Profesional={
    id:0,
    nombre:'',
    apellidos:'',
    contrasenia:'',
    email:'',
    tlfn:'',
    img:'',
    especialidad:'',
    descripcion:''
   }

   //Devuelve si el campo presenta errores
  campoEsValido(campo:string){
    return this.registroForm.controls[campo].errors && this.registroForm.controls[campo].touched;
  }

  //comprueba contraseña
  contra2Valida(psw1:string, psw2:string){
    return (formGroup: AbstractControl): ValidationErrors | null =>{
      const pass1 = formGroup.get(psw1)?.value;
      const pass2 = formGroup.get(psw2)?.value;
      if ( pass1 !== pass2  || pass2==null) {
        formGroup.get(psw2)?.setErrors({ noIguales: true });
        return { noIguales: true }
      } 



      formGroup.get(psw2)?.setErrors(null);

      return null
    }
  }

  //devuelve el tipo de error de los apellidos
  get apellidosErrorMsg(): string {
    const errors = this.registroForm.get('apellidos')?.errors!;
    if ( errors['noValido'] ) {
      return 'Mínimo dos apellidos de 3 caracteres';
    } 
    else if ( errors['required'] ) {
      return 'Apellidos obligatorios';
    }
    return '';
  }
  //comprueba si el campo apellidos es valido
  apellidosValido(control:FormControl): ValidationErrors | null{
    const apellidos = control?.value;
    var regex = new RegExp('^(([a-zA-Z]{3,})|\\s){3,7}$');
    var resultado=regex.test(apellidos);
    return resultado!=true ?  { noValido:true} : null;
  }

  //devuelve el tipo de error de los apellidos
  get contraErrorMsg(): string {
    const errors = this.registroForm.get('contrasenia')?.errors!;
    if ( errors['noValido'] ) {
      return 'La contraseña debe contener al menos 1 número';
    } 
    else {return 'Mínimo 8 caracteres'}

  }
  //comprueba si el campo contrasenia es valido
  contraValida(control:FormControl): ValidationErrors | null{
    const contra = control?.value;
    var regex = new RegExp('(?=[0-9])');
    var resultado=regex.test(contra);
    return resultado!=true ?  { noValido:true} : null;
    
  }
  //comprueba si el campo email es valido
  emailValido(control:FormControl): ValidationErrors | null{
    const correo = control?.value;
    var regex = new RegExp('^[a-zA-Z0-9_\-\_\.]{3,}@[a-zA-Z0-9_\-\_]{3,}(\\.[a-zA-Z\.]{2,12})$');
    var resultado=regex.test(correo);
    return resultado!=true ?  { noValido:true} : null;
  }
  //devuelve el tipo de error del email
  get emailErrorMsg(): string {
    const errors = this.registroForm.get('email')?.errors!;
    if(errors['emailOcupado']){
      return 'El email ya está ocupado';
    }
    else if ( errors['noValido'] ) {
      return 'El email no cumple el formato correcto. Ej: correo@dominio.es';
    } 
    else if ( errors['required'] ) {
      return 'Email es obligatorio';
    }

    return '';
  }

  tlfnValido(control:FormControl): ValidationErrors | null{
    const correo = control?.value;
    var regex = new RegExp('^(\\+[0-9]{2})?(\\s)?([0-9]{9})$');
    var resultado=regex.test(correo);
    return resultado!=true ?  { noValido:true} : null;
  }

  
    //valida el formulario
    validar(){

    if ( this.registroForm.invalid)  {
      this.registroForm.markAllAsTouched();
      Swal.fire({
        title:'Erro al registrar usuario',
        text:'Compruebe los campos',
        icon: 'error',
        confirmButtonText:'Ok'
      }
    );
      return
    }
    else{
      let p = this.prof;      let r = this.registroForm
      
      p.nombre=r.get('nombre')?.value;p.apellidos=r.get('apellidos')?.value;
      p.contrasenia=r.get('contrasenia')?.value;p.email=r.get('email')?.value;
      p.tlfn=r.get('tlfn')?.value;p.especialidad=r.get('especialidad')?.value;
      p.descripcion=r.get('descripcion')?.value;
      
      this.registroService.nuevoProfesional(p).subscribe({
        next:resp=>{
          Swal.fire({
            title:'Registro exitoso',
            text:'Falta la confirmación del administrador para que pueda acceder',
            icon: 'success',
            confirmButtonText:'Ok'
          }
        );
        },
        error:error=>{
          Swal.fire({
            title:'Error al registrar profesional',
            text:'Intentelo de nuevo más tarde',
            icon: 'error',
            confirmButtonText:'Ok'
          }
        );
        }
      })

      this.registroForm.reset();
    }
    }

    //guarda los datos del usuario 
   enviarDatos(correo:string,password:string,name:string,nickname:string){}
}


