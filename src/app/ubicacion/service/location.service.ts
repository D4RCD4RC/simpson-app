import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { Location, LocationResponse } from '../interface/location.interface';

const baseUrl = environment.baseUrl;

interface Options {
    page?: number;
}

@Injectable({ providedIn: 'root' })
export class LocationService {

    private http = inject(HttpClient);
    private allLocationsCache: Location[] | null = null;

    // ================== Traer Ubicaciones desde API ============
    getLocations(options: Options): Observable<LocationResponse> {

        const { page = 1 } = options;

        return this.http.get<LocationResponse>(`${baseUrl}/locations`,
            {
                params: {
                    page,
                }
            }
        )
        // .pipe(tap(resp => console.log(resp)))
    }

    // ================== Traer Episodio por ID desde API =======

    getLocationById(id: number): Observable<Location> {
        return this.http.get<Location>(`${baseUrl}/locations/${id}`)
    }

    // ================== Buscar Episodios (Todos los episodios) desde API ==========
    getAllLocations() {
        // ✅ Si ya están cacheados, no vuelvas a llamar la API
        if (this.allLocationsCache) {
            console.log('🟢 Usando cache en memoria');
            return of(this.allLocationsCache);
        }

        console.log('🔵 Llamando API para traer TODOS los personajes');

        return this.getLocations({ page: 1 }).pipe(
            switchMap((response) => {
                const totalPages = response.pages;

                const requests = Array.from({ length: totalPages }, (_, i) =>
                    this.getLocations({ page: i + 1 })
                );

                return forkJoin(requests);
            }),
            map((responses) => responses.flatMap((r) => r.results)),
            tap((ubicaciones) => {
                console.log('💾 Guardando personajes de todas las paginas en cache');
                this.allLocationsCache = ubicaciones; //  cache
            })
        );
    }

}