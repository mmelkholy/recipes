import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable, Component } from '@angular/core';
import { Observable } from 'rxjs';

export interface CanDeactivateGuard {
  CanDeactivate: () => Observable<boolean> | Promise<boolean> | Boolean
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuardService {
  canDeactivate(
    component: CanDeactivateGuard,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | Boolean {
    return component.CanDeactivate()
  }
}

