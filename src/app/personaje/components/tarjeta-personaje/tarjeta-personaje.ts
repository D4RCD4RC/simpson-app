import { Component, computed, input } from '@angular/core';
import { Personaje } from '../../interfaces/personaje.interface';
import { SlicePipe } from '@angular/common';
import { RouterLink } from "@angular/router";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'tarjeta-personaje',
  imports: [SlicePipe, RouterLink],
  templateUrl: './tarjeta-personaje.html',
})
export class TarjetaPersonaje {
  personaje = input.required<Personaje>();

  imageUrl = computed(() => {
    const id = this.personaje().id;
    return `${environment.baseUrlImage}/character/${id}.webp`;
  });

}
