import { Component } from '@angular/core';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-add-pokemon',
  template: `<h2 class="center">Ajouter un pokemon</h2>
              <app-pokemon-form [pokemon]="pokemon" ></app-pokemon-form>
  `
})
export class AddPokemonComponent {

  pokemon : Pokemon = new Pokemon()

}
