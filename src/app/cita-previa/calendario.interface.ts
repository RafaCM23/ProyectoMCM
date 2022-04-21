export interface calendario{
    anios:Anio[]
}

export interface Anio{
    meses:Mes[]
}

export interface Mes{
    dias:Dia[]
}
export interface Dia{

    citasSinConfirmar:Cita[]
    citasConfirmadas:Cita[]
    vacaciones:Boolean
    numero:number
   
}
export interface Cita{

    persona:Persona,
    motivo:string,
    fecha:Date,
    presencial:boolean,
    hora:number

}

export interface Persona{

    nombre:string,
    apellidos:string,
    tlfn:string,
    email:string

}

export interface Profesional{

    id:number,
    nombre:string,
    apellidos:string

}