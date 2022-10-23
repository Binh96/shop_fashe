import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/service/product-service/cart.service';
import { ProductService } from 'src/app/service/product-service/product.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  product: Product;
  quantity;
  constructor(private productService: ProductService,
              private activeRoute: ActivatedRoute,
              private cartService: CartService) { 
    let id = parseInt(sessionStorage.getItem('id'));
    this.getProduct(id);
    this.quantity = 1;
  }

  ngOnInit(): void {
  }

  getProduct(id: number){
    this.productService.getProductById(id).subscribe(items =>{
      // @ts-ignore
      this.product = items;
    });
  }

  insertToCart(name: string, id: number){
    let cart = this.cartService.getFromLocalStorage();
    if(this.cartService.checkCartLocalStorage(cart)){
      cart.forEach(items => {
        if(items.name == name){
          items.quantity+=this.quantity;
        }
      });
      localStorage.setItem('product', JSON.stringify(cart));
    }
    else{
      this.cartService.insertToCart(name, id, this.quantity);
    }
  }

  incrementQuantity(){
    if(this.quantity < 5){
      ++this.quantity;
    }
    else{
      alert("You can't order quantiy over five.");
    }
  }

  decrementQuantity(){
    if(this.quantity > 1){
      this.quantity--;
    }
    else{
      alert("Quantity to small.");
    }
  }

}
