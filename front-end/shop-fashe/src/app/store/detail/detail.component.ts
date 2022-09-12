import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product-service/product.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  product: Product;
  constructor(private productService: ProductService, private activeRoute: ActivatedRoute) { 
    let id = parseInt(localStorage.getItem('id'));
    this.getProduct(id);
  }

  ngOnInit(): void {
  }

  getProduct(id: number){
    this.productService.getProductById(id).subscribe(items =>{
      // @ts-ignore
      this.product = items;
      console.log(this.product);
      
    });
  }


}
