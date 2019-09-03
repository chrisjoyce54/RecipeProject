import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
  .pipe(catchError(this.handleError));
}
login(email: string, password: string) {
  return this.http.post<AuthResponseData>(this.baseUrl, {
    email,
    password,
    returnSecureToken: true
  })
  .pipe(catchError(this.handleError));
}
private handleError(errorRes: HttpErrorResponse) {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return throwError(errorMessage);
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email already exists!';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'Invalid email or password';
      break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid email or password';
        break;
  }
  return throwError(errorMessage);
}
}
