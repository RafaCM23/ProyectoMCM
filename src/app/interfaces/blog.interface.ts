import { Profesional } from "./calendario.interface";

export interface Categoria{
    id:number,
    nombre:string
}
export interface Post{
    id:number,
    nombre:string,
    categoria:Categoria,
    contenido:string,
    autor:Profesional,
    fecha:Date,
    comentarios?:Comentario[]
    //imagen
}

export interface Comentario{
    id:number,
    autor:string,
    contenido:string,
    fecha?:Date
}
