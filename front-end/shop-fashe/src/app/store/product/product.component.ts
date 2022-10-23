import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BrowserStack } from 'protractor/built/driverProviders';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/service/product-service/cart.service';
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

  priceFillter = [
    {price: '$1 - $75', checked: false},
    {price: '$76 - $600', checked: false},
    {price: '$601 - $800', checked: false},
    {price: '$801 - $1000', checked: false},
    {price: 'Greater than $1000', checked: false},
  ];
  brandFilter: BrandFilter[] = [];
  formSearch: FormGroup;

  constructor(private productService: ProductService,
              private activeRoute: ActivatedRoute,
              private formSearchData: FormBuilder,
              private cartService: CartService) {
    this.getCategories();
    this.activeRoute.paramMap.subscribe((p: ParamMap) => {
      this.getProduct(p.get('name'));
      this.active = p.get('name');
    });
    this.categories.forEach(items => {
      if(items.tenDanhMuc == this.active){
        this.idProduct = items.id;
      }
    });
    this.inititalizeFormBoxes();
    this.formSearch.controls.searchText.setValue('');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.products = [];
    this.searchProduct();
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
        this.getBrandFilter();
      }
    );
  }

  insertId(id: number){
    sessionStorage.setItem("id", ''+id);
  }

  get boxes(){
    return this.formSearch.get('boxes') as FormArray;
  }

  get brand(){
    return this.formSearch.get('brand') as FormArray;
  }

  inititalizeFormBoxes(){
    this.formSearch = this.formSearchData.group({
      searchText: new FormControl(''),
      boxes: this.formSearchData.array(
        this.priceFillter.map(box => {
          return this.formSearchData.group({checked: [box.checked], price: [box.price]});
        })
      ),
      brand: this.formSearchData.array(
        this.brandFilter.map(brand => {
          return this.formSearchData.group({checked: [brand.checked], brand: [brand.brand]})
        })
      )
    });
  }

  searchProduct(){
    let products = [];
    let price: string[] = [];
    let brand: string[] = [];
    if(this.searchBrandFilter().length != 0){
      this.searchBrandFilter().forEach(items => {
        brand.push(items);
      });
      brand.forEach(brandItems => {
        if(this.searchByFilterPrice().length != 0){
          this.searchByFilterPrice().forEach(itemPriceFilter => {
            price.push(itemPriceFilter);
          });
          this.products = [];
          price.forEach(itemPrice => {
            if(itemPrice.length <= 1){
              this.productService.searchProductByFilterPrice(this.formSearch.controls.searchText.value, this.idProduct, brandItems, parseInt(itemPrice[0]), 999999).subscribe(innerItemPrice =>
                { 
                  if(innerItemPrice != null){
                    products = innerItemPrice;
                    products.forEach(item => {
                      this.products.push(item);
                    });
                  }
                  else{
                    this.products = [];
                  }
                });
            }
            else{
              this.productService.searchProductByFilterPrice(this.formSearch.controls.searchText.value, this.idProduct, brandItems, parseInt(itemPrice[0]), parseInt(itemPrice[1])).subscribe(items =>
                { 
                  if(items != null){
                    products = items;
                    products.forEach(item => {
                      this.products.push(item);
                    });
                  }
                  else{
                    this.products = [];
                  }
                });
            }
          });
        }
        else{
          this.productService.searchProductByFilterPrice(this.formSearch.controls.searchText.value, this.idProduct, brandItems, 0, 9999999).subscribe(innerItemPrice =>
            { 
              if(innerItemPrice != null){
                products = innerItemPrice;
                products.forEach(item => {
                  this.products.push(item);
                });
              }
            });
        }
      });
    }
    else{
      if(this.searchByFilterPrice().length != 0){
        this.searchByFilterPrice().forEach(itemPriceFilter => {
          price.push(itemPriceFilter);
        });
        this.products = [];
        price.forEach(itemPrice => {
          if(itemPrice.length <= 1){
            this.productService.searchProductByFilterPrice(this.formSearch.controls.searchText.value, this.idProduct, '', parseInt(itemPrice[0]), 999999).subscribe(innerItemPrice =>
              { 
                if(innerItemPrice != null){
                  products = innerItemPrice;
                  products.forEach(item => {
                    this.products.push(item);
                  });
                }
                else{
                  this.products = [];
                }
              });
          }
          else{
            this.productService.searchProductByFilterPrice(this.formSearch.controls.searchText.value, this.idProduct, '', parseInt(itemPrice[0]), parseInt(itemPrice[1])).subscribe(items =>
              { 
                if(items != null){
                  products = items;
                  products.forEach(item => {
                    this.products.push(item);
                  });
                }
                else{
                  this.products = [];
                }
              });
          }
        });
      }
      else{
        this.productService.searchProductByFilterPrice(this.formSearch.controls.searchText.value, this.idProduct, '', 0, 9999999).subscribe(innerItemPrice =>
          { 
            if(innerItemPrice != null){
              products = innerItemPrice;
              products.forEach(item => {
                this.products.push(item);
              });
            }
          });
      }
    }
  }

  searchByFilterPrice(): string[]{
    let priceContainer = [];
    this.formSearch.controls.boxes.value.forEach(items => {
      if(items.checked == true){
        priceContainer.push(this.splitPrice(items.price));
      }
    });
    if(priceContainer.length > 0){
      return priceContainer;
    }
    return [];
  }

  // use to process number split specific character $
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

  // Use to filter brand

  getBrandFilter(){
    this.brandFilter = [];
    let tempBrandFilter = [];
    this.products.forEach(items => {
      let brandChecked = {
        brand: items.brand,
        checked: false
      }
      if(this.brandFilter.length == 0){
        this.brandFilter.push(brandChecked);
      }
      let flag = false;
      for(let i = 0; i < this.brandFilter.length; i++){
        if(this.brandFilter[i].brand == brandChecked.brand){
          flag = true;
          break;
        }
      }
      if(!flag){
        this.brandFilter.push(brandChecked);
        flag = false;
      }
    });
    this.inititalizeFormBoxes();
  }

  // use to check box brand filter
  searchBrandFilter(): string[]{
    let brandContainer = [];
    this.formSearch.controls.brand.value.forEach(items => {
      if(items.checked == true){
        brandContainer.push(items.brand);
      }
    });
    if(brandContainer.length > 0){
      return brandContainer;
    }
    return [];
  }

  
  // Add product to cart
  insertToCart(name: string, id: number){
    this.cartService.insertToCart(name, id, 1);
  }

}





interface BrandFilter {
  brand?: string;
  checked?: boolean;
}
