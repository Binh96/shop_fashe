import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { ProductService } from '../service/product-service/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  checkLogOut: boolean = false;
  role: string;
  categories = [];

  constructor(private authentication: AuthenticationService,
              private productService: ProductService) { 
    this.getCategories();
    this.checkLogin();
  }

  ngOnInit(): void {
    
  }

  logOut(){
    this.authentication.logOut();
    this.checkLogOut = false;
  }

  logIn(param){
    this.checkLogOut = param;
    this.role = localStorage.getItem('grantList');
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
    }
    else{
      this.logIn(false)
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
