import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LaptopDatasetOverviewComponent } from './modules/laptop-dataset-overview/laptop-dataset-overview.component';
import { LaptopManagementOverviewComponent } from './modules/laptop-management-overview/laptop-management-overview.component';
import { MobileManagementOverviewComponent } from './modules/mobile-management-overview/mobile-management-overview.component';


const routes: Routes = [
  {
    path: 'management',
    children: [
      { path: 'laptops', component: LaptopManagementOverviewComponent },
      { path: 'mobiles', component: MobileManagementOverviewComponent },
    ]
  },

  {
    path: 'datasets',
    children: [
      { path: 'laptops', component: LaptopDatasetOverviewComponent },
      { path: 'mobiles', component: MobileManagementOverviewComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
