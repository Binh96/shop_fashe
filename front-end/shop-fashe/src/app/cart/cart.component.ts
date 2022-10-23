import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { render} from 'creditcardpayments/creditCardPayments';
import { Cart } from '../model/cart';
import { CartService } from '../service/product-service/cart.service';
import { ProductService } from '../service/product-service/product.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, DoCheck{
  cartStorage: Cart[]=[];
  carts = [];
  quantity;
  totalPrice = 1;
  flag = false;
  showPayment = false;

  constructor(private cartService: CartService,
              private productService: ProductService) {
    this.getProductFromStorage();    
  }

  ngDoCheck(): void {
  }

  ngOnInit(): void {
    
  }

  getProductFromStorage(){
    this.cartStorage = this.cartService.getFromLocalStorage();
    if(this.cartStorage.length != 0){
      this.cartStorage.forEach(cartStorageItems => {
        this.productService.searchProductByName(cartStorageItems.name, cartStorageItems.idCategory)
                            .subscribe(product => {
                              let cart = {
                                id: product.id,
                                img: product.img,
                                name: product.nameProduct,
                                quantity: cartStorageItems.quantity,
                                color: product.color,
                                price: (cartStorageItems.quantity * product.price),
                                originPrice: product.price, 
                                idCategory: product.categories.id
                              }
                              this.totalPrice+=cart.price - 1;
                              this.carts.push(cart);
                            }, ()=> {}, () => {

                            });
      });
    }
    else{
      this.carts = [];
    }
  }

  incrementQuantity(id){
    this.carts.forEach(items =>{
      if(items.quantity < 5){
        if(items.id == id){
          items.quantity++;
          items.price = items.quantity * items.originPrice - 1;
          this.totalPrice+=items.originPrice;
        }
      }
      else{
        alert('Greater than 5');
      }
    });
    localStorage.setItem('product', JSON.stringify(this.carts));
  }

  decrementQuantity(id){
    this.carts.forEach(items =>{
      if(items.id == id){
        items.quantity--;
        items.price = items.quantity * items.originPrice - 1;
        this.totalPrice-=items.originPrice;
      }
    });
    localStorage.setItem('product', JSON.stringify(this.carts));
  }

  deleteProductFromStorage(id){
    for(let i = 0; i < this.carts.length; i++){
      if(this.carts[i].id == id){
        this.totalPrice -= (this.carts[i].quantity) * (this.carts[i].originPrice) - 1;
        this.carts.splice(i, 1);
        localStorage.setItem('product', JSON.stringify(this.carts));
      }
    }
  }

  inputQuantity(id: number, quantity: string){
    this.cartStorage = this.cartService.getFromLocalStorage();
    this.cartStorage.forEach(cartStorageItems => {
      if(cartStorageItems.idProduct == id){
        cartStorageItems.quantity = parseInt(quantity);
        this.cartService.setToLocalStorage(cartStorageItems);
      }
    });
  }

  payment(){
    this.showPayment = true;
  }

}
