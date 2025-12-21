import { Component, inject } from '@angular/core';
import { TarjetaEpisodio } from "../../../episodios/components/tarjeta-episodio/tarjeta-episodio";
import { EpisodiosService } from '../../../episodios/services/episodio.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { BuscarPersonaje } from "../../../shared/components/buscar-personaje/buscar-personaje";
import { Pagination } from "../../../shared/components/pagination/pagination";
import { PaginationService } from '../../../shared/components/pagination/pagination.service';

@Component({
  selector: 'by-episodios',
  imports: [TarjetaEpisodio, BuscarPersonaje, Pagination],
  templateUrl: './by-episodios.html',
})
export class ByEpisodios {

  episodiosService = inject(EpisodiosService);
  paginationService = inject(PaginationService);

  episodiosResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() }),
    stream: ({ params }) => {
      return this.episodiosService.getEpisodios({
        page: params.page,
      })
    }
  })

};
