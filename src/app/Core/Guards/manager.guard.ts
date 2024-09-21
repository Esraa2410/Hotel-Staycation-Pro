import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const managerGuard: CanActivateFn = (route, state) => {
  const _Route = inject(Router);

  if(localStorage.getItem('token')!== null && localStorage.getItem('role')=='admin'){
    return true;
  }else{
    _Route.navigate(['/auth']);
    return false
  }


};
