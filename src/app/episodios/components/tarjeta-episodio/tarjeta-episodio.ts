import { Component, input } from '@angular/core';
import { Episodio } from '../../interface/episodio.interface';
import { SlicePipe } from '@angular/common';
import { PersonajeImagePipe } from "../../../shared/pipes/personaje-image.pipe";


@Component({
  selector: 'tarjeta-episodio',
  imports: [SlicePipe, PersonajeImagePipe],
  templateUrl: './tarjeta-episodio.html',
})
export class TarjetaEpisodio {

  episodio = input.required<Episodio>();

}
