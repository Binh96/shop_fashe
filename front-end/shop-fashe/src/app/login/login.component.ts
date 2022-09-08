import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  invalidLogin = false;
  @Output() checkLogIn = new EventEmitter<string>();
  @Input() checkLogOut;

  constructor(private router: Router,
    private loginservice: AuthenticationService) { }

  ngOnInit() {
    this.formLogin = new FormGroup(
      {
        username: new FormControl(''),
        password: new FormControl('')
      }
    );
  }

  checkLogin() {
    (this.loginservice.authenticate(this.formLogin.value.username, 
      this.formLogin.value.password).subscribe(
      data => {
        console.log(data);
        this.router.navigate([''])
        this.invalidLogin = false;
        this.closeForm();
        this.logIn(true);
        this.formLogin.reset();
      },
      error => {
        this.invalidLogin = true
      }
    )
    );
  }

  closeForm(){
    document.getElementById('login-signin').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
  }

  logIn(param){
    this.checkLogIn.emit(param);
  }

}
