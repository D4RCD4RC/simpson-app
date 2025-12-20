import { Component, input } from '@angular/core';
import { Episodio } from '../../interface/episodio.interface';
import { SlicePipe } from '@angular/common';
import { ImageEpisode } from "../image-episode/image-episode";
import { RouterLink } from "@angular/router";


@Component({
  selector: 'tarjeta-episodio',
  imports: [SlicePipe, ImageEpisode, RouterLink],
  templateUrl: './tarjeta-episodio.html',
})
export class TarjetaEpisodio {

  episodio = input.required<Episodio>();

}
