import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonajesService } from '../../services/personajes.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { switchMap, map } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'personaje-page',
  templateUrl: './personaje-page.html',
  imports: [JsonPipe],
})
export class PersonajePage {

  activateRoute = inject(ActivatedRoute);

  personajeService = inject(PersonajesService);

  personajeResource = rxResource({
    params: () => ({ id: this.activateRoute.snapshot.params['id'] }),
    stream: ({ params }) => this.personajeService.getPersonajeById(params.id),
  });
}
