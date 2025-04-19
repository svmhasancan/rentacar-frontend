import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from 'src/app/services/car.service';
import { CarDetailDto } from 'src/app/models/car-detail-dto';
import { CarDetailDtoService } from 'src/app/services/car-detail-dto.service';
import { ColorService } from 'src/app/services/color.service';
import { BrandService } from 'src/app/services/brand.service';
import { Color } from 'src/app/models/color';
import { Brand } from 'src/app/models/brand';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: [],
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm: FormGroup;
  cars: CarDetailDto[];
  colors: Color[];
  brands: Brand[];
  selectedCar: CarDetailDto;
  carId: number;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private carDetailDtoService: CarDetailDtoService,
    private colorService: ColorService,
    private brandService: BrandService,
    private toastrService: ToastrService
  ) {
    this.carUpdateForm = this.formBuilder.group({
      carName: ['', Validators.required],
      brandId: ['', Validators.required],
      modelYear: ['', Validators.required],
      colorId: ['', Validators.required],
      dailyPrice: ['', [Validators.required, Validators.min(0)]],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.getCarsByDetail();
    this.getColors();
    this.getBrands();
  }

  getCarsByDetail(): void {
    this.carDetailDtoService.getCarsByDetail().subscribe((response) => {
      this.cars = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  createCarUpdateForm(car: CarDetailDto) {
    this.carId = car.carId;
    this.carService.getCarById(this.carId).subscribe((response) => {
      this.carUpdateForm = this.formBuilder.group({
        carName: [car.carName, Validators.required],
        brandId: [0, Validators.required],
        colorId: [0, Validators.required],
        modelYear: [car.modelYear, Validators.required],
        dailyPrice: [car.dailyPrice, Validators.required],
        description: car.description,
      });
    });
  }

  selectForUpdate(car: CarDetailDto) {
    this.createCarUpdateForm(car);
  }

  updateCar() {
    let carModel = Object.assign({}, this.carUpdateForm.value);
    let updatedCar: Car = {
      id: this.carId,
      name: carModel.carName,
      brandId: carModel.brandId,
      colorId: carModel.colorId,
      modelYear: carModel.modelYear,
      dailyPrice: carModel.dailyPrice,
      description: carModel.description,
    };
    this.carService.updateCar(updatedCar).subscribe(
      (response) => {
        this.toastrService.success(response.message, 'Güncelleme Başarılı');
        this.getCarsByDetail();
      },
      (errorResponse) => {
        if (errorResponse.error.Errors.length > 0) {
          for (let i = 0; i < errorResponse.error.Errors.length; i++) {
            this.toastrService.error(
              errorResponse.error.Errors[i].ErrorMessage,
              'Bir Hata Oluştu'
            );
          }
        }
      }
    );
  }
}

/*
{
  "id": 0,
  "brandId": 0,
  "colorId": 0,
  "name": "string",
  "dailyPrice": 0,
  "modelYear": 0,
  "description": "string"
}

brandId: "1006"
​
carName: "Güncelleme Testi 4"
​
colorId: "1"
​
dailyPrice: 100
​
description: "Güncelleme Testi 4"
​
id: 10003
​
modelYear: 2020

*/
