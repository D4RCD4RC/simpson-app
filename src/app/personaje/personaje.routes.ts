import { Routes } from '@angular/router';
import { PersonajeLayout } from './layouts/personajeLayout/personajeLayout';
import { ByPersonajePage } from './pages/by-personaje-page/by-personaje-page';
import { ByEpisodios } from './pages/by-episodios/by-episodios';
import { ByLocation } from './pages/by-location/by-location';
import { PersonajePage } from './components/personaje-page/personaje-page';
import { EpisodePage } from '../episodios/components/episode-page/episode-page';

export const personajeRoutes: Routes = [
    {
        path: '',
        component: PersonajeLayout,
        children: [
            {
                path: 'by-personaje',
                component: ByPersonajePage
            },
            {
                path: 'by-episodios',
                component: ByEpisodios,
            },
            {
                path: 'by-location',
                component: ByLocation
            },
            {
                path: 'episodes/:id',
                component: EpisodePage,
            },
            {
                path: ':id',
                component: PersonajePage
            },
            {
                path: '**',
                redirectTo: 'by-personaje'
            },
        ]
    },

];

export default personajeRoutes;
