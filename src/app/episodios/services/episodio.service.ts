import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Episodio, EpisodioResponse } from '../interface/episodio.interface';

const baseUrl = environment.baseUrl;

interface Options {
    page?: number;
}


@Injectable({ providedIn: 'root' })
export class EpisodiosService {

    private http = inject(HttpClient);

    getEpisodios(options: Options): Observable<EpisodioResponse> {

        const { page = 1 } = options;

        return this.http.get<EpisodioResponse>(`${baseUrl}/episodes`,

            {
                params: {
                    page,
                }
            }
        ).pipe(tap(resp => console.log(resp)))
    }

    // ================== Traer Episodio por ID desde API =======

    getEpisodioById(id: number): Observable<Episodio> {
        return this.http.get<Episodio>(`${baseUrl}/episodes/${id}`)
    }
}