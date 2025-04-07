import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44336/api/Cars';
  // https://localhost:44336/api/Cars/getcarsbybrandid?id=1
  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<Car>> {
    let newUrl = this.apiUrl + '/getall';
    return this.httpClient.get<ListResponseModel<Car>>(newUrl);
  }

  getCarsByBrandId(id: number): Observable<ListResponseModel<Car>> {
    let newUrl = this.apiUrl + '/getcarsbybrandid?id=' + id.toString();

    return this.httpClient.get<ListResponseModel<Car>>(newUrl);
  }
}
