import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {
  role;
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    this.role = (localStorage.getItem('grantList'));
    if(this.role != 'ROLE_ADMIN'){
      this.router.navigate(['/error']);
      return false;
    }
    return true;
  }

}