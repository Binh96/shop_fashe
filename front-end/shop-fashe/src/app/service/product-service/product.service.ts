import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categories } from 'src/app/model/categories';
import { CategoriesDto } from 'src/app/model/categoriesDto';
import { Product } from 'src/app/model/product';

const apiUrlProduct = 'http://localhost:8080/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private header = sessionStorage.getItem('token');

  constructor(private http: HttpClient) { }

  getAllProduct(): Observable<Product[]>{
    return this.http.get<Product[]>(apiUrlProduct+'/getProduct', 
      {headers: new HttpHeaders({'authorization':this.header})}).pipe();
  }

  getProductById(id: number): Observable<Product>{
    return this.http.get<Product>(apiUrlProduct+'/getDetailProduct/' +id);
  }

  getAllCategories(): Observable<CategoriesDto[]>{
    return this.http.get<CategoriesDto[]>(apiUrlProduct+'/get-categories');
  }

  getAllProductByCategory(name: string): Observable<Product[]>{
    return this.http.get<Product[]>(apiUrlProduct+'/get-product/' + name);
  }

  searchProductByName(name: string, id: number): Observable<Product[]>{
    return this.http.get<Product[]>(apiUrlProduct+'/get-product-by-name/' +name+'&'+id);
  }

  searchProductByFilterPrice(name: string, id: number, first: string, second: string): Observable<Product[]>{
    return this.http.get<Product[]>(apiUrlProduct+'/get-product-by-filter-price/' +name+'&'+id+'&'+first+'&'+second);
  }

  createProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(apiUrlProduct+"/create-product", product, {headers: new HttpHeaders({'authorization':this.header})}).pipe();
  }
}
