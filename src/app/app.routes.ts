import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { InventarioComponent } from './features/inventario/inventario.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inventario', component: InventarioComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
