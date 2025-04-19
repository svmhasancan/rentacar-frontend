import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailDtoComponent } from './components/car-detail-dto/car-detail-dto.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDeleteComponent } from './components/car-delete/car-delete.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CarImageManagerComponent } from './components/car-image-manager/car-image-manager.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarDetailDtoComponent },
  { path: 'cars', component: CarDetailDtoComponent },
  { path: 'cars/brand/:brandName', component: CarDetailDtoComponent },
  { path: 'cars/add', component: CarAddComponent },
  { path: 'cars/delete', component: CarDeleteComponent },
  { path: 'cars/update', component: CarUpdateComponent },
  //{ path: 'cars/image-manager', component: CarImageManagerComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
