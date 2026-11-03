import { Routes } from '@angular/router';
import { GestionUsuarios } from './gestion-usuarios/gestion-usuarios';
import { GestionProveedores } from './gestion-proveedores/gestion-proveedores';

export const routes: Routes = [
    {path: '', redirectTo: 'usuarios', pathMatch: 'full'},
    {path: 'usuarios', component: GestionUsuarios},
    {path: 'proveedores', component: GestionProveedores}
    
];
