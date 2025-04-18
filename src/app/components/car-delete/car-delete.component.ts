import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarDetailDto } from 'src/app/models/car-detail-dto';
import { CarDetailDtoService } from 'src/app/services/car-detail-dto.service';
import { CarService } from 'src/app/services/car.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-car-delete',
  templateUrl: './car-delete.component.html',
  styleUrls: ['./car-delete.component.css'],
})
export class CarDeleteComponent implements OnInit {
  cars: CarDetailDto[] = [];
  constructor(
    private carService: CarService,
    private carDetailDtoService: CarDetailDtoService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCarsByDetail();
  }

  getCarsByDetail(): void {
    this.carDetailDtoService.getCarsByDetail().subscribe((response) => {
      this.cars = response.data;
    });
  }

  delete(carDetail: CarDetailDto | null) {
    if (!carDetail) {
      Swal.fire('Hata!', 'Silinecek araç bulunamadı.', 'error');
      return;
    }
    Swal.fire({
      title: 'Emin misiniz?',
      text: `Bu aracı silmek üzeresiniz: ${carDetail.carName}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Evet, sil!',
      cancelButtonText: 'Vazgeç',
    }).then((result) => {
      if (result.isConfirmed) {
        const car: Car = {
          id: carDetail.carId,
          name: carDetail.carName,
          brandId: 0,
          colorId: 0,
          modelYear: carDetail.modelYear,
          dailyPrice: carDetail.dailyPrice,
          description: carDetail.description,
        };

        this.carService.deleteCar(car).subscribe(
          (response) => {
            Swal.fire('Silindi!', response.message, 'success');
            this.getCarsByDetail();
          },
          (error) => {
            Swal.fire('Hata!', 'Araç silinirken bir sorun oluştu.', 'error');
          }
        );
      }
    });
  }
}

/*

*/
