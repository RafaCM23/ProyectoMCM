import { Component, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment'
import Swal from 'sweetalert2';
import { AgendaService } from '../agenda.service';
import { Mes, Cita, Dia } from '../calendario.interface';
@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  @Input() profActual =1;
 
  ngOnChanges(changes: SimpleChanges) {
    this.ngOnInit();
  }

  mes:string[]=[
    "Enero","Febrero","Marzo","Abril","Mayo","Junio",
    "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"

  ]
  semana: string[] = [
    "Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"
  ];

  hoy=new Date();
  mesActual:number=0;
  mesAct=this.mes[this.hoy.getMonth()];
  anio:number=this.hoy.getFullYear();


  monthSelect: any[]=[];  dateSelect: any;  dateValue: any; 
 
  enero:Mes={dias:[]}; febrero:Mes={dias:[]}; marzo:Mes={dias:[]}; abril:Mes={dias:[]};
  mayo:Mes={dias:[]}; junio:Mes={dias:[]}; julio:Mes={dias:[]}; agosto:Mes={dias:[]};
  septiembre:Mes={dias:[]}; octubre:Mes={dias:[]}; noviembre:Mes={dias:[]}; diciembre:Mes={dias:[]}
  
  meses:Mes[]= [
    this.enero,    this.febrero,    this.marzo,    this.abril,
    this.mayo,    this.junio,    this.julio,    this.agosto,
    this.septiembre,    this.octubre,    this.noviembre,    this.diciembre
  ]
  
  cerrarModal:string='';

  cita:Cita={
    persona:{
      nombre:'',
      apellidos:'',
      tlfn:'',
      email:''
    },
    motivo:'',
    fecha:new Date(),
    presencial:true,
    hora:0
  }

  
  constructor(private agendaService: AgendaService,private modalService:NgbModal, private router:Router) {}

  //Carga el mes en el que estamos
  ngOnInit(): void {
    this.getMes(this.hoy.getMonth());
    this.getDaysFromDate(this.hoy.getMonth()+1, 2022);
  }
    
  //----------------------------------- MES ----------------------------------------//

  //Obtiene el mes al cambiar de mes
  getMes(numero:number){
    let mes=this.mesActual+this.hoy.getMonth();
    this.agendaService.getMes(this.profActual,this.anio,mes).subscribe({
      next:resp=>{
        this.meses[numero]=resp;
        this.tachaOcupados(numero);        
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

  tachaOcupados(numero:number){
    let diasCalendario=document.getElementsByClassName("dia");
    for(const dia of this.monthSelect){
      if(dia.indexWeek!=2 && dia.indexWeek!=4){diasCalendario[parseInt(dia.value.toString())-1].classList.replace("libre","vacaciones")}
    }
    if (this.meses[numero]==null) return;
    for (const dia of this.meses[numero].dias) {
      if(dia.vacaciones==true ){
        diasCalendario[parseInt(dia.numero.toString())].classList.replace("libre","vacaciones")
      }
      else if(dia.citasSinConfirmar.length>0 && dia.citasSinConfirmar.length<4){
        diasCalendario[parseInt(dia.numero.toString())].classList.replace("libre","sinConfirmar")
      }
      else if(dia.citasSinConfirmar.length>3){
        diasCalendario[parseInt(dia.numero.toString())].classList.replace("libre","ocupado")
      }
    }
    
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
  //botones de < > cambiar el mes
  changeMonth(flag:any) {

    if(this.mesActual==0 && flag<0) {
      Swal.fire({
        title:'Eso no es buena idea',
        icon: 'error',
        text:'No se puede reservar citas en dias anteriores a hoy',
        confirmButtonText:'ok'
      }
    );
    }
    else if(this.mesActual==5 && flag>0){
      Swal.fire({
        title:'Eso no es buena idea',
        icon: 'error',
        text:'No se puede reservar citas a más de 5 meses',
        confirmButtonText:'ok'
      }
    );
    }
    else {
      if (flag < 0) {
        const prevDate = this.dateSelect.clone().subtract(1, "month");
        this.getDaysFromDate(prevDate.format("MM"), prevDate.format("YYYY"));
        this.getMesAnterior();
      } else {
        const nextDate = this.dateSelect.clone().add(1, "month");
        this.getDaysFromDate(nextDate.format("MM"), nextDate.format("YYYY"));
        this.getMesPosterior();
      }
    }
   }
   //cambia el mes a uno antes (si no es en el que estamos)
  getMesAnterior(){
    this.mesActual-=1;
    this.getMes(this.mesActual+this.hoy.getMonth());
    this.mesAct=this.mes[this.mesActual+this.hoy.getMonth()];
  }
  //cambia al mes siguiente ( sino es 6 meses desde hoy)
  getMesPosterior(){
    this.mesActual+=1;
    this.getMes(this.mesActual+this.hoy.getMonth());
    this.mesAct=this.mes[this.mesActual+this.hoy.getMonth()];
  }


  //----------------------------------- DIAS ----------------------------------------//

  //Recoje la fecha del dia seleccionado
  clickDay(day:any) {
    const monthYear = this.dateSelect.format('YYYY-MM')
    const parse = `${monthYear}-${day.value}`
    const objectDate = moment(parse)
    this.dateValue = objectDate;
    this.cita.fecha=objectDate.toDate();
    
  }
  tachaHoras(day:any){
    const mes = this.meses[this.mesActual+this.hoy.getMonth()]
    const dias = mes.dias.values();
    for (const dia of dias) {
      if(dia.numero==day.value){
        console.log(dia.numero+" "+day.value);
        for (const cita of dia.citasSinConfirmar) {
          console.log(cita.hora);
          document.getElementById("hora"+cita.hora)!.hidden=true;
        }
      }
    }
    
  }
  //abre el modal para realizar la cita (si no es antes de hoy)
  open(content: any) {
    if(this.cita.fecha<new Date()) {
      Swal.fire({
        title:'Algo ha ido mal',
        icon: 'error',
        text:'No se puede pedir una cita para un dia anterior al dia de hoy',
        confirmButtonText:'ok'
      }
    );
      return;
    }
    this.modalService.open(content,
        {ariaLabelledBy: 'modal-basic-title',windowClass:'modal'}).result.then((result) => {
      this.cerrarModal = `Closed with: ${result}`;
    }, (reason) => {
      this.cerrarModal = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
      //Guarda el formulario y reserva la cita
  guardarDatos(){    
    let mes=this.mesActual+this.hoy.getMonth();
    this.agendaService.guardarCita(this.profActual,this.anio,mes,this.cita).subscribe({
      next:resp=>{
        Swal.fire({
          title:'Cita pedida con éxito',
          icon: 'success',
          text:'Solo queda que el profesional confirme la cita, se le enviará un correo',
          confirmButtonText:'ok'
        }
      );
      this.reseteaFormulario();
      },
      error:error=>{
        Swal.fire({
          title:'Error al pedir la cita',
          icon: 'error',
          text:'Intentelo más tarde',
          confirmButtonText:'ok'
        }
      );
      }
    })
    this.modalService.dismissAll('Exitoso'); //se cierra el modal
    this.esperaMes();//espera 2 segundos y recarga el mes
  }

  //----------------------------------- HERRAMIENTAS ----------------------------------------//

  esperaModal(content:any) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.open(content));
      }, 100);
    });
  }
  esperaHoras(day:any) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.tachaHoras(day));
      }, 1000);
    });
  }
  
  esperaMes() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.recargarMes());
      }, 2000);
    });
  }
  recargarMes(){

    let mes=this.mesActual+this.hoy.getMonth();
    this.getMes(mes);
    this.getDaysFromDate(mes+1, 2022);
    
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
  
  //Cerrar el modal
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  //----------------------------------- FORMULARIO Y VERIFICACIONES DE CAMPOS ----------------------------------------//

  formularioValido(){
    if(this.nombreValido() && this.apellidosValido() && this.telefonoValido() && this.correoValido() && this.motivoValido() && this.horaValida()){
      this.guardarDatos()
    }else{
      Swal.fire({
        title:'El formulario presenta errores',
        icon: 'error',
        text:'Por favor, revise que todos los campos estan rellenos correctamente',
        confirmButtonText:'ok'
      }
    );
    }
  }
  reseteaFormulario(){
    this.cita={
      persona:{
        nombre:'',
        apellidos:'',
        tlfn:'',
        email:''
      },
      motivo:'',
      fecha:new Date(),
      presencial:true,
      hora:0
    }
  }
  nombreValido():boolean{
    var regex = new RegExp('^[a-zA-Z]{3,}$')
    var resultado=regex.test(this.cita.persona.nombre);
    if(resultado==true) return true;
    else return false

  
  }
  apellidosValido():boolean{
    var regex = new RegExp('^(([a-zA-Z]{3,})|\\s){3,7}$')
    var resultado=regex.test(this.cita.persona.apellidos);
    if(resultado==true ) return true;
    else return false
  }
  telefonoValido():boolean{
    var regex = new RegExp('^(\\+[0-9]{2})?(\\s{0,1})?([0-9]{9})$')
    var resultado=regex.test(this.cita.persona.tlfn);
    if(resultado==true ) return true;
    else return false
  }
  motivoValido():boolean{
    var regex = new RegExp('^[a-zA-Z\\s]{5,}$')
    var resultado=regex.test(this.cita.motivo);
    if(resultado==true ) return true;
    else return false
  }
  correoValido():boolean{
    var regex = new RegExp('^[a-zA-Z0-9_\-\_\.]{3,}@[a-zA-Z0-9_\-\_]{3,}(\\.[a-zA-Z\.]{2,12})$')
    var resultado=regex.test(this.cita.persona.email);
    if(resultado==true ) return true;
    else return false
  }
  horaValida():boolean{
    return this.cita.hora!=0 ?  true : false;
  }
}
