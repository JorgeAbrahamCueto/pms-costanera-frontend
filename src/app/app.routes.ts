import { Routes } from '@angular/router';
import { GestionUsuarios } from './gestion-usuarios/gestion-usuarios';
import { GestionProveedores } from './gestion-proveedores/gestion-proveedores';
import { Login } from './login/login';
import { DashboardAdmin } from './dashboard-admin/dashboard-admin';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {path: 'login', component: Login},
    {path: 'dashboard-admin', component: DashboardAdmin, canActivate: [authGuard]},
    {path: 'usuarios', component: GestionUsuarios, canActivate: [authGuard]},
    {path: 'proveedores', component: GestionProveedores, canActivate: [authGuard]}
    
];
