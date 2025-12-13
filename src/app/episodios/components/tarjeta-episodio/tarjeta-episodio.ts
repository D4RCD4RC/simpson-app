import { Component, input } from '@angular/core';
import { Episodio } from '../../interface/episodio.interface';
import { DatePipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'tarjeta-episodio',
  imports: [SlicePipe, DatePipe],
  templateUrl: './tarjeta-episodio.html',
})
export class TarjetaEpisodio {

  episodio = input.required<Episodio>();
}
