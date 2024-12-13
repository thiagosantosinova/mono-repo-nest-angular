import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ILibMeResponse } from '@libs-rast/interfaces';

@Injectable({
  providedIn: 'root',
})
export class GenericGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const group = route.data as { roles: string[], permissions: string[] };
    const token = sessionStorage.getItem('lib-inova-auth-token')?.toString() || "";

    if (!token) this.redirectToLogin();

    const user: ILibMeResponse = await this.authService.me(token)
      .toPromise()
      .catch(() => {
        return this.redirectToLogin();
      });

    const hasRequiredRole = user.userPermissions.some(({ name }) => group.roles.includes(name));
    const hasRequiredPermission = user.userPermissions.some(({ permissions }) =>
      permissions.some(({ name }) => group.permissions.includes(name))
    );

    if (!hasRequiredRole && !hasRequiredPermission) this.redirectToLogin();

    return true;
  }

  private redirectToLogin(): boolean {
    this.router.navigate(['/login']);
    return false;
  }

}
