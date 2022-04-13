import { DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { distanceAndSkiddingToXY } from '@popperjs/core/lib/modifiers/offset';
import * as moment from 'moment'
import { AgendaService } from '../agenda.service';
import { Mes,Dia, Cita } from '../calendario.interface';
@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {


  
  week: string[] = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo"
  ];

  //cambiar esto
  monthSelect: any[]=[];
  dateSelect: any;
  dateValue: any;
  fecha:any;


  enero:Mes={
    dias:[]
  };

  cerrarModal:string='';

  cita:Cita={
    persona:{
      nombre:'',
      apellidos:'',
      tlfn:'',
      email:''
    },
    comentario:'',
    fecha:new Date()
  }
  
  constructor(private agendaService: AgendaService,private modalService:NgbModal) {

  }

  

  getEnero(){
    this.agendaService.getEnero().subscribe({
      next:resp=>{
        
        this.enero=resp;
        console.log(this.enero);
        this.tachaVacaciones();
      },
      error:error=>{
        console.log(error);
      }
    })
  }

  tachaVacaciones(){
    let diasCalendario=document.getElementsByClassName("dia");
    console.log(this.enero)
    for (const dia of this.enero.dias) {
      if(dia.vacaciones=true){
        console.log(diasCalendario[parseInt(dia.dia.toString())-1])
        diasCalendario[parseInt(dia.dia.toString())-1].classList.replace("libre","vacaciones")
      }
    }
  }

  ngOnInit(): void {
    this.getDaysFromDate(1, 2022)
    this.getEnero();

  }

  getDaysFromDate(month:any, year:any) {

    const startDate = moment.utc(`${year}/${month}/01`)
    const endDate = startDate.clone().endOf('month')
    this.dateSelect = startDate;

    const diffDays = endDate.diff(startDate, 'days', true)
    const numberDays = Math.round(diffDays);

    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      const dayObject = moment(`${year}-${month}-${a}`);
      return {
        name: dayObject.format("dddd"),
        value: a,
        indexWeek: dayObject.isoWeekday()
      };
    });

    this.monthSelect = arrayDays;
  }

  changeMonth(flag:any) {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, "month");
      this.getDaysFromDate(prevDate.format("MM"), prevDate.format("YYYY"));
    } else {
      const nextDate = this.dateSelect.clone().add(1, "month");
      this.getDaysFromDate(nextDate.format("MM"), nextDate.format("YYYY"));
    }
  }

  clickDay(day:any) {
    const monthYear = this.dateSelect.format('YYYY-MM')
    const parse = `${monthYear}-${day.value}`
    const objectDate = moment(parse)
    this.dateValue = objectDate;
    this.cita.fecha=objectDate.toDate();
  }



  fechaSimple(dia:moment.Moment){
    if((dia.month()-10)<0){
      if((dia.date()-10)<0){
       
        return ('0'+dia.date()+'-0'+(dia.month()+1)+'-'+dia.year());
      }
      else   return (dia.date()+'-0'+(dia.month()+1)+'-'+dia.year());
    }
    else{
      if((dia.date()-10)<0){
        return ('0'+dia.date()+'-'+(dia.month()+1)+'-'+dia.year());
      }
      else   return (dia.date()+'-'+(dia.month()+1)+'-'+dia.year());
    }
  }

  guardarDatos(){
    console.log(this.cita);
    this.agendaService.guardarCita(this.cita).subscribe({
      next:resp=>{
        console.log(resp);
      },
      error:error=>{
        console.log(error);
      }
    })
    //this.modalService.dismissAll('Exitoso');  -- Se cierra el modal
    
  }





















  open(content: any) {
    this.modalService.open(content,
       {ariaLabelledBy: 'modal-basic-title',windowClass:'modal'}).result.then((result) => {
      this.cerrarModal = `Closed with: ${result}`;
    }, (reason) => {
      this.cerrarModal = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
