import { Routes } from '@angular/router';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';  // Se importa el componente para mostrar la lista de Pokémon.
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';  // Se importa el componente para mostrar los detalles de un Pokémon específico.

export const routes: Routes = [  // Definimos un arreglo de rutas que sigue la estructura 'Routes' proporcionada por Angular.
  { path: '', component: PokemonListComponent },  // Ruta raíz ('') que muestra la lista de Pokémon cuando no hay una ruta específica.
  { path: 'pokemon/:id', component: PokemonDetailComponent },  // Ruta dinámica 'pokemon/:id' que carga el componente de detalles del Pokémon.
];
