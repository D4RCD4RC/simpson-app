import { Component } from '@angular/core';
import { BuscarPersonaje } from "../../../shared/components/buscar-personaje/buscar-personaje";

@Component({
  selector: 'by-location',
  imports: [BuscarPersonaje],
  templateUrl: './by-location.html',
})
export class ByLocation { }
