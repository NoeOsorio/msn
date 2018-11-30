import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User, Status } from '../../interfaces/user';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = null;
  password: string = null;
  nick: string = null;
  status: Status = null;
  operation: string = 'login';
  fictionUser: string;
  constructor(private router: Router, public auth: AngularFireAuth, private firestore: AngularFirestore) {
  }
  login() {
    this.auth.auth.signInWithEmailAndPassword(this.email, this.password).then((data) => {
      console.log(data);
      this.router.navigateByUrl("/home");
    }).catch((error) => {
      alert('Ocurrió un error');
      console.log(error);
    })
  }

  register(){
    this.auth.auth.createUserWithEmailAndPassword(this.email, this.password).then((data) => {
      var user: User = {nick: this.nick, email:data.user.email, uid: data.user.uid}
      this.createUser(user);
      console.log("Usuario registrado correctamente\n id: " + user.uid)

      alert("Bienvenido" + user.nick)
      this.router.navigateByUrl("/home");
    }).catch((error) => {
      console.log(error);
      alert(error);
    });
  }

  facebookLogin(){
    const provider = new firebase.auth.FacebookAuthProvider();
  }

  public logout() {
    alert("Adios");
    this.auth.auth.signOut();
    this.router.navigateByUrl("/home");

  }

  //Firestore
  createUser(user){
    this.firestore.doc<User>("users/"+user.uid).set(user);
  }
  updateUser(user){
    this.firestore.doc<User>("users/"+user.uid).update(user);
  }
  deletUser(user){
    this.firestore.doc<User>("users/"+user.uid).delete();
  }

  insertUser(){
    var myUser: User = {nick: this.fictionUser, email: this.fictionUser+"@newmail.com", uid: 1}
    console.log(myUser)

    this.createUser(myUser);
  }

  ngOnInit() {
  }

}
