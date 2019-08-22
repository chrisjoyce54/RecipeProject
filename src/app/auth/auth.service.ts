import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponseData } from './auth-response-data';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB2JFWWBQ5nuzNzyZlOlkHNxpuT26ftKYM';

constructor(private http: HttpClient) { }
signup(email: string, password: string) {
  return this.http.post<AuthResponseData>(this.baseUrl, {
    email,
    password,
    returnSecureToken: true
  })
  .pipe(catchError(errorRes => {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists!';
    }
    return throwError(errorMessage);
  }));

}
}
