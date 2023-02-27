import { Routes } from '@angular/router';


export const BACKEND_LAYOUT: Routes = [
    {
        path: '',
        loadChildren: () => import('../backend/backend.module').then(m => m.BackendModule)
    }
]