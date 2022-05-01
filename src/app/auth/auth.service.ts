import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt"
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookies: CookieService, private http: HttpClient) { }

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
    const token = this.cookies.get("_mcm");
    return token


  }
  //guarda el token en las cookies
  setToken(token: string) {
    this.cookies.set("_mcm", token);
    this.token = token;

  }
  //elimina el token = logout
  delToken() {

    this.cookies.delete("_mcm");
    this.cookies.deleteAll("_mcm");
  }


}
