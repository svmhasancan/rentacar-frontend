import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailDtoComponent } from './components/car-detail-dto/car-detail-dto.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarDetailDtoComponent },
  { path: 'cars', component: CarDetailDtoComponent },
  { path: 'cars/brand/:brandId', component: CarDetailDtoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
