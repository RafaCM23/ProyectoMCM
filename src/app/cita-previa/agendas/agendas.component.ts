import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AgendaService } from '../agenda.service';
import { Profesional } from '../calendario.interface';

@Component({
  selector: 'app-agendas',
  templateUrl: './agendas.component.html',
  styleUrls: ['./agendas.component.css']
})
export class AgendasComponent implements OnInit {

  constructor(private agendaService:AgendaService, private router: Router) { }

  ngOnInit(): void {
    this.getProfesionales();
  }

  idprof=0

  profesionales:Profesional[]=[];

  cambiaProfesional(cambio:number){
    if(cambio>0 ){console.log(this.idprof +" "+(this.profesionales.length-1))
      if(this.idprof==this.profesionales.length-1){this.idprof=0}
      else{ this.idprof+=1;}
    }
    else{console.log(this.idprof +" "+(this.profesionales.length-1))
      if(this.idprof==0){this.idprof=this.profesionales.length-1}
      else{ this.idprof-=1;}
    }
     let resp = this.profesionales[this.idprof];
    
  }
  profesionalActual():Profesional{
    return this.profesionales[this.idprof];
  }

  getProfesionales(){
    this.agendaService.getProfesionales().subscribe({
      next:resp=>{
        this.profesionales=resp;
        console.log(resp);
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
