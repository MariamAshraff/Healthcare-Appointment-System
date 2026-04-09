import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth-service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const _route = inject(Router);
  const toastr = inject(ToastrService);

  console.log(authService.isAuthenticated());
  if (authService.isAuthenticated()) {

    if (state.url === '/' || state.url === '/login') {
      const role = authService.getRole();
      _route.navigate([`/${role}`]);
      return false;
    }
    return true;
  }
  else {
    if (state.url !== '/login') {
      toastr.error('You must be logged in to access this page.', 'Access Denied');
      _route.navigate(['/login']);
      return false;
    }
    return true;
  }
};
