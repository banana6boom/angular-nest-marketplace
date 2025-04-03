import { HttpEventType } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { tap } from 'rxjs';
export const AuthInterceptor = (req, next) => {
    const token = inject(AuthService).getToken(AuthService.accessTokenKey);
    const modifiedReq = req.clone({
        setHeaders: {
            Authorization: token ? `Token ${token}` : '',
        },
    });
    return next(modifiedReq).pipe(tap((event) => {
        if (event.type === HttpEventType.Response) {
            console.log(req.url, 'returned a response with status', event.status);
        }
    }));
};
//# sourceMappingURL=auth.interceptor.js.map