import { Component, OnInit } from '@angular/core';
import { Profesional } from '../calendario.interface';

@Component({
  selector: 'app-agendas',
  templateUrl: './agendas.component.html',
  styleUrls: ['./agendas.component.css']
})
export class AgendasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  idprof=0

  profesionales:Profesional[]=[];

  numeros:number[]=[1,2,3];
  cambiaProfesional(cambio:number){
    if(cambio>0 ){
      if(this.profesionales.length+1<this.idprof){
        this.idprof=0;
      }else{ this.idprof+=1;}
    }
    else{
      if(this.idprof==0){
        this.idprof=this.numeros.length-1;
      }else{
        this.idprof-=1;
      }
    }
  
     let resp = this.numeros[this.idprof];
    console.log(resp);
    console.log(this.numeros.length+" lenth")
    
  }

}
