"use strict";(self.webpackChunkFront_PI=self.webpackChunkFront_PI||[]).push([[314],{8314:(U,d,c)=>{c.r(d),c.d(d,{BlogModule:()=>A});var l=c(9808),f=c(5226),m=c.n(f),t=c(1223),p=c(4144),g=c(1810);function h(n,i){if(1&n){const o=t.EpF();t.TgZ(0,"div",23)(1,"div",24)(2,"div",25)(3,"div",26)(4,"h4",27),t._uU(5),t.qZA()(),t.TgZ(6,"div",28)(7,"small",29),t._UZ(8,"i",30),t._uU(9),t.qZA()(),t.TgZ(10,"div",31)(11,"p",32),t._uU(12),t.qZA(),t.TgZ(13,"a",33),t.NdJ("click",function(){const s=t.CHM(o).$implicit;return t.oxw().redirige(s.id)}),t._uU(14,"Leer M\xe1s"),t.qZA()()(),t.TgZ(15,"div",34)(16,"div",35),t._uU(17),t.qZA(),t.TgZ(18,"div",36),t._UZ(19,"i",37),t._uU(20," 12 "),t.qZA()()()()}if(2&n){const o=i.$implicit,e=t.oxw();t.xp6(5),t.Oqu(o.nombre),t.xp6(4),t.AsE(" ",o.autor.nombre," ",o.autor.apellidos," "),t.xp6(3),t.Oqu(o.contenido),t.xp6(5),t.hij("",e.fechaSimple(o.fecha)," ")}}let x=(()=>{class n{constructor(o,e){this.blogService=o,this.router=e,this.botonflotante=!1,this.cuantos=0,this.todos=[]}ngOnInit(){this.getNextPost()}getNextPost(){this.blogService.loadNextPosts(this.cuantos).subscribe({next:o=>{for(const e of o)this.todos.push(e);this.cuantos+=8},error:o=>{m().fire({title:"Error al cargar m\xe1s entradas",text:"Puede que no haya m\xe1s",icon:"error",confirmButtonText:"Ok"})}})}redirige(o){this.router.navigateByUrl(`/blog/post?id=${o}`)}fechaSimple(o){return o.toString().substr(0,10)}onScroll(o){this.botonflotante=o.path[1].scrollY>350}}return n.\u0275fac=function(o){return new(o||n)(t.Y36(p.Z),t.Y36(g.F0))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-principal"]],hostBindings:function(o,e){1&o&&t.NdJ("scroll",function(s){return e.onScroll(s)},!1,t.Jf7)},decls:26,vars:2,consts:[[1,"row"],["href","blog#portada",1,"btn-flotante",3,"ngClass"],[1,"fa","fa-arrow-up"],["id","portada",1,"portada","col-12"],["src","./assets/imagenes/fondoBlog.jpg","alt","",1,"imagen"],[1,"col-12","row","contenido",2,"background-color","rgba(255, 128, 128, 0.322)"],[1,"busqueda","col-12"],[1,"input-group","buscador"],[1,"form-outline"],["type","search","id","form1","placeholder","Buscar",1,"form-control"],["type","button",1,"btn","btn-primary"],[1,"fas","fa-search"],[1,"filtros",2,"background-color","rgba(181, 219, 255, 0.5)"],[1,"posts","col-12"],[1,"container","posts","row"],["class","col-12 col-md-6",4,"ngFor","ngForOf"],[1,"col-12","cargaMas"],[3,"click"],[1,"mt-0"],[1,"col-12","footer-div"],[1,"text-center","footer",2,"background-color","#000000"],[1,"p-3"],[1,"text-white"],[1,"col-12","col-md-6"],[1,"card"],[1,"card-body","row"],[1,"col-8"],[1,"card-title"],[1,"col-4"],[1,"text-muted","cat"],[1,"fas","fa-user","text-info"],[1,"col-12"],[1,"card-text"],[1,"botonPost",3,"click"],[1,"card-footer","text-muted","d-flex","justify-content-between","bg-transparent","border-top-0"],[1,"fecha"],[1,"stats"],[1,"far","fa-comment"]],template:function(o,e){1&o&&(t.TgZ(0,"div",0)(1,"a",1),t._UZ(2,"i",2),t.qZA(),t.TgZ(3,"div",3),t._UZ(4,"img",4),t.qZA(),t.TgZ(5,"div",5)(6,"div",6)(7,"div",7)(8,"div",8),t._UZ(9,"input",9),t.qZA(),t.TgZ(10,"button",10),t._UZ(11,"i",11),t.qZA(),t.TgZ(12,"div",12),t._uU(13," Filtros "),t.qZA()()(),t.TgZ(14,"div",13)(15,"div",14),t.YNc(16,h,21,5,"div",15),t.qZA()(),t.TgZ(17,"div",16)(18,"a",17),t.NdJ("click",function(){return e.getNextPost()}),t._uU(19,"CARGAR M\xc1S"),t.qZA(),t._UZ(20,"hr",18),t.qZA()(),t.TgZ(21,"div",19)(22,"footer",20)(23,"div",21)(24,"p",22),t._uU(25,"\xa9 2022 Copyright: RCM"),t.qZA()()()()()),2&o&&(t.xp6(1),t.Q6J("ngClass",!0===e.botonflotante?"aparece":"desaparece"),t.xp6(15),t.Q6J("ngForOf",e.todos))},directives:[l.mk,l.sg],styles:["@media (max-width:580px){.buscador[_ngcontent-%COMP%]{justify-content:center!important}}.cargaMas[_ngcontent-%COMP%]{margin-top:1em;width:60%;margin-left:20%;color:#37999c;font-weight:700}.cargaMas[_ngcontent-%COMP%]   hr[_ngcontent-%COMP%]{height:3px}.cargaMas[_ngcontent-%COMP%]:hover{color:#376f9c;cursor:pointer}h1[_ngcontent-%COMP%]{margin-top:5em;margin-left:5em}.btn1[_ngcontent-%COMP%]{margin-top:3em;margin-left:10em;font-size:2em;cursor:pointer}.btn-flotante[_ngcontent-%COMP%]{font-size:20px;font-weight:700;color:#fff;border-radius:20px;background-color:#e91e63;padding:10px 15px;position:fixed;bottom:40px;right:30px;width:16px;transition:all .3s ease 0ms;box-shadow:0 8px 15px #0000001a;z-index:99;box-sizing:unset;opacity:0}.btn-flotante[_ngcontent-%COMP%]:hover{background-color:#2c2fa5;box-shadow:0 15px 20px #00000080;transform:translateY(-6px)}.desaparece[_ngcontent-%COMP%]{animation:scale-out .2s cubic-bezier(.55,.085,.68,.53) both;opacity:0;pointer-events:none}.aparece[_ngcontent-%COMP%]{opacity:1;animation:scale-in .2s cubic-bezier(.55,.085,.68,.53) both}.portada[_ngcontent-%COMP%]{height:80%}.contenido[_ngcontent-%COMP%]{text-align:center;padding:0}.imagen[_ngcontent-%COMP%]{width:100%;height:100%}.buscador[_ngcontent-%COMP%]{margin-top:2em;justify-content:center}.card[_ngcontent-%COMP%]{margin-top:1em;border-radius:3%}.carta[_ngcontent-%COMP%]{max-width:600px}.card-title[_ngcontent-%COMP%]{float:left}.posts[_ngcontent-%COMP%]{margin-top:2em;margin-left:auto;margin-right:auto;text-align:center}.card-text[_ngcontent-%COMP%]{text-align:left;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:5;line-clamp:5;-webkit-box-orient:vertical}.botonPost[_ngcontent-%COMP%]{cursor:pointer;font:16px Arial;display:inline-block;padding:1em 2em;text-align:center;color:#fff;background:red;background:linear-gradient(to left,salmon 50%,lightblue 50%) right;background-size:200%;transition:.5s ease-out}.botonPost[_ngcontent-%COMP%], a[_ngcontent-%COMP%]{text-decoration:none}.botonPost[_ngcontent-%COMP%]:hover{background-position:left}"]}),n})();var r=c(2382),_=c(5652);function b(n,i){if(1&n&&(t.TgZ(0,"div",19),t._UZ(1,"img",20),t.qZA()),2&n){const o=t.oxw();t.xp6(1),t.s9C("src",o.imagen,t.LSH)}}function v(n,i){if(1&n){const o=t.EpF();t.TgZ(0,"button",21),t.NdJ("click",function(){return t.CHM(o),t.oxw().nuevoComentario=!0}),t._uU(1,"Realizar Comentario"),t.qZA()}}function C(n,i){1&n&&(t.TgZ(0,"span",28),t._uU(1," * Nombre m\xednimo 5 caracteres * "),t.qZA())}function P(n,i){1&n&&(t.TgZ(0,"span",28),t._uU(1," * El comentario debe tener entre 5 y 100 caracteres* "),t.qZA())}function Z(n,i){if(1&n){const o=t.EpF();t.TgZ(0,"div",22)(1,"form",23)(2,"div",24),t._UZ(3,"input",25),t.qZA(),t.YNc(4,C,2,0,"span",26),t.TgZ(5,"div",24),t._UZ(6,"textarea",27),t.qZA(),t.YNc(7,P,2,0,"span",26),t.TgZ(8,"div",24)(9,"button",21),t.NdJ("click",function(){return t.CHM(o),t.oxw().enviarComentario()}),t._uU(10,"Guardar"),t.qZA()()()()}if(2&n){const o=t.oxw();t.xp6(1),t.Q6J("formGroup",o.comentarioForm),t.xp6(3),t.Q6J("ngIf",o.campoEsValido("nombre")),t.xp6(3),t.Q6J("ngIf",o.campoEsValido("contenido"))}}function M(n,i){if(1&n&&(t.TgZ(0,"div",33),t._uU(1),t.qZA()),2&n){const o=t.oxw().$implicit,e=t.oxw();t.xp6(1),t.hij(" ",e.fechaSimple(o.fecha)||"Ahora Mismo"," ")}}function w(n,i){1&n&&(t.TgZ(0,"div",33)(1,"p"),t._uU(2,"Ahora Mismo"),t.qZA()())}function O(n,i){if(1&n&&(t.TgZ(0,"div")(1,"div",29)(2,"div",30),t._uU(3),t.qZA(),t.YNc(4,M,2,1,"div",31),t.YNc(5,w,3,0,"div",31),t.TgZ(6,"div",32),t._uU(7),t.qZA()()()),2&n){const o=i.$implicit;t.xp6(3),t.hij(" ",o.autor," "),t.xp6(1),t.Q6J("ngIf",o.fecha),t.xp6(1),t.Q6J("ngIf",!o.fecha),t.xp6(2),t.hij(" ",o.contenido," ")}}const T=[{path:"post",component:(()=>{class n{constructor(o,e,a,s){this.router=o,this.blogService=e,this.imagenService=a,this.fb=s,this.post={id:0,nombre:"",contenido:"",categoria:0,autor:{id:0,nombre:"",apellidos:"",contrasenia:"",img:"",email:"",tlfn:"",especialidad:"",descripcion:""},fecha:new Date},this.comentarios=[],this.comentarioForm=this.fb.group({nombre:["",[r.kI.required,r.kI.minLength(5)]],contenido:["",[r.kI.required,r.kI.minLength(5),r.kI.maxLength(100)]]}),this.nuevoComentario=!1,this.imagen=""}campoEsValido(o){return this.comentarioForm.controls[o].errors&&this.comentarioForm.controls[o].touched}ngOnInit(){this.iniciaPost()}iniciaPost(){const o=window.location.search,e=new URLSearchParams(o).get("id");null==e?this.router.navigateByUrl("/blog"):this.getPost(parseInt(e))}getPost(o){this.blogService.getPost(o).subscribe({next:e=>{var a;this.post=e,this.getImgPost(),this.comentarios=null===(a=e.comentarios)||void 0===a?void 0:a.reverse()},error:e=>{m().fire({title:"Error al cargar el Post",icon:"error",text:"Intentelo de nuevo m\xe1s tarde",confirmButtonText:"ok"})}})}fechaSimple(o){return o.toString().substr(0,10)}enviarComentario(){if(this.comentarioForm.invalid)return this.comentarioForm.markAllAsTouched(),void m().fire({title:"Compruebe los campos",text:"Compruebe los campos",icon:"error",confirmButtonText:"Ok"});{let o={id:0,autor:this.comentarioForm.controls.nombre.value,contenido:this.comentarioForm.controls.contenido.value};this.blogService.creaComentario(this.post.id,o).subscribe({next:e=>{console.log(e),m().fire({title:"Comentario publicado con \xe9xito",icon:"success",confirmButtonText:"Ok"}),this.comentarios.unshift(o),console.log(this.comentarios[0])},error:e=>{m().fire({title:"Crecenciales Invalidas",text:e.error,icon:"error",confirmButtonText:"Ok"})}})}}getImgPost(){this.imagenService.getFotoPost(this.post.id).subscribe({next:o=>{0==o.size?this.imagen="":this.formateaBlob(o)},error:o=>{this.imagen=""}})}formateaBlob(o){var e=new FileReader;e.readAsDataURL(o),e.onload=a=>{let u=a.target.result.replace("data:application/octet-stream","data:image/png");this.imagen=u}}}return n.\u0275fac=function(o){return new(o||n)(t.Y36(g.F0),t.Y36(p.Z),t.Y36(_.n),t.Y36(r.qu))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-post"]],decls:24,vars:7,consts:[[1,"container","row","text-center"],[1,"col-10"],[1,"cabecera","col-12"],[1,"cabecera"],[1,"cuerpo","col-12","row"],["class","imagen col-12 ",4,"ngIf"],[1,"texto","col-12"],[1,"contenido","text-left"],[1,"info","col-12"],[1,"categoria"],[1,"comentSection","col-12"],["class","btn btn-primary",3,"click",4,"ngIf"],["class","nuevoComentario row",4,"ngIf"],[1,"comentarios"],[4,"ngFor","ngForOf"],[1,"col-12","col-lg-2","row"],[1,"col-2","hrV"],[1,"hrVertical"],[1,"col-10","postRel"],[1,"imagen","col-12"],[3,"src"],[1,"btn","btn-primary",3,"click"],[1,"nuevoComentario","row"],["autocomplete","off",3,"formGroup"],[1,"col-12"],["type","text","name","nombreInput","formControlName","nombre","placeholder","Indice su nombre y primer Apellido"],["class","form-text text-danger",4,"ngIf"],["id","comentarioInput","rows","7","formControlName","contenido","placeholder","Escriba aqui su comentario"],[1,"form-text","text-danger"],[1,"comentario-box","row"],[1,"comentAutor","col-8","mb-2"],["class","comentFecha col-4 mb-2 text-muted",4,"ngIf"],[1,"comentContenido","col-12"],[1,"comentFecha","col-4","mb-2","text-muted"]],template:function(o,e){1&o&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h2",3),t._uU(4),t.qZA()(),t.TgZ(5,"div",4),t.YNc(6,b,2,1,"div",5),t.TgZ(7,"div",6)(8,"p",7),t._uU(9),t.qZA()()(),t.TgZ(10,"div",8)(11,"p",9),t._uU(12),t.qZA()(),t.TgZ(13,"div",10),t._UZ(14,"hr"),t.YNc(15,v,2,0,"button",11),t.YNc(16,Z,11,3,"div",12),t.TgZ(17,"div",13),t.YNc(18,O,8,4,"div",14),t.qZA()()(),t.TgZ(19,"div",15)(20,"div",16),t._UZ(21,"hr",17),t.qZA(),t.TgZ(22,"div",18),t._uU(23," Relacionados "),t.qZA()()()),2&o&&(t.xp6(4),t.hij(" ",e.post.nombre," "),t.xp6(2),t.Q6J("ngIf",e.imagen),t.xp6(3),t.hij(" ",e.post.contenido," "),t.xp6(3),t.hij(" ",e.post.categoria," "),t.xp6(3),t.Q6J("ngIf",!e.nuevoComentario),t.xp6(1),t.Q6J("ngIf",e.nuevoComentario),t.xp6(2),t.Q6J("ngForOf",e.comentarios))},directives:[l.O5,r._Y,r.JL,r.sg,r.Fj,r.JJ,r.u,l.sg],styles:["@media (max-width:1050px){.hrV[_ngcontent-%COMP%]{display:none}.postRel[_ngcontent-%COMP%]{margin-top:2em;margin-bottom:2em;font-size:2em;color:#00008b;font-weight:700}}.postRel[_ngcontent-%COMP%]{margin-top:1em;margin-bottom:1em;font-size:1.5em;color:#00008b;font-weight:700}.row[_ngcontent-%COMP%]{padding-left:0;padding-right:0}.container[_ngcontent-%COMP%]{margin-top:5em;margin-left:1em;max-width:100%}.hrVertical[_ngcontent-%COMP%]{border:none;border-left:1px solid hsla(200,10%,50%,100);height:100%;width:2px}.contenido[_ngcontent-%COMP%]{max-width:85%;margin-top:2em;margin-left:auto;margin-right:auto;background-color:#deb887;text-align:justify!important}.card-text[_ngcontent-%COMP%]{white-space:normal;word-break:break-word}img[_ngcontent-%COMP%]{max-width:500px;max-height:500px}input[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%]{border:2px solid rgb(99,98,98);width:80%}input[_ngcontent-%COMP%]:hover, textarea[_ngcontent-%COMP%]:hover{border:2px solid rgb(46,46,46)}input[_ngcontent-%COMP%]{margin-top:.5em;margin-bottom:.5em}.comentarios[_ngcontent-%COMP%]{margin-left:auto;margin-right:auto}.comentAutor[_ngcontent-%COMP%]{text-align:left!important;font-size:1.1em}.comentFecha[_ngcontent-%COMP%]{text-align:right!important}.comentContenido[_ngcontent-%COMP%]{text-align:justify!important}.comentario-box[_ngcontent-%COMP%]{margin-left:auto;margin-right:auto;width:70%;max-width:600px;margin-top:1em;padding:10px;background-color:#296fa527;border-radius:10px}"]}),n})()},{path:"**",component:x}];let A=(()=>{class n{}return n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[l.ez,r.UX,r.u5,g.Bz.forChild(T)]]}),n})()}}]);