import { Component, input } from '@angular/core';
import { PersonajeImagePipe } from "../../../shared/pipes/personaje-image.pipe";

@Component({
  selector: 'image-episode',
  imports: [PersonajeImagePipe],
  templateUrl: './image-episode.html',
})
export class ImageEpisode {
  episodeImage = input.required<string>();
}
