import { Component, computed, effect, inject, signal } from '@angular/core';
import { TarjetaPersonaje } from "../../components/tarjeta-personaje/tarjeta-personaje";
import { BuscarPersonaje } from "../../../shared/components/buscar-personaje/buscar-personaje";
import { PersonajesService } from '../../services/personajes.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Pagination } from "../../../shared/components/pagination/pagination";
import { PaginationService } from '../../../shared/components/pagination/pagination.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-personaje-page',
  imports: [TarjetaPersonaje, BuscarPersonaje, Pagination],
  templateUrl: './by-personaje-page.html',
})
export class ByPersonajePage {

  searchTerm = signal('');
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  personajesService = inject(PersonajesService);
  paginationService = inject(PaginationService);

  constructor() {
    effect(() => {
      const searchFromUrl = this.route.snapshot.queryParamMap.get('search');
      if (searchFromUrl !== this.searchTerm()) {
        this.searchTerm.set(searchFromUrl?.toLowerCase() ?? '');
      }
    });
  }

  // Recurso principal
  personajeResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() }),
    stream: ({ params }) =>
      this.personajesService.getPersonajes({ page: params.page }),
  });

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
  personajesFiltrados = computed(() => {
    const term = this.searchTerm();
    const personajes = this.personajeResource.value()?.results ?? [];
    if (!term) return personajes;

    return personajes.filter(p =>
      p.name.toLowerCase().includes(term)
    );
  });

  // Loading
  isLoading = computed(() => this.personajeResource.isLoading());
}

