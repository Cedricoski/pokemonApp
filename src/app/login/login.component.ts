import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  
  message : string;
  name : string;
  password : string;
  auth : AuthService;

  constructor(
    private authService : AuthService,
    private router : Router
  ){}

  ngOnInit(){
   
    this.auth = this.authService;
    this.message='Vous êtes déconecté. (pikachu/pikachu)';
    
  }

  setMessage(){
    if (this.auth.isLoggedIn) {
      this.message = 'Vous êtes connecté.'
    } else {
      this.password = ''
      this.message = 'Identifiant ou mot de passe incorrect'
    }

  }

  login(){
      this.message = 'Tentative de connexion en cours...';
      this.auth.login(this.name,this.password)
        .subscribe((isLoggedIn : boolean)=>{
          this.setMessage();
          if (isLoggedIn) {
            this.router.navigate(['/pokemons'])
          } else {
            this.router.navigate(['/login'])
          }
        })
    

  }

}
