import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-edit-pokemon',
  template: `<h2 *ngIf="pokemon" class="center">Editer {{pokemon.name}}</h2>
             <p *ngIf="pokemon" class="center">
              <img [src]="pokemon.picture" alt="{{pokemon.name}}">
              </p>
             <app-pokemon-form *ngIf="pokemon" [pokemon]="pokemon" ></app-pokemon-form>
             <h4 *ngIf='!pokemon' class="center">
              <app-loader></app-loader>
             </h4>
  `,
  styles: [
  ]
})
export class EditPokemonComponent implements OnInit{
  
  pokemon:Pokemon|undefined;

  constructor(
    private route:ActivatedRoute,
    private pokemonService:PokemonService
    ){}

  ngOnInit(){
    
    const pokemonId : String|null = this.route.snapshot.paramMap.get('id');
    if (pokemonId) {
      this.pokemonService.getPokemonById(+pokemonId)
      .subscribe(pokemon=>this.pokemon=pokemon);
    }
    else
    {
      this.pokemon=undefined;
    }

  }


}
