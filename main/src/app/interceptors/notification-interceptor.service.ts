import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarDismiss } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, retryWhen,  } from 'rxjs/operators';
import { AlertComponent } from '../modules/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationInterceptorService implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const errorType = 'error';
    const succesType = 'success';
    return next.handle(req).pipe(
      
      // handle response
      map((event) => {
        if (event instanceof HttpResponse) {
          const message = event.body.message;
          if (message)
            this.showToaster('done', succesType);
        }
        return event;
      }),

      // exception handler
      catchError((error: HttpErrorResponse) => {
        let errorMessage = error.error.message;
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `${error.error.message}`;
        }
        else {
          // server-side error
          const statusCode = error.status;
          if (statusCode === 0) {
            errorMessage = 'Resource not available';
          }
          else if (statusCode === 500) {
            errorMessage = 'Internal server error';
          }
          else if (statusCode === 401) {
            errorMessage = 'Acces is denied';
          }
          else if (statusCode === 404) {
            errorMessage = 'Data not found';
          }
        }
        this.showToaster(errorMessage, errorType);
        return throwError(errorMessage);
      })
    );
  }

  showToaster(message: string, type: string) {
    this.snackBar.openFromComponent(AlertComponent, { duration: 5000, data: message, panelClass: type });
  }
}
