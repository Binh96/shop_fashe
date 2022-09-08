import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  checkLogOut: boolean = false;

  constructor(private authentication: AuthenticationService) { }

  ngOnInit(): void {
  }

  logOut(){
    this.authentication.logOut();
    this.checkLogOut = false;
  }

  logIn(param){
    this.checkLogOut = param;
  }

  openFormLogin(){
    if(this.checkLogOut){
      document.getElementById('login-signin').style.display = 'none';
    }
    else{
      document.getElementById('login-signin').style.display = 'block';
    }
  }

}
