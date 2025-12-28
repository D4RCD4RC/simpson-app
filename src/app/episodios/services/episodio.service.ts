import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { Episodio, EpisodioResponse } from '../interface/episodio.interface';

const baseUrl = environment.baseUrl;

interface Options {
    page?: number;
}


@Injectable({ providedIn: 'root' })
export class EpisodiosService {

    private http = inject(HttpClient);
    private allEpisodiosCache: Episodio[] | null = null;

    // ================== Traer Episodios desde API ============
    getEpisodios(options: Options): Observable<EpisodioResponse> {
        const { page = 1 } = options;
        return this.http.get<EpisodioResponse>(`${baseUrl}/episodes`,
            {
                params: {
                    page,
                }
            })
        // .pipe(tap(resp => console.log(resp)))
    }

    // ================== Traer Episodio por ID desde API =======

    getEpisodioById(id: number): Observable<Episodio> {
        return this.http.get<Episodio>(`${baseUrl}/episodes/${id}`)
    }

    // ================== Buscar Episodios (Todos los episodios) desde API ==========
    getAllEpisodios() {
        // ✅ Si ya están cacheados, no vuelvas a llamar la API
        if (this.allEpisodiosCache) {
            console.log('🟢 Usando cache en memoria');
            return of(this.allEpisodiosCache);
        }

        console.log('🔵 Llamando API para traer TODOS los personajes');

        return this.getEpisodios({ page: 1 }).pipe(
            switchMap((response) => {
                const totalPages = response.pages;

                const requests = Array.from({ length: totalPages }, (_, i) =>
                    this.getEpisodios({ page: i + 1 })
                );

                return forkJoin(requests);
            }),
            map((responses) => responses.flatMap((r) => r.results)),
            tap((personajes) => {
                console.log('💾 Guardando personajes de todas las paginas en cache');
                this.allEpisodiosCache = personajes; //  cache
            })
        );
    }
}