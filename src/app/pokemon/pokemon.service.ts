import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Pokemon } from './pokemon';

@Injectable()
export class PokemonService {

  constructor(private http:HttpClient) { }

  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
      tap((PokemonList) => this.log(PokemonList)),
      catchError((error) => this.handleError(error,[]))
    )
  }

  getPokemonById(pokemonId:number):Observable<Pokemon|undefined>{
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap((pokemon) => this.log(pokemon)),
      catchError((error) => this.handleError(error,undefined))
    )
  }

  addPokemon(pokemon:Pokemon):Observable<Pokemon>{
    const httpOpions={
      headers: new HttpHeaders({'content-type':'application/json'})
    }
    return this.http.post<Pokemon>(`api/pokemons`,pokemon).pipe(
      tap((response)=> this.log(response)),
      catchError((error) => this.handleError(error,null))
    )
  }

  updatePokemon(pokemon:Pokemon):Observable<null>{
    const httpOptions={
      headers: new HttpHeaders({'Content-Type':'application/json'})
    };
  
  
    return this.http.put('api/pokemons',pokemon,httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error)=> this.handleError(error,null))
    )
  }

  searchPokemon(term:string):Observable<Pokemon[]>{
    if(term.length<=1){
      return of([]);
    }
    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
      tap((response) => this.log(response)),
      catchError((error)=> this.handleError(error,null))
    )
  }

  deletePokemon(pokemonId:number):Observable<any>{
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error)=> this.handleError(error,null))
    )
  }

  private log(response : any){
    return console.table(response)
  }

  private handleError(error:Error, errorValue:any){
    console.error(error);
    return of(errorValue);
  }

  getPokemonTypeList():string[]{
    
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Vol',
      'Combat',
      'Psy'
    ];
  }



}
function deletePokemon(id: any, Number: NumberConstructor) {
  throw new Error('Function not implemented.');
}

