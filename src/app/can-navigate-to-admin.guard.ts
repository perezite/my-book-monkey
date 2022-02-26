import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CanNavigateToAdminGuard implements CanActivate {

  accessGranted = false;

  canActivate(): boolean {
    if (!this.accessGranted) {
      this.accessGranted = window.confirm('Wollen Sie den Admin-Bereich betreten?');
    }

    return this.accessGranted;
  }

}
