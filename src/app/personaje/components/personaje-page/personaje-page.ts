import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonajesService } from '../../services/personajes.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ImagePersonaje } from "../image-personaje/image-personaje";

@Component({
  selector: 'personaje-page',
  templateUrl: './personaje-page.html',
  imports: [ImagePersonaje],
})
export class PersonajePage {

  activateRoute = inject(ActivatedRoute);

  personajeService = inject(PersonajesService);

  personajeResource = rxResource({
    params: () => ({ id: this.activateRoute.snapshot.params['id'] }),
    stream: ({ params }) => this.personajeService.getPersonajeById(params.id),
  });

}
