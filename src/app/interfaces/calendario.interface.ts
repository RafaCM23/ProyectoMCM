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

    citasSinConfirmar:Cita[],
    citasConfirmadas:Cita[],
    vacaciones:Boolean,
    ocupado:Boolean,
    numero:number,
   
}
export interface Cita{
    id?:number,
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
    apellidos:string,
    contrasenia?:string,
    email:string,
    tlfn:string,
    img:string,
    especialidad:string,
    descripcion:string

}