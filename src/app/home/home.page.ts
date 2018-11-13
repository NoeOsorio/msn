import { User } from './../../interfaces/user';
import { UserServices } from './../../services/userServices';

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

  users: any;
  user: any;
  constructor(private router:Router, public fireStore: AngularFirestore){

    this.users = fireStore.collection('users').valueChanges();
    this.user = fireStore.doc<any>('users/SEXAlMPQuQSrDNJk63Pi').valueChanges();
    
    console.log(this.user)

  }

}
