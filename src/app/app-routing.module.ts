import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',loadChildren:()=>import("./main-page/main-page.module").then(m=>m.MainPageModule)},
  {path:'home',loadChildren:()=>import("./main-page/main-page.module").then(m=>m.MainPageModule)},
  {path:'cita',loadChildren:()=>import("./cita-previa/cita-previa.module").then(m=>m.CitaPreviaModule)},
  {path:'blog',loadChildren:()=>import("./blog/blog.module").then(m=>m.BlogModule)},
  {path:'sobre',loadChildren:()=>import("./sobre-mi/sobre-mi.module").then(m=>m.SobreMiModule)},
  {path:'**',loadChildren:()=>import("./shared/shared.module").then(m=>m.SharedModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
