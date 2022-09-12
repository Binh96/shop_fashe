import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGaurdService } from '../auth-gaurd.service';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserguardService implements CanActivate{
  role;
  constructor(private router: Router,
    private authService: AuthenticationService,
    private authGuard: AuthGaurdService) { 
    this.role = (sessionStorage.getItem('grantList'));
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    if(this.role != 'ROLE_USER'){
      // this.router.navigateByUrl('/error');
      return false;
    }
    return true;
  }
}
