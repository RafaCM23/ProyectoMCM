import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImagenService } from 'src/app/staff/imagen.service';
import Swal from 'sweetalert2';
import { AgendaService } from '../agenda.service';
import { Profesional } from '../calendario.interface';

@Component({
  selector: 'app-agendas',
  templateUrl: './agendas.component.html',
  styleUrls: ['./agendas.component.css']
})
export class AgendasComponent implements OnInit {

  constructor(private agendaService:AgendaService, private router: Router, private imagenService:ImagenService) { }

  ngOnInit(): void {
    this.getProfesionales();
    this.getImagenProf();
  }

  imgProfActual='';
  idprof=0

  profesionales:Profesional[]=[];

  cambiaProfesional(cambio:number){
    if(cambio>0 ){
      if(this.idprof==this.profesionales.length-1){this.idprof=0}
      else{ this.idprof+=1;}
    }
    else{
      if(this.idprof==0){this.idprof=this.profesionales.length-1}
      else{ this.idprof-=1;}
    }
    this.getImagenProf();
    
  }
   //recupera la imagen en formato Blob y lo pasa a otra funcion que la convierte a imagen
   getImagenProf(){
    this.imagenService.getFoto(this.profesionales[this.idprof].id).subscribe({
      next:resp=>{
        console.log(resp);
        if(resp.size==0){this.imgProfActual="./assets/imagenes/usuario.png"}
        else{this.formateaBlob(resp);}
      },
      error:error=>{
        this.imgProfActual="./assets/imagenes/usuario.png"
      }
    })

  }
  //transforma blob en imagen y la asigna
  formateaBlob(blob:Blob){
    console.log(this.imgProfActual)
    var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload=(event:any)=>{
        let imagen:string=event.target.result
        console.log(imagen)
        let imagenMod=imagen.replace("data:application/octet-stream","data:image/png");
        this.imgProfActual=imagenMod;
        console.log(this.imgProfActual)
      }

  }

  profesionalActual():Profesional{
    return this.profesionales[this.idprof];
  }

  getProfesionales(){
    this.agendaService.getProfesionales().subscribe({
      next:resp=>{
        this.profesionales=resp;
      },
      error:error=>{
       this.errorAlCargar();
      }
    })
  }

  errorAlCargar(){
    Swal.fire({
      title:'Ooops',
      icon: 'error',
      text:'Parece que este apartado no esta funcionando correctamente, intentelo más tarde',
      confirmButtonText:'ok'
    }
  ).then(()=>{
      this.router.navigateByUrl("/");})
  }

}
