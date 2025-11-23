import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopMenu } from "../../components/top-menu/top-menu";

@Component({
  selector: 'app-personaje-layout',
  imports: [RouterOutlet, TopMenu],
  templateUrl: './personajeLayout.html',
})
export class PersonajeLayout { }
