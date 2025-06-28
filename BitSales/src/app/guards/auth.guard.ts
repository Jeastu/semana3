import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const usuario = localStorage.getItem('usuario');

    if (usuario) {
      return true; // ✅ Usuario autenticado
    } else {
      return this.router.parseUrl('/login'); // ❌ Redirige a login
    }
  }
}
