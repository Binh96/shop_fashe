import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ErrorComponent } from './error/error.component';
import { HomepageComponent } from './homepage/homepage.component';
import { InformationComponent } from './information/information.component';
import { AuthGaurdService } from './service/auth-gaurd.service';
import { CommonguardService } from './service/guard/commonguard.service';
import { UserguardService } from './service/guard/userguard.service';
import { DetailComponent } from './store/detail/detail.component';
import { InsertProductComponent } from './store/insert-product/insert-product.component';
import { ProductComponent } from './store/product/product.component';

const routes: Routes =[
  {path:'', component: HomepageComponent},
  {path:'shop/detail/:name', component: DetailComponent},
  {path:'shop/product', component: ProductComponent},
  {path:'shop/product/:name', component: ProductComponent},
  {path:'cart', component: CartComponent, canActivate: [CommonguardService]},
  {path:'create-product', component: InsertProductComponent, canActivate: [AuthGaurdService], data: {
    role: 'ROLE_ADMIN'
  }},
  {path:':name', component: InformationComponent, canActivate: [CommonguardService]},
  {path:'error', component: ErrorComponent}
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
