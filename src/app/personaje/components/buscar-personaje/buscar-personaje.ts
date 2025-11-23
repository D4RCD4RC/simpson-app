import { Component, Input, output } from '@angular/core';

@Component({
  selector: 'buscar-personaje',
  imports: [],
  templateUrl: './buscar-personaje.html',
})
export class BuscarPersonaje {
  @Input() placeholder: string = 'Buscar Personaje';
  value = output<string>();
}

