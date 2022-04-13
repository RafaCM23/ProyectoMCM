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
    dia:number
   
}
export interface Cita{

    persona:Persona,
    comentario:String,
    fecha:Date
    //Persona contacto (Nombre, Apellidos, texto sobre consulta, tlfn, email
}

export interface Persona{
    nombre:String,
    apellidos:String,
    tlfn:String,
    email:String
}