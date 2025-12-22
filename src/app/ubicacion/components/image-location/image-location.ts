import { Component, input } from '@angular/core';
import { Location } from '../../interface/location.interface';
import { PersonajeImagePipe } from "../../../shared/pipes/personaje-image.pipe";

@Component({
  selector: 'image-location',
  imports: [PersonajeImagePipe],
  templateUrl: './image-location.html',
})
export class ImageLocation {
  locationImage = input.required<Location>();
}
