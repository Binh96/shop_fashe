import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InformationService } from '../login/service/information.service';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';
import { ProductService } from '../service/product-service/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  checkLogOut: boolean = false;
  checkLoginCart: boolean = false;
  user: User;
  username: string;
  role: string;
  categories = [];

  constructor(private authentication: AuthenticationService,
              private productService: ProductService,
              private informationService: InformationService) { 
    this.getCategories();
    this.checkLogin();
  }

  ngOnInit(): void {
    
  }

  logOut(){
    this.authentication.logOut();
    this.checkLogOut = false;
    this.checkLoginCart = false;
    this.username = localStorage.getItem('username');
  }

  logIn(param){
    this.checkLogOut = param;
    this.checkLoginCart= true;
    this.role = localStorage.getItem('grantList');
    this.username = localStorage.getItem('username');
  }

  openFormLogin(){
    if(this.checkLogOut){
      document.getElementById('login-signin').style.display = 'none';
    }
    else{
      document.getElementById('login-signin').style.display = 'block';
    }
  }

  checkLogin(){
    if(this.authentication.isUserLoggedIn()){
      this.logIn(true);
      this.checkLoginCart = true;
      this.username = localStorage.getItem('username');
      if(this.username){
        this.informationService.getInformation(this.username).subscribe(items =>{
          this.user = items;
        });
      }
    }
    else{
      this.logIn(false);
      this.checkLoginCart = false;
    }
  }

  // Author: Phan Xuân Bình
  // Date  : 08/09/2022
  // Function: We need to extract categories for navigation, so
  // this function below has to do get all categories in database
  // and so them on navigation of header bar
  getCategories(){
    let categories = [];
    this.productService.getAllCategories().subscribe(items => {
      // this.categories = items;
      categories = items;
      categories.forEach(category => {
        this.categories.push(category);
      })
    });
  }
}
