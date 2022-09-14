import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CommonguardService implements CanActivate{
  role;

  constructor(private router: Router,
    private authService: AuthenticationService,) { 
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    this.role = (localStorage.getItem('grantList'));
    if(this.role == null){
      this.router.navigate(['/error']);
      return false;
    }
    return true;
  }
}
