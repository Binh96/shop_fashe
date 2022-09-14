import { Component, OnInit } from '@angular/core';
import { Cart } from '../model/cart';
import { CartService } from '../service/product-service/cart.service';
import { ProductService } from '../service/product-service/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartStorage: Cart[]=[];
  carts = [];
  quantity;

  constructor(private cartService: CartService,
              private productService: ProductService) { 
    this.getProductFromStorage();     
  }

  ngOnInit(): void {
  }

  getProductFromStorage(){
    this.cartStorage = this.cartService.getFromLocalStorage();
    this.cartStorage.forEach(cartStorageItems => {
      this.productService.searchProductByName(cartStorageItems.name, cartStorageItems.idCategory)
                          .subscribe(product => {
                            let cart = {
                              img: product.img,
                              nameProduct: product.nameProduct,
                              quantity: cartStorageItems.quantity,
                              color: product.color,
                              price: (cartStorageItems.quantity * product.price),
                            }
                            this.carts.push(cart);
                          });
    });
  }

  incrementQuantity(name, quantity){
    this.carts.forEach(items =>{
      if(items.nameProduct == name){
        items.quantity++;
      }
    });
  }

}
