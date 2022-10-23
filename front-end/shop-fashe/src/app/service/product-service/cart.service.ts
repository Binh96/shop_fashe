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

  insertToCart(name: string, id: number, quantity){
    let quantityTemp = quantity;
    this.productService.searchProductByName(name, id).subscribe(items => {
      const product = items;
      const setProductToCart = {
        idProduct: product.id,
        name: product.nameProduct,
        quantity: quantity,
        idCategory: product.categories.id,
        originPrice: product.price
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
        if(cartStorage[i].idProduct == cart.idProduct){
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

  checkCartLocalStorage(cart: Cart[]): boolean{
    if(cart.length > 0){
      return true;
    }
    return false;
  }

}
