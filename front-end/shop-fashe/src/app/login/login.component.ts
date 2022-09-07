import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ''
  password = ''
  formLogin: FormGroup;
  invalidLogin = false

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
        this.invalidLogin = false
      },
      error => {
        this.invalidLogin = true
      }
    )
    );
  }

}
