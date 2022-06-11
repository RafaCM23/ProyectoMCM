import { Component, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment'
import { AuthService } from '../../auth/auth.service';
import { StaffService } from 'src/app/services/staff.service';
import Swal from 'sweetalert2';
import { AgendaService } from '../../services/agenda.service';
import { Mes, Cita, Profesional} from '../../interfaces/calendario.interface';
import { onErrorResumeNext } from 'rxjs/operators';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  @Input() profActual =1;
  hub=false;

  ngOnChanges(changes: SimpleChanges) {
    this.ngOnInit();
  }
  //todos los nombres de meses y semanas
  mes:string[]=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
  semana: string[] = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"];

  hoy=new Date(); mesActual:number=0;  mesAct=this.mes[this.hoy.getMonth()];  anio:number=this.hoy.getFullYear();  diaSeleccionado=0;
  
  //Selecciones por el usuario
  monthSelect: any[]=[];  dateSelect: any;  dateValue: any; 
  
  //Inicializacion de todos los meses
  enero:Mes={dias:[]}; febrero:Mes={dias:[]}; marzo:Mes={dias:[]}; abril:Mes={dias:[]};
  mayo:Mes={dias:[]}; junio:Mes={dias:[]}; julio:Mes={dias:[]}; agosto:Mes={dias:[]};
  septiembre:Mes={dias:[]}; octubre:Mes={dias:[]}; noviembre:Mes={dias:[]}; diciembre:Mes={dias:[]}

  //Meses agrupados
  meses:Mes[]= [
    this.enero,    this.febrero,    this.marzo,    this.abril,    this.mayo,    this.junio,    this.julio,
    this.agosto,   this.septiembre,    this.octubre,    this.noviembre,    this.diciembre
  ]
  
  cerrarModal:string='';

  cita:Cita={
    persona:{      nombre:'',      apellidos:'',      tlfn:'',      email:''    },
    motivo:'',
    fecha:new Date(),
    presencial:true,
    hora:0
  }

  profesionales:Profesional[]=[];

  admin=false;
  
  constructor(private authService:AuthService, private staffService:StaffService,private agendaService: AgendaService,
    private modalService:NgbModal, private router:Router, private rutaActiva:ActivatedRoute) {}

  //Carga el mes en el que estamos
  ngOnInit(): void {
    this.mesActual=0;
    this.mesAct=this.mes[this.hoy.getMonth()];
    this.getMes(this.hoy.getMonth());
    this.getDaysFromDate(this.hoy.getMonth()+1, 2022);
    this.isAdmin();
  }
    
  //----------------------------------- MES ----------------------------------------//
  //Comprueba si se llama desde la seccion de staff, en ese caso se recupera la agenda de ese profesional 
   compruebaProf(id:number){
    let url=this.router.url.toString();
    if(url.startsWith('/staff/hub/mi-agenda')){
      this.hub=true
      this.profActual=id;
      this.getMes(this.hoy.getMonth());
      this.getDaysFromDate(this.hoy.getMonth()+1, 2022);
      this.tachaOcupados(this.hoy.getMonth());
    }
    else{this.hub=false;}
    
  }
  
  //Obtiene el mes al cambiar de mes
    getMes(numero:number){
    let mes=this.mesActual+this.hoy.getMonth();
    this.agendaService.getMes(this.profActual,this.anio,mes).subscribe({
      next:resp=>{
        this.meses[numero]=resp;
        this.tachaOcupados(numero);   
      },
      error:error=>{
        Swal.fire({
          title:'Ooops',
          icon: 'error',
          text:'Parece que este apartado no esta funcionando correctamente, intentelo más tarde',
          confirmButtonText:'ok'
        }
      ).then(()=>{
          this.router.navigateByUrl("/");})     
      }
    })
  }
  //Pinta los dias según el codigo de color: [verde:libre,amarillo:semi-libre,rojo:ocupado,gris:vacaciones]
  tachaOcupados(numero:number){
    let diasCalendario=document.getElementsByClassName("dia");
    for(const dia of this.monthSelect){
      if(dia.indexWeek!=2 && dia.indexWeek!=4){diasCalendario[parseInt(dia.value.toString())-1].classList.replace("libre","vacaciones")}
    }
    if (this.meses[numero]==null) return;
    for (const dia of this.meses[numero].dias) {
      let citasTotales=dia.citasSinConfirmar.length + dia.citasConfirmadas.length
      if(dia.vacaciones==true ){
        diasCalendario[dia.numero].classList.replace("libre","vacaciones");
      }
      else if( citasTotales>0 &&  citasTotales<4){
        diasCalendario[dia.numero].classList.replace("libre","sinConfirmar")
      }
      else if( citasTotales>3 || dia.ocupado==true){
        diasCalendario[dia.numero].classList.replace("libre","ocupado")
      }
    }
    
  }
  //Pinta los numeros de los dias en el calendario, y le asgina su posición en la semana
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
        this.cambiaMes(-1);
      } else {
        const nextDate = this.dateSelect.clone().add(1, "month");
        this.getDaysFromDate(nextDate.format("MM"), nextDate.format("YYYY"));
        this.cambiaMes(1);
      }
    }
   }
   //cambia mes hacia delante o atras segun el valor
   cambiaMes(numero:number){
    if(numero<0){this.mesActual-=1;}     else{this.mesActual+=1;}
    this.getMes(this.mesActual+this.hoy.getMonth());
    let mesNum=this.mesActual+this.hoy.getMonth();
    if(mesNum>11)(mesNum-=12)
    this.mesAct=this.mes[mesNum];
   }
  


  //----------------------------------- DIAS ----------------------------------------//

  //Recoje la fecha del dia seleccionado
  clickDay(day:any) {
    const monthYear = this.dateSelect.format('YYYY-MM')
    const parse = `${monthYear}-${day.value}`
    this.diaSeleccionado=day.value;
    const objectDate = moment(parse)
    this.dateValue = objectDate;
    this.cita.fecha=objectDate.toDate();
  }

  //Elimina las horas ocupadas del dia seleccionado
  tachaHoras(day:any){
    
    const mes = this.meses[this.mesActual+this.hoy.getMonth()]
    const dias = mes.dias.values();
    for (const dia of dias) {
      if((dia.numero+1)==day.value){
        for (const cita of dia.citasSinConfirmar) {
          let hora=document.getElementById("hora"+cita.hora)!
          hora.hidden=true;
        }
        for (const cita of dia.citasConfirmadas) {
          let hora=document.getElementById("hora"+cita.hora)!
          hora.hidden=true;
        }
      }
    }
    
  }
  //Abre el modal para realizar la cita (si no es antes de hoy)
  open(content: any) {
    if(this.cita.fecha<new Date()) {
      Swal.fire({
        title:'Algo ha ido mal',
        icon: 'error',
        text:'No se puede pedir una cita para un dia anterior a mañana',
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
  
  //formatea la fecha para poner en la cabecera del modal
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
  //comprueba si el formulario del modal es válido
  formularioValido(){
    const errores=this.sacaErrores();
    if(errores==null){
      this.guardarDatos()
    }else{
      Swal.fire({
        title:'El formulario presenta errores',
        icon: 'error',
        html:errores,
        confirmButtonText:'ok'
      }
    );
    }
  }
  //Si hay errores en el formulario se indican cuales en el modal
  sacaErrores(){
    let resp="*Errores*<br>";
    if(!this.nombreValido()){
      resp+="<br>- Nombre";
    }
    if(!this.apellidosValido()){
      resp+="<br>- Apellidos";
    }
    if(!this.telefonoValido()){
      resp+="<br>- Telefono";
    }
    if(!this.correoValido()){
      resp+="<br>- Correo";
    }
    if(!this.motivoValido()){
      resp+="<br>- Motivo";
    }
    if(!this.horaValida()){
      resp+="<br>- Falta Hora";
    }
    return  resp.length<=14 ? null : resp;
  }

  //Deja el formulario vacio
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
    var regex = new RegExp('^(\\+[0-9]{2})?(\\s{0,1})?([6][0-9]{8})$')
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
  
//----------------------------------- ADMIN Y PROFESIONALES ----------------------------------------//

  //Cambio de profesional desde la vista de admin
  cambiaProfesional(prof:any){
    this.profActual=this.profesionales[prof.value].id;
    this.recargarMes();
  }

  //Funcion que marca el dia como ocupado
  diaOcupado(){
    const mes=(this.mesActual+this.hoy.getMonth())
    const dia=this.diaSeleccionado-1;
    this.agendaService.ocupaDia(this.profActual,this.anio,mes,dia).subscribe({
      next:resp=>{
        Swal.fire({
          title:'Operación realizada con éxito',
          icon: 'success',
          confirmButtonText:'Ok'
        }).then(()=>{
          this.recargarMes();
          this.modalService.dismissAll();
        })
      },
      error:error=>{
        Swal.fire({
          title:'Error en la operación',
          text:'Intentelo mas tarde',
          icon: 'error',
          confirmButtonText:'Ok'
        })
      }
    })
  }
  //Funcion que marca el dia como vacaciones
  diaVacaciones(){
    const mes=(this.mesActual+this.hoy.getMonth())
    const dia=this.diaSeleccionado-1;
    this.agendaService.vacacionesDia(this.profActual,this.anio,mes,dia).subscribe({
      next:resp=>{
        Swal.fire({
          title:'Operación realizada con éxito',
          icon: 'success',
          confirmButtonText:'Ok'
        }).then(()=>{
          this.recargarMes();
          this.modalService.dismissAll();
        })
      },
      error:error=>{
        Swal.fire({
          title:'Error en la operación',
          text:'Intentelo mas tarde',
          icon: 'error',
          confirmButtonText:'Ok'
        })
      }
    })
  }
  //Funcion que pregunta el id del profesional actual
  async whoIs(){
    this.authService.whoIs().subscribe({
      next:resp=>{
        this.compruebaProf(resp);
      },error:error=>{
      }
    })
  }

  //Funcion que pregunta si el profesional actual es admin
  isAdmin(){
    this.staffService.isAdmin().subscribe({
      next:resp=>{
        if(resp==false){this.whoIs();}
        else{
          this.admin=true;
          this.getProfesionales();
        }
       
      },
      error:error=>{
        
      }
    })
  }

  //Funcion que recupera todos los profesionales para la vista de admin
  getProfesionales(){
    this.staffService.getProfesionalesVerificados().subscribe({
      next:resp=>{
        this.profesionales=resp;
      },
      error:error=>{
        Swal.fire({
          title:'Error al cargar los datos',
          text:'Intentelo mas tarde',
          icon: 'error',
          confirmButtonText:'Ok'
        }).then(()=>{
          this.router.navigateByUrl("/staff/hub");
        })
      }
    })
  }
}