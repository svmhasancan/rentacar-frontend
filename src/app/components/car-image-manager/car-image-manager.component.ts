import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from 'src/app/models/car-detail-dto';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailDtoService } from 'src/app/services/car-detail-dto.service';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-car-image-manager',
  templateUrl: './car-image-manager.component.html',
  styleUrls: ['./car-image-manager.component.css'],
})
export class CarImageManagerComponent implements OnInit {
  cars: CarDetailDto[] = [];
  carImageForm: FormGroup;
  carImages: CarImage[] = [];
  selectedFile: File | null = null;
  selectedCarId: number | null = null;
  constructor(
    private formBuilder: FormBuilder,
    private carDetailDtoService: CarDetailDtoService,
    private carImageService: CarImageService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCarDetails();
    this.carImageForm = this.formBuilder.group({
      carId: ['', Validators.required],
    });
  }

  getCarDetails() {
    this.carDetailDtoService.getCarsByDetail().subscribe((response) => {
      this.cars = response.data;
    });
  }

  getCarImagesForSelectedCar(carId: number) {
    this.carImageService.getImageByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }

  // getCarImage(carId: number) {
  //   // const carImagesForCar = this.carImages.filter(
  //   //   (image) => image.carId === carId
  //   // );
  //   // return carImagesForCar.length > 0
  //   //   ? carImagesForCar[0].imagePath
  //   //   : 'assets/default-image.jpg';

  //   this.carImageService.getImageByCarId(carId).subscribe((response) => {
  //     let carImage = response.data;
  //     console.log(carImage);
  //   });

  //   return 'assets/default-car-3.jpg';
  // }

  selectCar(carId: number) {
    this.selectedCarId = carId;
    this.carImageForm.get('carId')?.setValue(carId);
    this.getCarImagesForSelectedCar(carId);
  }

  uploadCarImage() {
    if (this.selectedFile && this.selectedCarId) {
      const carImage: CarImage = {
        id: 0,
        carId: this.selectedCarId,
        imagePath: '',
        date: new Date(),
      };
      this.carImageService
        .uploadCarImage(this.selectedFile, carImage)
        .subscribe(
          (response) => {
            this.toastrService.success('Resim Yüklendi', 'Başarılı');
            this.getCarImagesForSelectedCar(this.selectedCarId!);
          },
          (errorResponse) => {
            this.toastrService.error(errorResponse);
          }
        );
    } else {
      this.toastrService.error(
        'Lütfen Bir Araç Seçin Ve Fotoğraf Yükleyin',
        'Bir Hata Oluştu'
      );
    }
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  deleteImage(imageId: number) {}

  onUpdateFileSelected(event: any, imageId: number) {}
}
