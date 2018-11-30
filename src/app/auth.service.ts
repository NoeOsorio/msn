import { Component, Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
  
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private googlePlus: GooglePlus) {
    console.log('Hello AuthProvider Provider');
  }


  signOut() {
    firebase.auth().signOut();
  }


  anonLogin(): Promise<any> {

    return firebase.auth().signInAnonymously()
      .then(resp => {
        console.log(resp);
      })
  }


}
