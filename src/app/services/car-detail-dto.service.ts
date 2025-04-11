import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { CarDetailDto } from '../models/car-detail-dto';

@Injectable({
  providedIn: 'root',
})
export class CarDetailDtoService {
  apiUrl = 'https://localhost:44336/api/Cars/getcarbydetails';
  constructor(private httpClient: HttpClient) {}

  getCarsByDetail(): Observable<ListResponseModel<CarDetailDto>> {
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(this.apiUrl);
  }
}
