import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  gotUser: any

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string) {
    this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDdrFYW0KIclKdGu-inac7kMxZCu52s4z8`, {
      email,
      password,
      returnSecureToken: true // Always true
    }).subscribe(res => console.log(res))
  }

}
