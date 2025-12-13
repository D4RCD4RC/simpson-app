import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Personaje, PersonajeResponse } from '../interfaces/personaje.interface';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

const baseUrl = environment.baseUrl;


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
        )

    }

    // ================== Traer Personaje por ID desde API =======

    getPersonajeById(Id: number): Observable<Personaje> {
        return this.http.get<Personaje>(`${baseUrl}/characters/${Id}`);

    }

}
