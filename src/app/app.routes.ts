import { Routes } from '@angular/router';
import { GestionUsuarios } from './gestion-usuarios/gestion-usuarios';
import { GestionProveedores } from './gestion-proveedores/gestion-proveedores';
import { Login } from './login/login';
import { DashboardAdmin } from './dashboard-admin/dashboard-admin';
import { authGuard } from './guards/auth-guard';
import { DashboardRecepcion } from './dashboard-recepcion/dashboard-recepcion';
import { adminGuard } from './guards/admin-guard';
import { recepcionGuard } from './guards/recepcion-guard';
import { GestionReservas } from './gestion-reservas/gestion-reservas';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {path: 'login', component: Login},
    {path: 'dashboard-admin', component: DashboardAdmin, canActivate: [authGuard , adminGuard]},
    {path: 'usuarios', component: GestionUsuarios, canActivate: [authGuard]},
    {path: 'proveedores', component: GestionProveedores, canActivate: [authGuard]},
    {path: 'dashboard-recepcion', component: DashboardRecepcion, canActivate: [authGuard , recepcionGuard]},
    {path: 'gestion-reservas', component: GestionReservas, canActivate: [recepcionGuard]}
];
