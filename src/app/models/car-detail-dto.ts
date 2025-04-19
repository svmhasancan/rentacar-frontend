import { CarImage } from './carImageDto';

export interface CarDetailDto {
  carId: number;
  carName: string;
  brandName: string;
  colorName: string;
  dailyPrice: number;
  modelYear: number;
  description: string;
  carImages: CarImage[];
}
