import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { finalize } from 'rxjs/operators';
import { ProductService } from 'src/app/service/product-service/product.service';

@Component({
  selector: 'app-insert-product',
  templateUrl: './insert-product.component.html',
  styleUrls: ['./insert-product.component.css']
})
export class InsertProductComponent implements OnInit {
  public Editor = ClassicEditor;
  public detailEditor = ClassicEditor;
  categories = [];
  srcImage: string = '/assets/clickme.png';
  selectedImage: any = null;
  product: FormGroup;

  constructor(private productService: ProductService, private storage: AngularFireStorage) {
    this.getCategories();
  }

  ngOnInit(): void {
    this.product = new FormGroup({
      nameProduct: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      madeIn: new FormControl('', [Validators.required]),
      categories: new FormControl('', [Validators.required]),
      brand: new FormControl('', [Validators.required]),
      detail: new FormControl('', [Validators.required]),
      desc: new FormControl('', [Validators.required]),
      img: new FormControl('', [Validators.required])
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

  submit(){
    if(this.selectedImage !== null){
      const filePath = `img/${this.selectedImage.name.split('.').slice(0, -1).join('.')}.${new Date().getTime()}`
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges()
      .pipe(
        finalize(()=>{
          fileRef.getDownloadURL().subscribe(url => {
            this.srcImage = url;
          })
        })
      ).subscribe();
    }
  }

  choosePicture(event: any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e: any) => this.srcImage = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      this.submit();
    }
    else{
      this.srcImage = '/assets/clickme.png';
      this.selectedImage = null;
    }
  }

  createProduct(){
    const product = this.product.value;
    this.product.value.img = this.srcImage;
    if(this.product.valid){
      this.productService.createProduct(product).subscribe();
    }
  }

}
