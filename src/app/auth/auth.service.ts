import { switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user.interface';
import { Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { roleValidator } from '../auth/helpers/roleValidator';

@Injectable({ providedIn: 'root' })
export class AuthService extends roleValidator {

  public user$: Observable<User>;

  constructor(public angularfire: AngularFireAuth, private angularfirestore: AngularFirestore ) {
    super();
    this.user$ = this.angularfire.authState.pipe(
      switchMap( user => {
        if (user){
          return this.angularfirestore.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  async loginGoogle(): Promise<User> {
    try{
      const { user } = await this.angularfire.signInWithPopup(new auth.GoogleAuthProvider());
      this.updateUserData(user);
      return user;
    }
    catch (error) {
      console.log('error');
     }
  }

  async resetPassword(email: string): Promise<void>{
     try{
       return this.angularfire .sendPasswordResetEmail(email);
     }
     catch (error) {
      console.log('error');
     }
  }

  async sendEmailVerification(): Promise<void> {
    return await (await this.angularfire.currentUser).sendEmailVerification();
  }

  async login(email: string, password: string): Promise<User> {
    try{
      const { user } = await this.angularfire.signInWithEmailAndPassword(
        email,
        password
        );
      this.updateUserData(user);
      return user;
    }
    catch (error) {console.log(error); }
  }

  async  register(email: string, password: string): Promise<User> {
    try{
      const { user } = await this.angularfire.createUserWithEmailAndPassword(
        email,
        password
      );
      this.sendEmailVerification();
      return user;
    }
    catch (error) {console.log(error); }
  }

  async logOut() {
     try{
      await this.angularfire.signOut();
     }
     catch  ( error) {console.log(error); }
   }

   private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.angularfirestore.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: 'EDITOR'
    };
    return userRef.set( data, {  merge: true });
  }
}
