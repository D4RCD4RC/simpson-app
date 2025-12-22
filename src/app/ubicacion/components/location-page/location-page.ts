import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from '../../service/location.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ImageLocation } from '../image-location/image-location';

@Component({
  selector: 'app-location-page',
  imports: [ImageLocation],
  templateUrl: './location-page.html',
})
export class LocationPage {
  activatedRoute = inject(ActivatedRoute);

  locationService = inject(LocationService);

  locationResource = rxResource({
    params: () => ({ id: this.activatedRoute.snapshot.params['id'] }),
    stream: ({ params }) => this.locationService.getLocationById(params.id),
  });

}
