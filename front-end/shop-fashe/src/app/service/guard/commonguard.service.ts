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
    this.role = (sessionStorage.getItem('grantList'));
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.role != 'ROLE_USER' || this.role !='ROLE_ADMIN'){
      this.router.navigate(['/error']);
      return false;
    }
    return true;
  }
}
