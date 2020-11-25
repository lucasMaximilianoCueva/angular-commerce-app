import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CanAdminGuard implements CanActivate {

  constructor(private authservice: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean>  | boolean {
    return this.authservice.user$.pipe( take(1), map((user) => user && this.authservice.isAdmin(user)),
    tap( canEdit => {
      if (!canEdit) {
        this.router.navigate(['error']);
      }
    } )
    );
  }

}
