import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { InformationService } from '../login/service/information.service';
import { User } from '../model/user';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  formInforUser: FormGroup;
  inforUser: User;
  readonly = true;
  srcImage: string = 'https://firebasestorage.googleapis.com/v0/b/upload-image-10c58.appspot.com/o/img%2Fblank-profile-picture-g77c986162_1280.1663825349772?alt=media&token=314c2922-deed-417f-a021-03c22b4ca7ae';
  selectedImage: any = null;

  constructor(private informationService: InformationService,
              private activeRoute: ActivatedRoute,
              private storage: AngularFireStorage) { 
    this.activeRoute.paramMap.subscribe((username: ParamMap) => {
      this.getInfor(username.get('name'));
    });
  }

  ngOnInit(): void {
  }

  getInfor(username: string){
    this.informationService.getInformation(username).subscribe(items => {
      this.inforUser = items;
      this.setFormUser();
    });
  }

  setFormUser(){
    this.formInforUser = new FormGroup({
      id: new FormControl(this.inforUser.id), 
      address: new FormControl(this.inforUser.address),
      birthday: new FormControl(this.inforUser.birthday),
      email: new FormControl(this.inforUser.email),
      image: new FormControl(this.inforUser.image),
      name: new FormControl(this.inforUser.name),
      appUser: new FormControl(this.inforUser.appUser.id),
      phone: new FormControl(this.inforUser.numberPhone)
    });
  }

  focusToInput(){
    this.readonly = false;
  }

  outFocus(){
    this.readonly = true;
  }

  onFocus(){
    this.readonly = false;
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
      this.srcImage = 'https://firebasestorage.googleapis.com/v0/b/upload-image-10c58.appspot.com/o/img%2Fblank-profile-picture-g77c986162_1280.1663825349772?alt=media&token=314c2922-deed-417f-a021-03c22b4ca7ae';
      this.selectedImage = null;
    }
  }

}
