import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt"
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import { lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookies: CookieService, private http: HttpClient) { }
  api=environment.urlapi;
  
  jwtValidator = new JwtHelperService();
  token: string = '';
  //comprueba validez del token
  compruebaToken() {
    let token = this.token;
    if (token == '') { token = this.getToken() }
    const expirado = this.jwtValidator.isTokenExpired(token);
    return !expirado;

  }

  //recupera el token de las cookies
   getToken() {
    return this.cookies.get("_mcm");
  }
  //guarda el token en las cookies
  setToken(token: string) {
    this.cookies.set("_mcm", token);
    this.token = token;
  }
  //elimina el token = logout
  delToken() {
    this.cookies.delete("_mcm");
  }

   whoIs(){
    const cabecera = new HttpHeaders()
    .set('Authorization',`Bearer ${this.getToken()}` || '');
    const url=this.api+'/whois'
    return this.http.get<number>(url,{headers:cabecera});
  }
  devuelveCabecera(){
    const cabecera = new HttpHeaders()
    .set('Authorization',`Bearer ${this.getToken()}` || '');
    return cabecera;
  }
  borraId(){
    this.cookies.delete("_idProf_mcm");
  }
}
