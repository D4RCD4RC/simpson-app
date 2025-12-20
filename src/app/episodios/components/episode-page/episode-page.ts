import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EpisodiosService } from '../../services/episodio.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ImageEpisode } from "../image-episode/image-episode";

@Component({
  selector: 'app-episode-page',
  imports: [ImageEpisode],
  templateUrl: './episode-page.html',
})
export class EpisodePage {

  activatedRoute = inject(ActivatedRoute);

  episodeService = inject(EpisodiosService);

  episodeResource = rxResource({
    params: () => ({ id: this.activatedRoute.snapshot.params['id'] }),
    stream: ({ params }) => this.episodeService.getEpisodioById(params.id),
  });
}
