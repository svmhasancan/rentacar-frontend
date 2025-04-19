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
  getCarById(id: number) {
    return this.httpClient.get<any>(`${this.apiUrl}/${id}`);
  }

  updateCar(id: number, car: any) {
    return this.httpClient.put<any>(`${this.apiUrl}/${id}`, car);
  }
}
