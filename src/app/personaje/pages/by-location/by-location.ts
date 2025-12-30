import { Component, computed, effect, inject, signal } from '@angular/core';
import { BuscarPersonaje } from "../../../shared/components/buscar-personaje/buscar-personaje";
import { TarjetaLocation } from "../../../ubicacion/components/tarjeta-location/tarjeta-location";
import { rxResource } from '@angular/core/rxjs-interop';
import { LocationService } from '../../../ubicacion/service/location.service';
import { PaginationService } from '../../../shared/components/pagination/pagination.service';
import { Pagination } from "../../../shared/components/pagination/pagination";
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';


@Component({
  selector: 'by-location',
  imports: [BuscarPersonaje, TarjetaLocation, Pagination],
  templateUrl: './by-location.html',
})
export class ByLocation {
  searchTerm = signal('');
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  locationService = inject(LocationService);
  paginationService = inject(PaginationService);

  // Constructor
  constructor() {
    effect(() => {
      const searchFromUrl = this.route.snapshot.queryParamMap.get('search');
      if (searchFromUrl !== this.searchTerm()) {
        this.searchTerm.set(searchFromUrl?.toLowerCase() ?? '');
      }
    });
  }

  // Recurso principal
  locationResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() }),
    stream: ({ params }) => {
      return this.locationService.getLocations({
        page: params.page,
      })
    }
  })

  // Funcion para buscar
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
      return this.locationService.getAllLocations();
    },
  });

  // Lista filtrada en frontend
  locationFiltrados = computed(() => {
    const term = this.normalize(this.searchTerm());

    //  búsqueda global
    if (term) {
      return this.searchResource.value().filter(p =>
        this.normalize(p.name).includes(term)
      );
    }

    //  listado normal paginado
    return this.locationResource.value()?.results ?? [];
  });

  // Loading
  isLoading = computed(() => this.locationResource.isLoading());

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
