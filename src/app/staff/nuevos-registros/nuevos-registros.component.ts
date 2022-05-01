import { Component, OnInit } from '@angular/core';
import { Profesional } from 'src/app/cita-previa/calendario.interface';
import Swal from 'sweetalert2';
import { StaffService } from '../staff.service';

@Component({
  selector: 'app-nuevos-registros',
  templateUrl: './nuevos-registros.component.html',
  styleUrls: ['./nuevos-registros.component.css']
})
export class NuevosRegistrosComponent implements OnInit {

  constructor(private staffService:StaffService) { }

  profs:Profesional[]=[];
  
  ngOnInit(): void {
    this.getNuevosRegistros();
  }

  getNuevosRegistros(){
    this.staffService.getNuevosProfesionales().subscribe({
      next:resp=>{
        this.profs=resp;
      },
      error:error=>{
        console.log(error)
      }
    })
  }

  acepta(event:any) {
    let id= event.target.id;
    console.log(id);
    this.staffService.aceptaRegistro(id).subscribe({
      next:resp=>{
        Swal.fire({
          title:'Profesional aceptado con éxito',
          text:'Ya puede hacer Login',
          icon: 'success',
          confirmButtonText:'Ok'
        }
      );
      },
      error:error=>{
        Swal.fire({
          title:'Error al aceptar el profesional',
          text:'Recargue la página e intentelo de nuevo',
          icon: 'error',
          confirmButtonText:'Ok'
        }
      );
      }
    })
  }
  rechaza(event:any) {
    let id= event.target.id;
    console.log(id);
    this.staffService.rechazaRegistro(id).subscribe({
      next:resp=>{
        Swal.fire({
          title:'Profesional rechazado',
          text:'Su perfil ha sido borrado',
          icon: 'success',
          confirmButtonText:'Ok'
        }
      );
      },
      error:error=>{
        Swal.fire({
          title:'Error al rechazar el profesional',
          text:'Recargue la página e intentelo de nuevo',
          icon: 'error',
          confirmButtonText:'Ok'
        }
      );
      }
    })
  }
}
