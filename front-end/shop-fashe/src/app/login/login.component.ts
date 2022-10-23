import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { sign } from 'crypto';
import { AppUser } from '../model/app-user';
import { SignUp } from '../model/sign-up';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';
import { InformationService } from './service/information.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  username: string;
  formLogin: FormGroup;
  fomrSignUp: FormGroup;
  accountSignUp: SignUp;
  confirmPassword: string;
  checkConfirmPassword = false;
  password: string;
  invalidLogin = false;
  @Output() checkLogIn = new EventEmitter<string>();
  @Input() checkLogOut;

  constructor(private router: Router,
              private loginservice: AuthenticationService,
              private informationService: InformationService) { 
      this.loginservice.isUserLoggedIn();
    }

  ngOnInit() {
    this.formLogin = new FormGroup(
      {
        username: new FormControl(''),
        password: new FormControl('')
      }
    );
    this.fomrSignUp = new FormGroup(
      {
        name: new FormControl(''),
        email: new FormControl(''),
        address: new FormControl(''),
        birthday: new FormControl('')
      }
    );
  }

  checkLogin() {
    this.loginservice.authenticate(this.formLogin.value.username, 
      this.formLogin.value.password).subscribe(
      data => {
        this.router.navigate([''])
        this.invalidLogin = false;
        this.closeForm();
        this.logIn(true);
        this.formLogin.reset();
      },
      error => {
        this.invalidLogin = true
      }
    );
  }

  closeForm(){
    document.getElementById('login-signin').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
    this.formLogin.reset();
  }

  logIn(param){
    this.checkLogIn.emit(param);
  }


  signUp(){
    this.accountSignUp = this.fomrSignUp.value;
    this.accountSignUp.password = this.password;
    if(this.checkConfirmPassword){
      if(this.fomrSignUp.valid){
        this.informationService.signUp(this.accountSignUp).subscribe(() => {}, () =>{},
        () => {
          this.closeForm();
        });
      }
    }
    else{
      console.log("Something goes wrong");
    }
  }

  checkSignUpPassword(event){
    if(this.confirmPassword != this.password){
      this.checkConfirmPassword = false;
      document.getElementById('errorConfirmPassword').innerHTML = 'Password not match.';
    }
    else{
      this.checkConfirmPassword = true;
      document.getElementById('errorConfirmPassword').innerHTML = '';
    }
  }

}
