import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  template: `
    <div class="row">
  <div class="col s12 m6 offset-m3">
    <div class="card">
      <div class="card-content">
        <div class="input-field">
          <input #searchBox (keyup)="search(searchBox.value)"
            placeholder="Rechercher un pokémon"/>
        </div>
        <div class="collection">
          <a *ngFor="let pokemon of pokemons$ | async"
            (click)="gotoDetail(pokemon)" class="collection-item">
            {{ pokemon.name }}
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
  styles: [
  ]
})
export class SearchPokemonComponent implements OnInit {

  searchTerms = new Subject<string>();
  pokemons$ : Observable<Pokemon[]>;

  constructor(
    private router : Router,
    private pokemonService : PokemonService 
  ){}

  ngOnInit(){
    this.pokemons$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term:string)=> this.pokemonService.searchPokemon(term) )
    );
  }

  search(term:string){
    this.searchTerms.next(term)
  }

  gotoDetail(pokemon:Pokemon){
    const link = [`/pokemon/${pokemon.id}`];
    return this.router.navigate(link);
  }

}
