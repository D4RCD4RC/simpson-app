import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Location, LocationResponse } from '../interface/location.interface';

const baseUrl = environment.baseUrl;

interface Options {
    page?: number;
}

@Injectable({ providedIn: 'root' })
export class LocationService {
    private http = inject(HttpClient);

    getLocations(options: Options): Observable<LocationResponse> {

        const { page = 1 } = options;

        return this.http.get<LocationResponse>(`${baseUrl}/locations`,

            {
                params: {
                    page,
                }
            }
        ).pipe(tap(resp => console.log(resp)))
    }

    // ================== Traer Episodio por ID desde API =======

    getLocationById(id: number): Observable<Location> {
        return this.http.get<Location>(`${baseUrl}/locations/${id}`)
    }

}