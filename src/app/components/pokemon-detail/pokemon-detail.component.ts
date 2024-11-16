import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css'
})
export class PokemonDetailComponent {

  // 'pokemon' almacenará los detalles del Pokémon que se obtiene desde la API.
  pokemon: any;

  // 'isLoading' es un flag para indicar si los datos están siendo cargados o si ya se cargaron.
  isLoading: boolean = true;

  // El constructor inyecta dos dependencias:
  // - 'ActivatedRoute' para acceder a los parámetros de la URL (en este caso, el nombre o ID del Pokémon),
  // - 'PokemonService' para realizar las peticiones a la API de Pokémon.
  constructor(
    private route: ActivatedRoute,  // Proporciona acceso a los parámetros de la ruta.
    private pokemonService: PokemonService,  // Servicio que realiza la llamada a la API de Pokémon.
    private location: Location
  ) { }

  // El método ngOnInit se ejecuta cuando el componente es inicializado.
  // Aquí es donde se obtiene el Pokémon con el ID o nombre que está en la ruta.
  ngOnInit() {
    // Se obtiene el nombre o ID del Pokémon desde los parámetros de la URL (ruta).
    // 'id' debe coincidir con el nombre del parámetro definido en las rutas de Angular.
    const name = this.route.snapshot.params['id'];

    // Se hace una llamada al servicio para obtener los detalles del Pokémon usando el nombre.
    this.pokemonService.getPokemonDetails(name).subscribe((data) => {
      // Una vez que se obtiene la respuesta (detalles del Pokémon), se asigna a la propiedad 'pokemon'.
      this.pokemon = data;

      // Se cambia el estado de 'isLoading' a false para indicar que los datos se han cargado.
      this.isLoading = false;
    });
  }

  goBack(): void {
    this.location.back(); // Navega a la página anterior
  }
}