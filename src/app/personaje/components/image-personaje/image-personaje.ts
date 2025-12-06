import { Component, input } from '@angular/core';
import { Personaje } from '../../interfaces/personaje.interface';
import { PersonajeImagePipe } from "../../pipes/personaje-image-pipe";

@Component({
  selector: 'image-personaje',
  imports: [PersonajeImagePipe],
  templateUrl: './image-personaje.html',
})
export class ImagePersonaje {
  personaje = input.required<Personaje>();
}
