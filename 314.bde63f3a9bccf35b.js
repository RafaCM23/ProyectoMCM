"use strict";(self.webpackChunkFront_PI=self.webpackChunkFront_PI||[]).push([[314],{8314:(Y,p,s)=>{s.r(p),s.d(p,{BlogModule:()=>B});var g=s(9808),f=s(5226),l=s.n(f),t=s(1223),u=s(4144),m=s(981),r=s(2382),h=s(7210);function _(e,i){if(1&e&&(t.TgZ(0,"option",34),t._uU(1),t.qZA()),2&e){const o=i.$implicit;t.s9C("value",o.id),t.xp6(1),t.Oqu(o.nombre)}}function x(e,i){if(1&e&&(t.TgZ(0,"small",50),t._UZ(1,"i",51),t._uU(2),t.qZA()),2&e){const o=t.oxw().$implicit;t.xp6(2),t.AsE(" ",o.autor.nombre," ",o.autor.apellidos," ")}}function b(e,i){if(1&e&&(t.TgZ(0,"div",52),t._UZ(1,"img",53),t._uU(2),t.qZA()),2&e){const o=t.oxw().$implicit;t.xp6(2),t.hij("",o.categoria.nombre," ")}}function v(e,i){if(1&e){const o=t.EpF();t.TgZ(0,"div",35)(1,"div",36)(2,"div",37)(3,"div",38)(4,"h4",39),t._uU(5),t.qZA()(),t.TgZ(6,"div",40),t.YNc(7,x,3,2,"small",41),t.qZA(),t.TgZ(8,"div",42)(9,"p",43),t._uU(10),t.qZA(),t.TgZ(11,"a",44),t.NdJ("click",function(){const c=t.CHM(o).$implicit;return t.oxw().redirige(c.id)}),t._uU(12,"Leer M\xe1s"),t.qZA()()(),t.TgZ(13,"div",45)(14,"div",46),t._uU(15),t.qZA(),t.YNc(16,b,3,1,"div",47),t.TgZ(17,"div",48),t._UZ(18,"i",49),t._uU(19),t.qZA()()()()}if(2&e){const o=i.$implicit,n=t.oxw();t.xp6(5),t.Oqu(o.nombre),t.xp6(2),t.Q6J("ngIf",o.autor),t.xp6(3),t.Oqu(o.contenido),t.xp6(5),t.hij("",n.fechaSimple(o.fecha)," "),t.xp6(1),t.Q6J("ngIf",null!=o.categoria.nombre),t.xp6(3),t.hij(" ",null==o.comentarios?null:o.comentarios.length," ")}}function C(e,i){if(1&e){const o=t.EpF();t.TgZ(0,"a",54),t.NdJ("click",function(){return t.CHM(o),t.oxw().getNextPost()}),t._uU(1,"CARGAR M\xc1S"),t.qZA()}}let P=(()=>{class e{constructor(o,n){this.blogService=o,this.router=n,this.botonflotante=!1,this.cuantos=0,this.todos=[],this.categorias=[],this.idCat=-1,this.fecha=1,this.busqueda=""}ngOnInit(){this.getNextPost(),this.recuperaCategorias()}recuperaCategorias(){this.blogService.recuperaCategorias().subscribe({next:o=>{this.categorias=o},error:o=>{l().fire({title:"Ooops",icon:"error",text:"Error al cargar las categor\xedas",confirmButtonText:"ok"})}})}buscaNombre(){const o=this.busqueda;""!=o?o.length<3?l().fire({title:"Error",icon:"error",text:"Busqueda entre 3 y 10 caracteres",confirmButtonText:"ok"}):this.blogService.buscaPorTitulo(o).subscribe({next:n=>{this.todos=n.reverse(),this.fecha=1},error:n=>{}}):this.getPrimeros8SinCat()}buscaCategoria(){const o=this.idCat;-1!=o?this.blogService.buscaPorCategoria(o).subscribe({next:n=>{this.todos=n.reverse(),this.fecha=1},error:n=>{}}):this.getPrimeros8SinCat()}cambiaOrdenFecha(){this.todos=this.todos.reverse()}getPrimeros8SinCat(){this.blogService.loadNextPosts(0).subscribe({next:o=>{this.todos=o,this.cuantos=8,this.fecha=1},error:o=>{l().fire({title:"Error al cargar m\xe1s entradas",text:"Puede que no haya m\xe1s",icon:"error",confirmButtonText:"Ok"})}})}getNextPost(){this.blogService.loadNextPosts(this.cuantos).subscribe({next:o=>{for(const n of o)this.todos.push(n);this.cuantos+=8,this.fecha=1},error:o=>{l().fire({title:"Error al cargar m\xe1s entradas",text:"Puede que no haya m\xe1s",icon:"error",confirmButtonText:"Ok"})}})}redirige(o){this.router.navigateByUrl(`/blog/post?id=${o}`)}fechaSimple(o){return o.toString().substr(0,10)}onScroll(o){this.botonflotante=o.path[1].scrollY>350}}return e.\u0275fac=function(o){return new(o||e)(t.Y36(u.Z),t.Y36(m.F0))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-principal"]],hostBindings:function(o,n){1&o&&t.NdJ("scroll",function(c){return n.onScroll(c)},!1,t.Jf7)},decls:43,vars:7,consts:[[1,"row"],["href","blog#portada",1,"btn-flotante",3,"ngClass"],[1,"fa","fa-arrow-up"],["id","portada",1,"portada","col-12"],["src","./assets/imagenes/fondoBlog.png","alt","",1,"imagen"],[1,"col-12","row","contenido",2,"background-color","rgba(255, 128, 128, 0.322)"],[1,"busqueda","col-12","col-md-6","row"],[1,"input-group","buscador","col-10"],[1,"form-outline"],["type","search","id","form1","placeholder","Buscar","minlength","3","maxlength","10",1,"form-control",3,"ngModel","ngModelChange"],["type","button",1,"btn","btn-primary",3,"click"],[1,"fas","fa-search"],[1,"col-2","duda"],["content","   \xbfComo puedo buscar?\n        Introduzca entre 3 y 10 caracteres\n        Puede escribir palabras clave como \n        'tips' o 'dieta'. Para volver a\n        buscar por categoria presione la \n        lupa con el buscador vacio",1,"info"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 24 24","width","50","height","50",1,"iconoInfo"],["d","M13 7.5a1 1 0 11-2 0 1 1 0 012 0zm-3 3.75a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v4.25h.75a.75.75 0 010 1.5h-3a.75.75 0 010-1.5h.75V12h-.75a.75.75 0 01-.75-.75z"],["fill-rule","evenodd","d","M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM2.5 12a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z"],[1,"filtros","col-12","col-md-6","row"],[1,"col-6"],["for","selectCategorias",1,"lblCat"],["name","selectCategorias",1,"form-select",3,"ngModel","ngModelChange","change"],["value","-1","selected","","disabled","","hidden",""],["value","-1"],[3,"value",4,"ngFor","ngForOf"],["for","fecha",1,"lblFecha"],["name","fecha",1,"form-select",3,"ngModel","ngModelChange","change"],["value","1"],[1,"posts","col-12"],[1,"container","posts","row"],["class","col-12 col-md-6",4,"ngFor","ngForOf"],[1,"col-12","cargaMas"],[3,"click",4,"ngIf"],[1,"mt-0"],[1,"col-12","footer-div"],[3,"value"],[1,"col-12","col-md-6"],[1,"card"],[1,"card-body","row"],[1,"col-8"],[1,"card-title"],[1,"col-4"],["class","text-muted cat",4,"ngIf"],[1,"col-12"],[1,"card-text"],[1,"botonPost",3,"click"],[1,"card-footer","text-muted","d-flex","justify-content-between","bg-transparent","border-top-0","row"],[1,"fecha","col-4"],["class","categoria col-4",4,"ngIf"],[1,"stats","col-4"],[1,"far","fa-comment"],[1,"text-muted","cat"],[1,"fas","fa-user","text-info"],[1,"categoria","col-4"],["src","./assets/imagenes/nota.png","alt","icono-nota","width","30px"],[3,"click"]],template:function(o,n){1&o&&(t.TgZ(0,"div",0)(1,"a",1),t._UZ(2,"i",2),t.qZA(),t.TgZ(3,"div",3),t._UZ(4,"img",4),t.qZA(),t.TgZ(5,"div",5)(6,"div",6)(7,"div",7)(8,"div",8)(9,"input",9),t.NdJ("ngModelChange",function(c){return n.busqueda=c}),t.qZA()(),t.TgZ(10,"button",10),t.NdJ("click",function(){return n.buscaNombre()}),t._UZ(11,"i",11),t.qZA()(),t.TgZ(12,"div",12)(13,"button",13),t.O4$(),t.TgZ(14,"svg",14),t._UZ(15,"path",15)(16,"path",16),t.qZA()()()(),t.kcU(),t.TgZ(17,"div",17)(18,"div",18)(19,"label",19),t._uU(20,"Categoria "),t.qZA(),t.TgZ(21,"select",20),t.NdJ("ngModelChange",function(c){return n.idCat=c})("change",function(){return n.buscaCategoria()}),t.TgZ(22,"option",21),t._uU(23,"Buscar por categor\xeda"),t.qZA(),t.TgZ(24,"option",22),t._uU(25,"Ninguna"),t.qZA(),t.YNc(26,_,2,2,"option",23),t.qZA()(),t.TgZ(27,"div",18)(28,"label",24),t._uU(29,"Fecha "),t.qZA(),t.TgZ(30,"select",25),t.NdJ("ngModelChange",function(c){return n.fecha=c})("change",function(){return n.cambiaOrdenFecha()}),t.TgZ(31,"option",26),t._uU(32,"M\xe1s nuevos"),t.qZA(),t.TgZ(33,"option",22),t._uU(34,"M\xe1s antiguos"),t.qZA()()()(),t.TgZ(35,"div",27)(36,"div",28),t.YNc(37,v,20,6,"div",29),t.qZA()(),t.TgZ(38,"div",30),t.YNc(39,C,2,0,"a",31),t._UZ(40,"hr",32),t.qZA()(),t.TgZ(41,"div",33),t._UZ(42,"app-footer"),t.qZA()()),2&o&&(t.xp6(1),t.Q6J("ngClass",!0===n.botonflotante?"aparece":"desaparece"),t.xp6(8),t.Q6J("ngModel",n.busqueda),t.xp6(12),t.Q6J("ngModel",n.idCat),t.xp6(5),t.Q6J("ngForOf",n.categorias),t.xp6(4),t.Q6J("ngModel",n.fecha),t.xp6(7),t.Q6J("ngForOf",n.todos),t.xp6(2),t.Q6J("ngIf",""==n.busqueda))},directives:[g.mk,r.Fj,r.wO,r.nD,r.JJ,r.On,r.EJ,r.YN,r.Kr,g.sg,g.O5,h.c],styles:["@media (max-width:580px){.buscador[_ngcontent-%COMP%]{justify-content:center!important}.filtros[_ngcontent-%COMP%]{margin-left:1em}.info[_ngcontent-%COMP%]:hover:after{width:330px!important;right:0!important}.duda[_ngcontent-%COMP%]{top:1em!important;left:45%!important;margin-left:7em!important}.busqueda[_ngcontent-%COMP%]{margin-left:1em}.posts[_ngcontent-%COMP%], .portada[_ngcontent-%COMP%]{padding-right:0!important}}.cargaMas[_ngcontent-%COMP%]{margin-top:1em;width:60%;margin-left:20%;color:#37999c;font-weight:700}.cargaMas[_ngcontent-%COMP%]   hr[_ngcontent-%COMP%]{height:3px}.cargaMas[_ngcontent-%COMP%]:hover{color:#376f9c;cursor:pointer}h1[_ngcontent-%COMP%]{margin-top:5em;margin-left:5em}.btn1[_ngcontent-%COMP%]{margin-top:3em;margin-left:10em;font-size:2em;cursor:pointer}.btn-flotante[_ngcontent-%COMP%]{font-size:20px;font-weight:700;color:#fff;border-radius:20px;background-color:#e91e63;padding:10px 15px;position:fixed;bottom:40px;right:30px;width:16px;transition:all .3s ease 0ms;box-shadow:0 8px 15px #0000001a;z-index:99;box-sizing:unset;opacity:0}.btn-flotante[_ngcontent-%COMP%]:hover{background-color:#2c2fa5;box-shadow:0 15px 20px #00000080;transform:translateY(-6px)}.desaparece[_ngcontent-%COMP%]{animation:scale-out .2s cubic-bezier(.55,.085,.68,.53) both;opacity:0;pointer-events:none}.aparece[_ngcontent-%COMP%]{opacity:1;animation:scale-in .2s cubic-bezier(.55,.085,.68,.53) both}.portada[_ngcontent-%COMP%]{width:auto;max-height:600px}.contenido[_ngcontent-%COMP%]{text-align:center;padding:0;max-width:none}.imagen[_ngcontent-%COMP%]{width:100%;height:100%}.buscador[_ngcontent-%COMP%]{margin-top:2em;margin-left:auto;margin-right:0;justify-content:center}.card[_ngcontent-%COMP%]{margin-top:1em;border-radius:3%}.carta[_ngcontent-%COMP%]{max-width:600px}.card-title[_ngcontent-%COMP%]{float:left}.posts[_ngcontent-%COMP%]{margin-top:2em;margin-left:auto;margin-right:auto;text-align:center}.card-text[_ngcontent-%COMP%]{text-align:left;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:5;line-clamp:5;-webkit-box-orient:vertical}.botonPost[_ngcontent-%COMP%]{cursor:pointer;font:16px Arial;display:inline-block;padding:1em 2em;text-align:center;color:#fff;background:red;background:linear-gradient(to left,salmon 50%,lightblue 50%) right;background-size:200%;transition:.5s ease-out}.botonPost[_ngcontent-%COMP%], a[_ngcontent-%COMP%]{text-decoration:none}.botonPost[_ngcontent-%COMP%]:hover{background-position:left}.filtros[_ngcontent-%COMP%]{margin-top:1.5em;margin-left:10px}.lblFecha[_ngcontent-%COMP%], .lblCat[_ngcontent-%COMP%]{font-family:Franklin Gothic Medium,Arial Narrow,Arial,sans-serif;font-size:1.1em;font-weight:600}.duda[_ngcontent-%COMP%]{position:relative;bottom:35%;left:50%;margin-left:10em}.info[_ngcontent-%COMP%]{background:none;color:inherit;border:none;padding:0;font:inherit;cursor:pointer;outline:inherit}.iconoInfo[_ngcontent-%COMP%]{fill:#000;transition:ease-in .3s}.iconoInfo[_ngcontent-%COMP%]:hover{fill:#7b1585}.info[_ngcontent-%COMP%]:hover:after{background:#333;background:rgba(0,0,0,.884);border-radius:5px;color:#fff;content:attr(content);right:-40px;bottom:70px;padding:10px;position:absolute;z-index:98;width:350px;white-space:pre;text-align:center;margin-left:auto;margin-right:auto}"]}),e})();var Z=s(5652);function M(e,i){if(1&e&&(t.TgZ(0,"div",17),t._UZ(1,"img",18),t.qZA()),2&e){const o=t.oxw();t.xp6(1),t.s9C("src",o.imagen,t.LSH)}}function T(e,i){if(1&e){const o=t.EpF();t.TgZ(0,"button",19),t.NdJ("click",function(){return t.CHM(o),t.oxw().nuevoComentario=!0}),t._uU(1,"Realizar Comentario"),t.qZA()}}function O(e,i){1&e&&(t.TgZ(0,"span",26),t._uU(1," * Nombre m\xednimo 5 caracteres * "),t.qZA())}function w(e,i){1&e&&(t.TgZ(0,"span",26),t._uU(1," * El comentario debe tener entre 5 y 100 caracteres* "),t.qZA())}function A(e,i){if(1&e){const o=t.EpF();t.TgZ(0,"div",20)(1,"form",21)(2,"div",22),t._UZ(3,"input",23),t.qZA(),t.YNc(4,O,2,0,"span",24),t.TgZ(5,"div",22),t._UZ(6,"textarea",25),t.qZA(),t.YNc(7,w,2,0,"span",24),t.TgZ(8,"div",22)(9,"button",19),t.NdJ("click",function(){return t.CHM(o),t.oxw().enviarComentario()}),t._uU(10,"Guardar"),t.qZA()()()()}if(2&e){const o=t.oxw();t.xp6(1),t.Q6J("formGroup",o.comentarioForm),t.xp6(3),t.Q6J("ngIf",o.campoEsValido("nombre")),t.xp6(3),t.Q6J("ngIf",o.campoEsValido("contenido"))}}function q(e,i){if(1&e&&(t.TgZ(0,"div",31),t._uU(1),t.qZA()),2&e){const o=t.oxw().$implicit,n=t.oxw();t.xp6(1),t.hij(" ",n.fechaSimple(o.fecha)||"Ahora Mismo"," ")}}function U(e,i){1&e&&(t.TgZ(0,"div",31)(1,"p"),t._uU(2,"Ahora Mismo"),t.qZA()())}function k(e,i){if(1&e&&(t.TgZ(0,"div")(1,"div",27)(2,"div",28),t._uU(3),t.qZA(),t.YNc(4,q,2,1,"div",29),t.YNc(5,U,3,0,"div",29),t.TgZ(6,"div",30),t._uU(7),t.qZA()()()),2&e){const o=i.$implicit;t.xp6(3),t.hij(" ",o.autor," "),t.xp6(1),t.Q6J("ngIf",o.fecha),t.xp6(1),t.Q6J("ngIf",!o.fecha),t.xp6(2),t.hij(" ",o.contenido," ")}}function F(e,i){if(1&e&&(t.TgZ(0,"small",50),t._UZ(1,"i",51),t._uU(2),t.qZA()),2&e){const o=t.oxw().$implicit;t.xp6(2),t.AsE(" ",o.autor.nombre," ",o.autor.apellidos," ")}}function I(e,i){if(1&e&&(t.TgZ(0,"div",52),t._UZ(1,"img",10),t._uU(2),t.qZA()),2&e){const o=t.oxw().$implicit;t.xp6(2),t.hij("",o.categoria.nombre," ")}}function y(e,i){if(1&e){const o=t.EpF();t.TgZ(0,"div",39)(1,"div",40)(2,"div",41)(3,"div",22)(4,"h4",42),t._uU(5),t.qZA()(),t.TgZ(6,"div",22),t.YNc(7,F,3,2,"small",43),t.qZA(),t.TgZ(8,"div",22)(9,"a",44),t.NdJ("click",function(){const c=t.CHM(o).$implicit;return t.oxw(2).redirige(c.id)}),t._uU(10,"Leer M\xe1s"),t.qZA()()(),t.TgZ(11,"div",45)(12,"div",46),t._uU(13),t.qZA(),t.YNc(14,I,3,1,"div",47),t.TgZ(15,"div",48),t._UZ(16,"i",49),t._uU(17),t.qZA()()()()}if(2&e){const o=i.$implicit,n=t.oxw(2);t.xp6(5),t.Oqu(o.nombre),t.xp6(2),t.Q6J("ngIf",o.autor.nombre),t.xp6(6),t.hij("",n.fechaSimple(o.fecha)," "),t.xp6(1),t.Q6J("ngIf",null!=o.categoria.nombre),t.xp6(3),t.hij(" ",null==o.comentarios?null:o.comentarios.length," ")}}function J(e,i){if(1&e&&(t.TgZ(0,"div",32)(1,"div",33)(2,"div",34),t._UZ(3,"hr",35),t.qZA(),t.TgZ(4,"div",36)(5,"div")(6,"h5"),t._uU(7,"Relacionados"),t.qZA()(),t.TgZ(8,"div",37),t.YNc(9,y,18,5,"div",38),t.qZA()()()()),2&e){const o=t.oxw();t.xp6(9),t.Q6J("ngForOf",o.relacionados)}}let N=(()=>{class e{constructor(o,n,a,c){this.router=o,this.blogService=n,this.imagenService=a,this.fb=c,this.post={id:0,nombre:"",contenido:"",categoria:{id:0,nombre:""},autor:{id:0,nombre:"",apellidos:"",contrasenia:"",img:"",email:"",tlfn:"",especialidad:"",descripcion:""},fecha:new Date},this.comentarios=[],this.relacionados=[],this.comentarioForm=this.fb.group({nombre:["",[r.kI.required,r.kI.minLength(5)]],contenido:["",[r.kI.required,r.kI.minLength(5),r.kI.maxLength(100)]]}),this.nuevoComentario=!1,this.imagen=""}campoEsValido(o){return this.comentarioForm.controls[o].errors&&this.comentarioForm.controls[o].touched}ngOnInit(){this.iniciaPost()}getRelacionados(){this.blogService.getRelacionados(this.post.categoria.id).subscribe({next:o=>{this.relacionados=o},error:o=>{}})}iniciaPost(){const o=window.location.search,n=new URLSearchParams(o).get("id");null==n?this.router.navigateByUrl("/blog"):this.getPost(parseInt(n))}getPost(o){this.blogService.getPost(o).subscribe({next:n=>{var a;this.post=n,this.getImgPost(),this.getRelacionados(),this.comentarios=null===(a=n.comentarios)||void 0===a?void 0:a.reverse()},error:n=>{l().fire({title:"Error al cargar el Post",icon:"error",text:"Intentelo de nuevo m\xe1s tarde",confirmButtonText:"ok"}).then(()=>{this.router.navigateByUrl("/blog/")})}})}fechaSimple(o){return o.toString().substr(0,10)}enviarComentario(){if(this.comentarioForm.invalid)return this.comentarioForm.markAllAsTouched(),void l().fire({title:"Compruebe los campos",text:"Compruebe los campos",icon:"error",confirmButtonText:"Ok"});{let o={id:0,autor:this.comentarioForm.controls.nombre.value,contenido:this.comentarioForm.controls.contenido.value};this.blogService.creaComentario(this.post.id,o).subscribe({next:n=>{l().fire({title:"Comentario publicado con \xe9xito",icon:"success",confirmButtonText:"Ok"}).then(()=>{this.nuevoComentario=!1}),this.comentarios.unshift(o)},error:n=>{l().fire({title:"Crecenciales Invalidas",text:n.error,icon:"error",confirmButtonText:"Ok"})}})}}getImgPost(){this.imagenService.getFotoPost(this.post.id).subscribe({next:o=>{0==o.size?this.imagen="":this.formateaBlob(o)},error:o=>{this.imagen=""}})}formateaBlob(o){var n=new FileReader;n.readAsDataURL(o),n.onload=a=>{let d=a.target.result.replace("data:application/octet-stream","data:image/png");this.imagen=d}}redirige(o){this.getPost(o)}}return e.\u0275fac=function(o){return new(o||e)(t.Y36(m.F0),t.Y36(u.Z),t.Y36(Z.n),t.Y36(r.qu))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-post"]],decls:21,vars:8,consts:[[1,"container","row","text-center",2,"min-height","60em"],[1,"col-12","col-lg-9","izquierda"],[1,"cabecera","col-12"],[1,"cabecera"],[1,"cuerpo","col-12","row"],["class","imagen col-12  ",4,"ngIf"],[1,"texto","col-12"],[1,"contenido","text-left"],[1,"info","col-12"],[1,"categoria"],["src","./assets/imagenes/nota.png","alt","icono-nota","width","30px"],[1,"comentSection","col-12"],["class","btn btn-primary",3,"click",4,"ngIf"],["class","nuevoComentario row",4,"ngIf"],[1,"comentarios"],[4,"ngFor","ngForOf"],["class","col-12 col-lg-3",4,"ngIf"],[1,"imagen","col-12"],[3,"src"],[1,"btn","btn-primary",3,"click"],[1,"nuevoComentario","row"],["autocomplete","off",3,"formGroup"],[1,"col-12"],["type","text","name","nombreInput","formControlName","nombre","placeholder","Indice su nombre y primer Apellido"],["class","form-text text-danger",4,"ngIf"],["id","comentarioInput","rows","7","formControlName","contenido","placeholder","Escriba aqui su comentario"],[1,"form-text","text-danger"],[1,"comentario-box","row"],[1,"comentAutor","col-8","mb-2"],["class","comentFecha col-4 mb-2 text-muted",4,"ngIf"],[1,"comentContenido","col-12"],[1,"comentFecha","col-4","mb-2","text-muted"],[1,"col-12","col-lg-3"],[1,"row"],[1,"col-1","hrV"],[1,"hrVertical"],[1,"col-12","col-sm-11","postRel"],[1,"container","posts","row"],["class","col-6 col-lg-12 post",4,"ngFor","ngForOf"],[1,"col-6","col-lg-12","post"],[1,"card"],[1,"card-body"],[1,"card-title"],["class","text-muted cat",4,"ngIf"],[1,"botonPost",3,"click"],[1,"card-footer","text-muted","d-flex","justify-content-between","bg-transparent","border-top-0","row"],[1,"fecha","col-4","col-lg-12"],["class","categoria col-4 col-lg-12",4,"ngIf"],[1,"stats","col-4","col-lg-12"],[1,"far","fa-comment"],[1,"text-muted","cat"],[1,"fas","fa-user","text-info"],[1,"categoria","col-4","col-lg-12"]],template:function(o,n){1&o&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h2",3),t._uU(4),t.qZA()(),t.TgZ(5,"div",4),t.YNc(6,M,2,1,"div",5),t.TgZ(7,"div",6)(8,"p",7),t._uU(9),t.qZA()()(),t.TgZ(10,"div",8)(11,"p",9),t._UZ(12,"img",10),t._uU(13),t.qZA()(),t.TgZ(14,"div",11),t._UZ(15,"hr"),t.YNc(16,T,2,0,"button",12),t.YNc(17,A,11,3,"div",13),t.TgZ(18,"div",14),t.YNc(19,k,8,4,"div",15),t.qZA()()(),t.YNc(20,J,10,1,"div",16),t.qZA()),2&o&&(t.xp6(4),t.hij(" ",n.post.nombre," "),t.xp6(2),t.Q6J("ngIf",n.imagen),t.xp6(3),t.hij(" ",n.post.contenido," "),t.xp6(4),t.hij("",n.post.categoria.nombre," "),t.xp6(3),t.Q6J("ngIf",!n.nuevoComentario),t.xp6(1),t.Q6J("ngIf",n.nuevoComentario),t.xp6(2),t.Q6J("ngForOf",n.comentarios),t.xp6(1),t.Q6J("ngIf",n.relacionados.length>1))},directives:[g.O5,r._Y,r.JL,r.sg,r.Fj,r.JJ,r.u,g.sg],styles:["@media (max-width:900px){.hrV[_ngcontent-%COMP%]{display:none}.postRel[_ngcontent-%COMP%]{margin-top:2em;margin-bottom:2em;padding-right:.5em;font-size:2em;color:#00008b;font-weight:700}.card[_ngcontent-%COMP%]{margin-left:1em;margin-right:1em}.botonPost[_ngcontent-%COMP%]{padding:1em 2em}}.postRel[_ngcontent-%COMP%]{margin-top:1em;margin-bottom:1em;padding-right:20px;font-size:1.5em;color:#00008b;font-weight:700}.row[_ngcontent-%COMP%]{padding-left:0;padding-right:0}.container[_ngcontent-%COMP%]{margin-top:5em;margin-left:1em;max-width:none;width:100%}.hrVertical[_ngcontent-%COMP%]{border:none;border-left:1px solid hsla(200,10%,50%,100);height:100%;width:2px;margin:0}.izquierda[_ngcontent-%COMP%]{padding-right:0}.contenido[_ngcontent-%COMP%]{max-width:85%;margin-top:2em;margin-left:auto;margin-right:auto;text-align:justify!important;font-family:Gill Sans,Gill Sans MT,Calibri,Trebuchet MS,sans-serif;font-size:18px}.card-text[_ngcontent-%COMP%]{white-space:normal;word-break:break-word}img[_ngcontent-%COMP%]{max-width:100%;max-height:100%}input[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%]{border:2px solid rgb(99,98,98);width:80%}input[_ngcontent-%COMP%]:hover, textarea[_ngcontent-%COMP%]:hover{border:2px solid rgb(46,46,46)}input[_ngcontent-%COMP%]{margin-top:.5em;margin-bottom:.5em}.comentarios[_ngcontent-%COMP%]{margin-left:auto;margin-right:auto}.comentAutor[_ngcontent-%COMP%]{text-align:left!important;font-size:1.1em}.comentFecha[_ngcontent-%COMP%]{text-align:right!important}.comentContenido[_ngcontent-%COMP%]{text-align:justify!important}.comentario-box[_ngcontent-%COMP%]{margin-left:auto;margin-right:auto;width:70%;max-width:600px;margin-top:1em;padding:10px;background-color:#296fa527;border-radius:10px}.posts[_ngcontent-%COMP%]{margin:0}.post[_ngcontent-%COMP%]{margin-top:.5em;margin-bottom:.5em;padding:0}.card[_ngcontent-%COMP%]{font-size:14px}.h4[_ngcontent-%COMP%]{font-size:18px}.botonPost[_ngcontent-%COMP%]{margin-top:4%;cursor:pointer;font:16px Arial;display:inline-block;padding:.5em 1em;text-align:center;color:#fff;background:red;background:linear-gradient(to left,salmon 50%,lightblue 50%) right;background-size:200%;transition:.5s ease-out}.botonPost[_ngcontent-%COMP%], a[_ngcontent-%COMP%]{text-decoration:none}.botonPost[_ngcontent-%COMP%]:hover{background-position:left}h5[_ngcontent-%COMP%]{font-size:40px;font-weight:600;font-family:Verdana,Geneva,Tahoma,sans-serif;color:#6da391}"]}),e})();var S=s(6685);const z=[{path:"post",component:N},{path:"**",component:P}];let B=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[g.ez,r.UX,r.u5,S._,m.Bz.forChild(z)]]}),e})()}}]);