import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CitaPreviaModule } from './cita-previa/cita-previa.module';
import { MainPageModule } from './main-page/main-page.module';
import { SharedModule } from './shared/shared.module';
import { SpinnerInterceptor } from './shared/spinner.interceptor';
import { SpinnerModule } from './shared/spinner/spinner.module';
import { StaffModule } from './staff/staff.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MainPageModule,
    SharedModule,
    CitaPreviaModule,
    NgbModalModule,
    HttpClientModule,
    StaffModule,
    SpinnerModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:SpinnerInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
