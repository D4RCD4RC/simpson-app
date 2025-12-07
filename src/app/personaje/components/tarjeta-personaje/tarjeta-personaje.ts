import { Component, input } from '@angular/core';
import { Personaje } from '../../interfaces/personaje.interface';
import { SlicePipe } from '@angular/common';
import { RouterLink } from "@angular/router";
import { ImagePersonaje } from "../image-personaje/image-personaje";

@Component({
  selector: 'tarjeta-personaje',
  imports: [SlicePipe, RouterLink, ImagePersonaje],
  templateUrl: './tarjeta-personaje.html',
})
export class TarjetaPersonaje {
  personaje = input.required<Personaje>();
}
