import { Routes } from '@angular/router';
import { PersonajeLayout } from './layouts/personajeLayout/personajeLayout';
import { ByPersonajePage } from './pages/by-personaje-page/by-personaje-page';


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
                path: '**',
                redirectTo: 'by-personaje'
            },
        ]
    },

];

export default personajeRoutes;