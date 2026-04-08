// app.routes.ts
import { Routes } from '@angular/router';
import { PatientProfile } from './features/patient/profile/patient-profile/patient-profile';

export const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },
   {
      path: 'patients/:id',
      component: PatientProfile
    }


];
