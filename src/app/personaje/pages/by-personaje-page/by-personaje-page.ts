import { Component } from '@angular/core';
import { TarjetaPersonaje } from "../../components/tarjeta-personaje/tarjeta-personaje";
import { BuscarPersonaje } from "../../components/buscar-personaje/buscar-personaje";

@Component({
  selector: 'app-by-personaje-page',
  imports: [TarjetaPersonaje, BuscarPersonaje],
  templateUrl: './by-personaje-page.html',
})
export class ByPersonajePage {
  onSearch(value: string) {
    console.log(value);
  }
}
