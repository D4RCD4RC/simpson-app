import { Component, inject } from '@angular/core';
import { TarjetaPersonaje } from "../../components/tarjeta-personaje/tarjeta-personaje";
import { BuscarPersonaje } from "../../components/buscar-personaje/buscar-personaje";
import { PersonajesService } from '../../services/personajes.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-personaje-page',
  imports: [TarjetaPersonaje, BuscarPersonaje],
  templateUrl: './by-personaje-page.html',
})
export class ByPersonajePage {
  onSearch(value: string) {
    console.log(value);
  }



  // ========== Traer Personajes desde API =======


  personajesService = inject(PersonajesService);

  personajeResource = rxResource({
    params: () => ({}),
    stream: ({ params }) => {
      return this.personajesService.getPersonajes({

      });
    },
  });
}
