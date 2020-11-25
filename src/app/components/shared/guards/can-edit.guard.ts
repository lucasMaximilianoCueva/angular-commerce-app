import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CanEditGuard implements CanActivate {

  constructor(private authservice: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean>  | boolean {
    return this.authservice.user$.pipe( take(1), map((user) => user && this.authservice.isEditor(user)),
    tap( canEdit => {
      if (!canEdit) {
        this.router.navigate(['login']);
      }
    } )
    );
  }

}
