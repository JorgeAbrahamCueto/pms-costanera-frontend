import { Routes } from '@angular/router';
import { GestionUsuarios } from './gestion-usuarios/gestion-usuarios';

export const routes: Routes = [
    {path: '', redirectTo: 'usuarios', pathMatch: 'full'},
    {path: 'usuarios', component: GestionUsuarios},
];
