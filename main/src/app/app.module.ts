import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainNavbarComponent } from './modules/main-navbar/main-navbar.component';
import { LaptopManagementOverviewComponent } from './modules/laptop-management-overview/laptop-management-overview.component';
import { MobileManagementOverviewComponent } from './modules/mobile-management-overview/mobile-management-overview.component';
import { NgbAlertModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { EditLaptopModalComponent } from './modules/modals/edit-laptop-modal/edit-laptop-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptorService } from './interceptors/loading-interceptor.service';
import { LoadingComponent } from './modules/loading/loading.component';
import { NotificationInterceptorService } from './interceptors/notification-interceptor.service';
import { RetryPolicyInterceptorService } from './interceptors/retry-policy-interceptor.service';
import { NgxNumberFormatModule } from 'ngx-number-format';

@NgModule({
  declarations: [
    AppComponent,
    MainNavbarComponent,
    LaptopManagementOverviewComponent,
    MobileManagementOverviewComponent,
    EditLaptopModalComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModalModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    NgbAlertModule,
    MatCardModule,
    MatSnackBarModule,
    MatTableModule,
    MatMenuModule,
    MatSelectModule,
    MatPaginatorModule,
    NgxNumberFormatModule,
    MatSortModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: NotificationInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RetryPolicyInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
