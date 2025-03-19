import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionServiceService } from '../login/guardarsesion/session-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  const sessionService = inject(SessionServiceService);
  const router = inject(Router);

  const usuarioToken = sessionService.obtenerSesion();

  if (usuarioToken != null) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
