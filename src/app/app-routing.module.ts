import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailDtoComponent } from './components/car-detail-dto/car-detail-dto.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDeleteComponent } from './components/car-delete/car-delete.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarDetailDtoComponent },
  { path: 'cars', component: CarDetailDtoComponent },
  { path: 'cars/brand/:brandName', component: CarDetailDtoComponent },
  { path: 'cars/add', component: CarAddComponent },
  { path: 'cars/delete', component: CarDeleteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
