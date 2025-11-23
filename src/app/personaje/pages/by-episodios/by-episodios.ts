import { Component } from '@angular/core';
import { BuscarPersonaje } from "../../components/buscar-personaje/buscar-personaje";

@Component({
  selector: 'by-episodios',
  imports: [BuscarPersonaje],
  templateUrl: './by-episodios.html',
})
export class ByEpisodios { }
