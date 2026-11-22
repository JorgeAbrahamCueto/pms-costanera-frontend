import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const recepcionGuard: CanActivateFn = () => {

  const router = inject(Router);

  const rol = localStorage.getItem('rol');

  if (rol === 'RECEPCIONISTA') {

    return true;

  }

  router.navigate(
    ['/dashboard-admin']
  );

  return false;

};