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
  apiUrl = 'https://localhost:44336/api/Cars/';
  constructor(private httpClient: HttpClient) {}

  // https://localhost:44336/api/Cars/
  getCarsByDetail(): Observable<ListResponseModel<CarDetailDto>> {
    let newUrl = this.apiUrl + 'getcarbydetails';
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newUrl);
  }

  getCarsByBrandName(
    brandName: string
  ): Observable<ListResponseModel<CarDetailDto>> {
    let newUrl =
      this.apiUrl + 'getcardetailsbybrandname?brandName=' + brandName;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newUrl);
  }
}
