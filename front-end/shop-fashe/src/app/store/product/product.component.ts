import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product-service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnChanges {
  products= [];
  idProduct: number;
  categories = [];
  active;
  productFormSearch: FormGroup;
  searchText;

  priceFillter = [
    {price: '$100 - $400', checked: false},
    {price: '$401 - $600', checked: false},
    {price: '$601 - $800', checked: false},
    {price: '$801 - $1000', checked: false},
    {price: 'Greater than $1000', checked: false},
  ];

  formSearch: FormGroup = this.formSearchData.group({
    searchText: new FormControl(''),
    boxes: this.formSearchData.array(
      this.priceFillter.map(box => {
        return this.formSearchData.group({checked: [box.checked]});
      })
    )
  });

  constructor(private productService: ProductService, private activeRoute: ActivatedRoute, private formSearchData: FormBuilder) {
    this.getCategories();
    this.activeRoute.paramMap.subscribe((p: ParamMap) => {
      this.getProduct(p.get('name'));
      this.active = p.get('name');
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.searchByFilter();
  }

  ngOnInit(): void {
    this.productFormSearch = new FormGroup({
      name: new FormControl(),
    });
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

  getProduct(name: string){
    this.products = [];
    let products = [];
    this.productService.getAllProductByCategory(name).subscribe(
      items => {
        // @ts-ignore
        products = items.content;
        products.forEach(item => {
          this.products.push(item);
        })
        this.categories.forEach(items => {
          if(items.tenDanhMuc == this.active){
            this.idProduct = items.id;
          }
        });
      }
    );
    this.searchText = '';
  }

  insertId(id: number){
    localStorage.setItem("id", ''+id);
  }

  searchProduct(){
    let products = [];
    this.productService.searchProductByName(this.searchText, this.idProduct).subscribe(items =>
      {  
        if(items != null){
          this.products = [];
          products = items;
          products.forEach(item => {
            this.products.push(item);
          });
        }
      });
  }

  searchByFilter(){
    let priceContainer = [];
    this.priceFillter.forEach(items => {
      if(items.checked == true){
        priceContainer = this.splitPrice(items.price);
      }
    });
  }

  splitPrice(param: string): string[]{
    let arrayTemp = param.split(' ');
    let arraySplitSign = [];
    let result = [];
    arrayTemp.forEach(items => {
      arraySplitSign.push(items.split('$'));
    });
    arraySplitSign.forEach(items => {
      items.forEach(innerItems => {
        if(parseInt(innerItems)){
          result.push(innerItems);
        }
      })
    });
    return result;
  }
}
