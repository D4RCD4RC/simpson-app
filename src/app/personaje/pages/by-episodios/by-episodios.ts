import { Component, computed, effect, inject, signal } from '@angular/core';
import { TarjetaEpisodio } from "../../../episodios/components/tarjeta-episodio/tarjeta-episodio";
import { EpisodiosService } from '../../../episodios/services/episodio.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { BuscarPersonaje } from "../../../shared/components/buscar-personaje/buscar-personaje";
import { Pagination } from "../../../shared/components/pagination/pagination";
import { PaginationService } from '../../../shared/components/pagination/pagination.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'by-episodios',
  imports: [TarjetaEpisodio, BuscarPersonaje, Pagination],
  templateUrl: './by-episodios.html',
})
export class ByEpisodios {

  searchTerm = signal('');
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  episodiosService = inject(EpisodiosService);
  paginationService = inject(PaginationService);

  constructor() {
    effect(() => {
      const searchFromUrl = this.route.snapshot.queryParamMap.get('search');
      if (searchFromUrl !== this.searchTerm()) {
        this.searchTerm.set(searchFromUrl?.toLowerCase() ?? '');
      }
    });
  }

  //====== Recurso Principal ======== 
  episodiosResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() }),
    stream: ({ params }) => {
      return this.episodiosService.getEpisodios({
        page: params.page,
      })
    }
  })

  // Buscador
  onSearch(value: string) {
    const term = value.toLowerCase();
    if (term === this.searchTerm()) return;

    this.searchTerm.set(term);

    this.router.navigate([], {
      queryParams: {
        search: term || null,
        page: term ? null : 1,
      },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  // Lista filtrada en frontend
  episodiosFiltrados = computed(() => {
    const term = this.searchTerm();
    const episodios = this.episodiosResource.value()?.results ?? [];
    if (!term) return episodios;

    return episodios.filter(p =>
      p.name.toLowerCase().includes(term)
    );
  });

  // Loading
  isLoading = computed(() => this.episodiosResource.isLoading());

};
