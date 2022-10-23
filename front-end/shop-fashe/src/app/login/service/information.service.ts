import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignUp } from 'src/app/model/sign-up';
import { User } from 'src/app/model/user';
const apiUrlProduct = 'http://localhost:8080/app-user';


@Injectable({
  providedIn: 'root'
})
export class InformationService {
  private header = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  signUp(signUp: SignUp): Observable<SignUp>{
    return this.http.post<SignUp>(apiUrlProduct+'/save-app-user', signUp);
  }

  getInformation(username: string): Observable<User>{
    return this.http.get<User>(apiUrlProduct+'/get-user/'+ username, {headers: new HttpHeaders({'authorization':this.header})}).pipe();
  }

}
