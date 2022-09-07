import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DetailComponent } from './store/detail/detail.component';
import { ProductComponent } from './store/product/product.component';

const routes: Routes =[
  {path:'', component: HomepageComponent},
  {path:'shop/detail', component: DetailComponent},
  {path:'shop/product', component: ProductComponent},
  {path:'cart', component: CartComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
// export const routingComponent = [HomepageComponent, DetailComponent, ProductComponent, CartComponent];
