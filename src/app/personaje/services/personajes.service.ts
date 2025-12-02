import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Personaje, PersonajeResponse } from '../interfaces/personaje.interface';
import { catchError, map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

const baseUrl = environment.baseUrl;
const imageUrl = environment.baseUrlImage;

interface Options {
    page?: number;
}


@Injectable({ providedIn: 'root' })
export class PersonajesService {
    private http = inject(HttpClient);

    // ================== Traer Personajes desde API =======
    getPersonajes(options: Options): Observable<PersonajeResponse> {
        const { page = 1 } = options;
        return this.http.get<PersonajeResponse>(`${baseUrl}/characters`,
            {
                params: {
                    page,
                }
            }
        ).
            pipe(tap((resp) => console.log(resp)))

    }

    // ================== Traer Personaje por ID desde API =======

    getPersonajeById(Id: number): Observable<Personaje> {
        return this.http.get<Personaje>(`${baseUrl}/characters/${Id}`);

    }

}
