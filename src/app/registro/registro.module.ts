import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {path:'registro',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class RegistroModule { }
