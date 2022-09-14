import { Injectable } from '@angular/core';
import { Cart } from 'src/app/model/cart';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  carts: Cart;
  constructor(private productService: ProductService) {
   }

  insertToCart(name: string, id: number){
    this.productService.searchProductByName(name, id).subscribe(items => {
      const product = items;
      const setProductToCart = {
        name: product.nameProduct,
        quantity: 1,
        idCategory: product.categories.id,
      }
      this.carts = setProductToCart;
      this.setToLocalStorage(this.carts);
    });
  }

  setToLocalStorage(cart: Cart){
    let cartStorage = this.getFromLocalStorage();
    let checkCart = false;
    if(cartStorage.length != 0){
      for(let i=0; i< cartStorage.length; i++){
        if(cartStorage[i].name == cart.name){
          ++cartStorage[i].quantity;
          checkCart = true;
          break;
        }
      }
      if(!checkCart){
        cartStorage.push(cart);
        localStorage.setItem('product', JSON.stringify(cartStorage));
        checkCart = true;
      }
      else{
        localStorage.setItem('product', JSON.stringify(cartStorage));
      }
    }
    else{
      cartStorage.push(cart);
      localStorage.setItem('product', JSON.stringify(cartStorage));
    }
  }

  getFromLocalStorage(): Cart[]{
    let cartStorage = JSON.parse(localStorage.getItem('product'));
    if(cartStorage != null){
      return cartStorage;
    }
    return [];
  }

}
