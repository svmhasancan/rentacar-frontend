import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44336/api/Cars';
  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<Car>> {
    let newUrl = this.apiUrl + '/getall';
    return this.httpClient.get<ListResponseModel<Car>>(newUrl);
  }

  getCarById(id: number): Observable<ListResponseModel<Car>> {
    let newUrl = this.apiUrl + '/getcarbyid?id=' + id;
    return this.httpClient.get<ListResponseModel<Car>>(newUrl);
  }

  getCarsByBrandId(id: number): Observable<ListResponseModel<Car>> {
    let newUrl = this.apiUrl + '/getcarsbybrandid?id=' + id.toString();
    return this.httpClient.get<ListResponseModel<Car>>(newUrl);
  }

  addCar(car: Car): Observable<ResponseModel> {
    let newUrl = this.apiUrl + '/add';
    return this.httpClient.post<ResponseModel>(newUrl, car);
  }

  deleteCar(car: Car): Observable<ResponseModel> {
    let newUrl = this.apiUrl + '/delete';
    return this.httpClient.post<ResponseModel>(newUrl, car);
  }

  // Add this method to the existing car.service.ts file

  updateCar(car: Car) {
    let newUrl = this.apiUrl + '/update';
    return this.httpClient.post<ResponseModel>(newUrl, car);
  }
}
