import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
    HttpHandler,
    HttpRequest
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private router: Router) {
    }

    // intercept all HttpRequests and make small changes (eg. add withCredentials option, check for 401 response))
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add withCredentials to the each HttpRequest
        req = req.clone({
            withCredentials: true
        });

        return next.handle(req).pipe(tap(() => { },
            (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status !== 401) {
                        return;
                    }
                    this.router.navigate(['login']);
                }
            }));
    }
}
