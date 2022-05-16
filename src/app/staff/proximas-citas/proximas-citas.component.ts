import { Component, OnInit } from '@angular/core';
import { Cita } from 'src/app/interfaces/calendario.interface';
import { AgendaService } from 'src/app/services/agenda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proximas-citas',
  templateUrl: './proximas-citas.component.html',
  styleUrls: ['./proximas-citas.component.css']
})
export class ProximasCitasComponent implements OnInit {

  constructor(private agendaService:AgendaService) { }

  ngOnInit(): void {
    this.recuperaCitasSinVerificar();
  }

  aprobadas=0;

  citas:Cita[]=[];

  cargaCitas(){
    if(this.aprobadas==0){
      this.citas=[];
      this.recuperaCitasSinVerificar();
    }
    else{
      this.citas=[];
      this.recuperaCitasVerificadas();
    }
  }

  recuperaCitasSinVerificar(){
    this.agendaService.getProximasCitas(false).subscribe({
      next:resp=>{
        console.log(resp);
        this.citas=resp;
      },
      error:error=>{
        console.log(error);
      }
    })
  }

  recuperaCitasVerificadas(){
    this.agendaService.getProximasCitas(true).subscribe({
      next:resp=>{
        console.log(resp);
        this.citas=resp;
       
      },
      error:error=>{
        console.log(error);
        
      }
    })
  }

  aceptaCita($event:any){
    const id = $event.id;
    this.agendaService.aceptaCita(id).subscribe({
      next:resp=>{
        Swal.fire({
          title:'Cita aceptada con éxito',
          text:'Revise la ventana de citas aceptadas',
          icon: 'success',
          confirmButtonText:'Ok'
        }).then(()=>{
         this.esperaSinConfirmar();
        });
      },
      error:error=>{
        console.log(error);
        Swal.fire({
          title:'Error al confirmar la cita',
          text:'Intentelo de nuevo más tarde',
          icon: 'error',
          confirmButtonText:'Ok'
        });
      }
    });
  }
  rechazaCita($event:any){
    const id = $event.id;
    this.agendaService.rechazaCita(id).subscribe({
      next:resp=>{
        Swal.fire({
          title:'Cita rechazada con éxito',
          text:'Revise la ventana de citas aceptadas',
          icon: 'success',
          confirmButtonText:'Ok'
        }).then(()=>{
          
          if(this.aprobadas==0){
            this.esperaSinConfirmar();
            }
          else{
            this.esperaConfirmadas();
          }
        });
      },
      error:error=>{
        Swal.fire({
          title:'Error al rechazar la cita',
          text:'Intentelo de nuevo más tarde',
          icon: 'error',
          confirmButtonText:'Ok'
        });
      }
    });
  }
  fechaSimple(fecha:Date){
    return fecha.toString().substr(0,10)
  }

  esperaConfirmadas() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.recuperaCitasVerificadas());
      }, 300);
    });
  }

  esperaSinConfirmar() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.recuperaCitasSinVerificar());
      }, 300);
    });
  }
}
