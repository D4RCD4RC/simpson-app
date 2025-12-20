import { Component, inject } from '@angular/core';
import { TarjetaEpisodio } from "../../../episodios/components/tarjeta-episodio/tarjeta-episodio";
import { EpisodiosService } from '../../../episodios/services/episodio.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { BuscarPersonaje } from "../../../shared/components/buscar-personaje/buscar-personaje";

@Component({
  selector: 'by-episodios',
  imports: [TarjetaEpisodio, BuscarPersonaje],
  templateUrl: './by-episodios.html',
})
export class ByEpisodios {

  episodiosService = inject(EpisodiosService);

  episodiosResource = rxResource({
    params: () => ({}),
    stream: ({ params }) => {
      return this.episodiosService.getEpisodios({})
    }
  })

};
