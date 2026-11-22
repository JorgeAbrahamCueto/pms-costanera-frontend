import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = () => {

  const router = inject(Router);

  const rol = localStorage.getItem('rol');

  if (rol === 'ADMINISTRADOR') {

    return true;

  }

  router.navigate(
    ['/dashboard-recepcion']
  );

  return false;

};