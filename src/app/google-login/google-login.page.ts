import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.page.html',
  styleUrls: ['./google-login.page.scss'],
})
export class GoogleLoginPage implements OnInit {

  user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, 
              private gplus: GooglePlus,
              private platform: Platform) {

    this.user = this.afAuth.authState;

  }
  googleLogin() {
    if (this.platform.is('cordova')) {
      this.nativeGoogleLogin();
    } else {
      this.webGoogleLogin();
    }
  }
  
  signOut() {
    this.afAuth.auth.signOut();
  }

  async nativeGoogleLogin(): Promise<firebase.User> {
    try {
  
      const gplusUser = await this.gplus.login({
        'webClientId': 'your-webClientId-XYZ.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      })
  
      return await this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken))
  
    } catch(err) {
      console.log(err)
    }
  }
  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);
  
    } catch(err) {
      console.log(err)
    }
  
  }

  ngOnInit() {
  }

}
