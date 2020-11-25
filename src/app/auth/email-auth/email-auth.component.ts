import { Component, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-email-auth',
  templateUrl: './email-auth.component.html',
  styleUrls: ['./email-auth.component.css'],

})
export class EmailAuthComponent implements OnDestroy {

  public user$: Observable<any> = this.authservice.angularfire.user;

  constructor(private authservice: AuthService ) { }

  onSendEmail(): void {
    this.authservice.sendEmailVerification();
  }

  ngOnDestroy() {
    this.authservice.logOut();
  }
}
