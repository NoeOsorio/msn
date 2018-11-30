import { auth } from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  myid= "SEXAlMPQuQSrDNJk63Pi";
  // ref = firebase.database().ref('users/' + this.myid + '/friends');
  authUser = null;
  email = null;
  users: any;
  user: any;
  constructor(private router:Router, public fireStore: AngularFirestore, public auth:AngularFireAuth){

    this.users = fireStore.collection('users').valueChanges();
    this.user = fireStore.doc<any>('users/SEXAlMPQuQSrDNJk63Pi').valueChanges();
    
    this.auth.auth.onAuthStateChanged(function(user) {
      if (user) {

        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        
        alert("Bienvenido "+ email );

        this.authUser = user;  
        console.log("Email: "+this.authUser.email)
        console.log(email)
        console.log(uid)
        this.email = this.authUser.email;
        // ...
      } else {
        // User is signed out.
        // ...
        console.log("Usuario no loggeado")
      }
    });
    

    


  }
  navTo(rout){
    this.router.navigateByUrl('/'+rout);
  }

}
