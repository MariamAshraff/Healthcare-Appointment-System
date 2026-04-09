import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth-service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const _router = inject(Router);
  const toastr = inject(ToastrService);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    toastr.error('You must be logged in to access this page.', 'Access Denied');
    _router.navigate(['/login']);
    return false;
  }
};
// export const authGuard: CanActivateFn = (route, state) => {
//   const authService = inject(AuthService);
//   const toastr = inject(ToastrService);
//   const _router = inject(Router);

//   const isAuthenticated = authService.isAuthenticated();
//   const isLoginPage = state.url === '/login';

//   if (isAuthenticated) {
//     if (isLoginPage || state.url === '/') {
//       const role = authService.getRole();
//       _router.navigate([`/${role}`]);
//       return false;
//     }
//     return true;
//   } else {
//     if (isLoginPage) {
//       return true;
//     }
//     toastr.error('You must be logged in to access this page.', 'Access Denied');
//     _router.navigate(['/login']);
//     return false;
//   }

// };
