import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImageLocation } from "../image-location/image-location";
import { Location } from '../../interface/location.interface';


@Component({
  selector: 'tarjeta-location',
  imports: [RouterLink, ImageLocation],
  templateUrl: './tarjeta-location.html',
})
export class TarjetaLocation {
  location = input.required<Location>();
}
