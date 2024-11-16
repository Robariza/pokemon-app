import { Component } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})

export class PokemonListComponent {

  // Lista para almacenar los Pokémon que se obtienen de la API.
  pokemons: any[] = [];

  // Variable para controlar el estado de carga de los datos.
  isLoading: boolean = true;

  // Inyección de dependencias:
  // - pokemonService: Servicio que maneja la obtención de datos de la API.
  // - router: Servicio que maneja la navegación entre las rutas de la aplicación.
  constructor(private pokemonService: PokemonService, private router: Router) { }

  // ngOnInit se ejecuta cuando el componente es inicializado.
  // En este caso, se obtiene la lista de los primeros 10 Pokémon desde la API y luego se obtienen sus detalles.
  ngOnInit() {
    // Llamada al servicio 'pokemonService' para obtener los primeros 10 Pokémon.
    this.pokemonService.getPokemonList(10).subscribe(async (data: any) => {

      // Para cada Pokémon en la lista obtenida, se realiza una solicitud adicional para obtener los detalles.
      // 'Promise.all' asegura que esperamos a que todas las promesas de los detalles se resuelvan antes de continuar.
      const pokemonData = await Promise.all(
        data.results.map(async (pokemon: any) => {
          // Obtenemos los detalles de cada Pokémon utilizando el servicio 'getPokemonDetails'.
          const details = await this.pokemonService.getPokemonDetails(pokemon.name).toPromise();

          // Se devuelve un objeto con los datos necesarios para mostrar el Pokémon en la lista.
          return {
            name: pokemon.name, // Nombre del Pokémon
            weight: details.weight, // Peso del Pokémon
            height: details.height, // Altura del Pokémon
            id: details.id, // ID del Pokémon
            image: details.sprites.front_default, // Imagen del Pokémon
          };
        })
      );

      // Se asigna la lista de Pokémon obtenida a la propiedad 'pokemons'.
      this.pokemons = pokemonData;

      // Se cambia el estado de 'isLoading' a 'false' para indicar que los datos han sido cargados.
      this.isLoading = false;
    });
  }

  // Método para navegar a la página de detalles de un Pokémon específico.
  // Toma el nombre del Pokémon como parámetro y usa el servicio 'router' para navegar a la ruta de detalles.
  goToDetails(name: string) {
    this.router.navigate([`/pokemon/${name}`]); // Navega a la ruta dinámica del Pokémon
  }

  // Método para ordenar la lista de Pokémon según una propiedad específica.
  // 'property' puede ser 'weight', 'height' o 'id'.
  sortBy(property: 'weight' | 'height' | 'id') {
    // Se ordena la lista 'pokemons' en orden ascendente usando la propiedad seleccionada.
    this.pokemons.sort((a, b) => a[property] - b[property]);
  }
}
