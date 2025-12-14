import { Component, input } from '@angular/core';

@Component({
  selector: 'image-episode',
  imports: [],
  templateUrl: './image-episode.html',
})
export class ImageEpisode {
  episodeImage = input.required<string>();
}
