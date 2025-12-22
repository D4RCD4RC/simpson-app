import { Component, inject } from '@angular/core';
import { BuscarPersonaje } from "../../../shared/components/buscar-personaje/buscar-personaje";
import { TarjetaLocation } from "../../../ubicacion/components/tarjeta-location/tarjeta-location";
import { rxResource } from '@angular/core/rxjs-interop';
import { LocationService } from '../../../ubicacion/service/location.service';
import { PaginationService } from '../../../shared/components/pagination/pagination.service';
import { Pagination } from "../../../shared/components/pagination/pagination";


@Component({
  selector: 'by-location',
  imports: [BuscarPersonaje, TarjetaLocation, Pagination],
  templateUrl: './by-location.html',
})
export class ByLocation {
  locationService = inject(LocationService);
  paginationService = inject(PaginationService);

  locationResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() }),
    stream: ({ params }) => {
      return this.locationService.getLocations({
        page: params.page,
      })
    }
  })

}
