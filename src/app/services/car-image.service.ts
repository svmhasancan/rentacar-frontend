import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { CarImage } from '../models/carImage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarImageService {
  apiUrl = 'https://localhost:44336/api/CarImages';
  constructor(private httpClient: HttpClient) {}

  getImageByCarId(carId: number): Observable<ListResponseModel<CarImage>> {
    let newUrl = this.apiUrl + '/getbycarid?carId=' + carId;

    return this.httpClient.get<ListResponseModel<CarImage>>(newUrl);
  }

  uploadCarImage(file: File, carImage: CarImage): Observable<any> {
    let newUrl = this.apiUrl + '/add';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('carImage.Id', carImage.id.toString());
    formData.append('carImage.CarId', carImage.carId.toString());
    formData.append('carImage.ImagePath', carImage.imagePath || '');
    formData.append(
      'carImage.Date',
      carImage.date
        ? new Date(carImage.date).toISOString()
        : new Date().toISOString()
    );

    return this.httpClient.post<any>(newUrl, formData);
  }
}
