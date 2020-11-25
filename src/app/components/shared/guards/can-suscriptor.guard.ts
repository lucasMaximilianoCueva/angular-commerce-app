import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CanSuscriptorGuard implements CanActivate {

  constructor(private authservice: AuthService) {}

  canActivate(): Observable<boolean> | Promise<boolean>  | boolean {
    return this.authservice.user$.pipe( take(1), map((user) => user && this.authservice.isSuscriptor(user)),
    tap( canEdit => {
      if (!canEdit) {
        window.alert('denied');
      }
    } )
    );
  }

}
