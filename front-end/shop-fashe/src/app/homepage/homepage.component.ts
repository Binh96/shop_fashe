import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product-service/product.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  categories = [];
  constructor(private productService: ProductService) {
    this.getCategories();
    // console.log(this.categories);
  }

  ngOnInit(): void {
  }

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
