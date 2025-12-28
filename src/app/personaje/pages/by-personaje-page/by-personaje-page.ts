import { Component, computed, effect, inject, signal } from '@angular/core';
import { TarjetaPersonaje } from "../../components/tarjeta-personaje/tarjeta-personaje";
import { BuscarPersonaje } from "../../../shared/components/buscar-personaje/buscar-personaje";
import { PersonajesService } from '../../services/personajes.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Pagination } from "../../../shared/components/pagination/pagination";
import { PaginationService } from '../../../shared/components/pagination/pagination.service';
import { of } from 'rxjs';
import { Personaje } from '../../interfaces/personaje.interface';
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
  isSearching = computed(() => this.searchTerm().length > 0);

  constructor() {
    effect(() => {
      const searchFromUrl =
        this.route.snapshot.queryParamMap.get('search');

      if (searchFromUrl !== this.searchTerm()) {
        this.searchTerm.set(searchFromUrl?.toLowerCase() ?? '');
      }
    });
  }

  onSearch(value: string) {
    const term = value.toLowerCase();

    // si no cambió, no navegues
    if (term === this.searchTerm()) return;

    this.searchTerm.set(term);

    this.router.navigate([], {
      queryParams: {
        search: term || null,
        page: term ? null : 1,
      },
      queryParamsHandling: 'merge',
      replaceUrl: true, // evita navegación extra
    });
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


  // personajes filtrador

  personajesFiltrados = computed(() => {
    const term = this.searchTerm();
    const personajes = this.personajeResource.value()?.results ?? [];

    if (!term) return personajes;

    return personajes.filter(p =>
      p.name.toLowerCase().includes(term)
    );
  });

  searchResource = rxResource<Personaje[], { term: string }>({
    params: () => ({ term: this.searchTerm() }),
    defaultValue: [],
    stream: ({ params }) => {
      if (!params.term) {
        return of([]); // ✅ Observable vacío
      }

      return this.personajesService.getAllPersonajes();
    },
  });

  personajesFinales = computed(() => {
    if (this.isSearching()) {
      return this.searchResource.value().filter(p =>
        p.name.toLowerCase().includes(this.searchTerm())
      ) ?? [];
    }

    return this.personajeResource.value()?.results ?? [];
  });

  // ====== Loading ========
  isLoading = computed(() =>
    this.personajeResource.isLoading() ||
    (this.isSearching() && this.searchResource.isLoading())
  );


}
