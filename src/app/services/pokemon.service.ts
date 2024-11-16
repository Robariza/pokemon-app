import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class PokemonService {

  // URL base de la API de Pokémon.
  private readonly API_URL = 'https://pokeapi.co/api/v2/pokemon';

  // Inyección del servicio HttpClient para realizar las solicitudes HTTP.
  constructor(private http: HttpClient) { }

  // Método para obtener la lista de Pokémon.
  // 'limit' es un parámetro opcional que por defecto está en 10, es decir, se obtienen los primeros 10 Pokémon.
  // Devuelve un observable que se suscribe en los componentes para obtener los datos.
  getPokemonList(limit: number = 10): Observable<any> {
    // Realiza una petición GET a la API para obtener la lista de Pokémon con el límite especificado.
    return this.http.get(`${this.API_URL}?limit=${limit}`);
  }

  // Método para obtener los detalles de un Pokémon específico, usando su nombre como parámetro.
  // Devuelve un observable con los detalles del Pokémon.
  getPokemonDetails(name: string): Observable<any> {
    // Realiza una petición GET a la API de Pokémon para obtener los detalles del Pokémon por su nombre.
    return this.http.get(`${this.API_URL}/${name}`);
  }
}
