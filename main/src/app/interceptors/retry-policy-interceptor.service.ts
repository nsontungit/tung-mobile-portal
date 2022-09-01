import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, retryWhen } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RetryPolicyInterceptorService implements HttpInterceptor {
  private retryConfig = {
    count: 3,
    delay: 1000,
    status: [408, 429, 500, 502, 503, 504]
  };
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retryWhen(error => {
        return error.pipe(
          mergeMap((err, index) => {
            if (index < this.retryConfig.count && this.retryConfig.status.includes(err.status)) {
              return of(err).pipe(delay(this.retryConfig.delay));
            }
            return throwError(err);
          })
        );
      })
    );
  }
}
