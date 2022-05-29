import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgendaService } from 'src/app/services/agenda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cancelar-cita',
  templateUrl: './cancelar-cita.component.html',
  styleUrls: ['./cancelar-cita.component.css']
})
export class CancelarCitaComponent implements OnInit {

  constructor(private agendaService:AgendaService, private router:Router) { }

  ngOnInit(): void {
    this.getId();
  }

  getId(){
    const queryString = window.location.search;
    const id = new URLSearchParams(queryString).get("id");
    if(id!=null){
      this.cancelaCita(Number.parseInt(id));
    }

  }
  
  cancelaCita(hash:number){
    Swal.fire({
      title: "Borrar cita",
      text: "¿Está seguro que desea cancelar su cita?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
  })
  .then(resultado => {
    if(resultado.isConfirmed){
      this.agendaService.cancelaCita(hash).subscribe({
        next:resp=>{
          Swal.fire({
            title: "Cita Cancelada con éxito",
            text: "¿Está seguro que desea eliminar este post?",
            icon: 'success',
            confirmButtonText: "Ok",
        }).then(()=>{
          this.router.navigateByUrl("/");
        })},
        error:error=>{
          Swal.fire({
            title: "Error al cancelar la cita",
            text: "Puede que esa cita ya no exista, compruebe sus correos",
            icon: 'error',
            confirmButtonText: "Ok",
        }).then(()=>{
          this.router.navigateByUrl("/");
        })
        }
      })
    }else{
      Swal.fire({
        title: "La cita NO ha sido cancelada",
        text: "Si desea cancelarla recarge la página o vuelva a acceder desde el boton de su correo",
        icon: 'success',
        confirmButtonText: "Ok",
    }).then(()=>{
      this.router.navigateByUrl("/");
    })
    }
    
  })
}


}
