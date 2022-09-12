import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

export class User {
  constructor(public status: string) {
  }

}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userLogIn: boolean;

  constructor(
    private httpClient: HttpClient
  ) {
  }

  authenticate(username, password) {
    return this.httpClient.post<any>('http://localhost:8080/authenticate', {username, password}).pipe(
      map(
        userData => {
          localStorage.setItem('username', username);
          let tokenStr = 'Bearer ' + userData.token;
          localStorage.setItem('token', tokenStr);
          let grantList = userData.grantList;
          localStorage.setItem('grantList', grantList);
          this.isUserLoggedIn();
          return userData;
        }
      )
    );
  }

  isUserLoggedIn() {
    let user = localStorage.getItem('username');
    if(user != null){
      this.userLogIn = true;
    }
    return !(user === null);
  }

  logOut() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('grantList');
  }
}
