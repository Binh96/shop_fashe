import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {
  role;
  constructor(private router: Router,
    private authService: AuthenticationService) { 
      this.role = (sessionStorage.getItem('grantList'));
    }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    if(this.role != 'ROLE_ADMIN'){
      // this.router.navigate(['/error']);
      return false;
    }
    return true;
  }

}