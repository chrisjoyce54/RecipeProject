import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponseData } from './auth-response-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB2JFWWBQ5nuzNzyZlOlkHNxpuT26ftKYM';

constructor(private http: HttpClient) { }
signup(email: string, password: string) {
  return this.http.post<AuthResponseData>(this.baseUrl, {
    'email': email,
    'password': password,
    'returnSecureToken': true
  })

}
}
