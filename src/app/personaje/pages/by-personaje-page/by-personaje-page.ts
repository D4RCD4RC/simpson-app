import { Component, inject } from '@angular/core';
import { TarjetaPersonaje } from "../../components/tarjeta-personaje/tarjeta-personaje";
import { BuscarPersonaje } from "../../components/buscar-personaje/buscar-personaje";
import { PersonajesService } from '../../services/personajes.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Pagination } from "../../../shared/components/pagination/pagination";
import { PaginationService } from '../../../shared/components/pagination/pagination.service';

@Component({
  selector: 'app-by-personaje-page',
  imports: [TarjetaPersonaje, BuscarPersonaje, Pagination],
  templateUrl: './by-personaje-page.html',
})
export class ByPersonajePage {
  onSearch(value: string) {
    console.log(value);
  }

  // ========== Traer Personajes desde API =======

  personajesService = inject(PersonajesService);
  paginationService = inject(PaginationService);


  personajeResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() }),
    stream: ({ params }) => {
      return this.personajesService.getPersonajes({
        page: params.page,

      });
    },
  });
}
