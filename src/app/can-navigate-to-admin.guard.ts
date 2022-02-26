import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CanNavigateToAdminGuard implements CanActivate {

  accessGranted = false;

  canActivate(): boolean {
    if (!this.accessGranted) {
      const question = $localize`:@@CanNavigateToAdminGuard\:question:Wollen Sie den Admin-Bereich betreten?`;
      this.accessGranted = window.confirm(question);
    }

    return this.accessGranted;
  }

}
