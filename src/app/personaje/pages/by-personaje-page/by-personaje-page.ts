import { Component, computed, effect, inject, signal } from '@angular/core';
import { TarjetaPersonaje } from "../../components/tarjeta-personaje/tarjeta-personaje";
import { BuscarPersonaje } from "../../../shared/components/buscar-personaje/buscar-personaje";
import { PersonajesService } from '../../services/personajes.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Pagination } from "../../../shared/components/pagination/pagination";
import { PaginationService } from '../../../shared/components/pagination/pagination.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

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

  // resource de búsqueda global
  searchResource = rxResource({
    params: () => ({ term: this.searchTerm() }),
    defaultValue: [],
    stream: ({ params }) => {
      if (!params.term) return of([]);
      return this.personajesService.getAllPersonajes();
    },
  });

  // Lista filtrada en frontend
  personajesFiltrados = computed(() => {
    const term = this.normalize(this.searchTerm());

    //  búsqueda global
    if (term) {
      return this.searchResource.value().filter(p =>
        this.normalize(p.name).includes(term)
      );
    }

    //  listado normal paginado
    return this.personajeResource.value()?.results ?? [];
  });

  // Loading
  isLoading = computed(() => this.personajeResource.isLoading());


  // esto podria ser un helper
  private normalize(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')                 // separa acentos
      .replace(/[\u0300-\u036f]/g, '')  // elimina acentos
      .replace(/\s+/g, ' ')             // espacios dobles
      .trim();
  }
}

