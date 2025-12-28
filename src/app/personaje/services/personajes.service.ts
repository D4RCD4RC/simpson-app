import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Personaje, PersonajeResponse } from '../interfaces/personaje.interface';
import { forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

const baseUrl = environment.baseUrl;

interface Options {
    page?: number;
}

@Injectable({ providedIn: 'root' })
export class PersonajesService {
    private http = inject(HttpClient);
    private allPersonajesCache: Personaje[] | null = null;

    // ================== Traer Personajes desde API =======
    getPersonajes(options: Options): Observable<PersonajeResponse> {
        const { page = 1 } = options;
        return this.http.get<PersonajeResponse>(`${baseUrl}/characters`, {
            params: {
                page,
            },
        });
    }

    // ================== Traer Personaje por ID desde API =======

    getPersonajeById(Id: number): Observable<Personaje> {
        return this.http.get<Personaje>(`${baseUrl}/characters/${Id}`);
    }

    // ================== Buscar Personaje (Todos los personajes) desde API =======
    getAllPersonajes() {
        // ✅ Si ya están cacheados, no vuelvas a llamar la API
        if (this.allPersonajesCache) {
            console.log('🟢 Usando cache en memoria');
            return of(this.allPersonajesCache);
        }

        console.log('🔵 Llamando API para traer TODOS los personajes');

        return this.getPersonajes({ page: 1 }).pipe(
            switchMap((response) => {
                const totalPages = response.pages;

                const requests = Array.from({ length: totalPages }, (_, i) =>
                    this.getPersonajes({ page: i + 1 })
                );

                return forkJoin(requests);
            }),
            map((responses) => responses.flatMap((r) => r.results)),
            tap((personajes) => {
                console.log('💾 Guardando personajes de todas las paginas en cache');
                this.allPersonajesCache = personajes; //  cache
            })
        );
    }
}
