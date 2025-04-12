import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from 'src/app/models/car-detail-dto';
import { CarDetailDtoService } from 'src/app/services/car-detail-dto.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-car-detail-dto',
  templateUrl: './car-detail-dto.component.html',
  styleUrls: ['./car-detail-dto.component.css'],
})
export class CarDetailDtoComponent implements OnInit {
  cars: CarDetailDto[];
  filterText: string;
  constructor(
    private carDetailDtoService: CarDetailDtoService,
    private cartService: CartService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const brandName = params.get('brandName');

      if (brandName) {
        this.getCarsByBrandName(brandName);
      } else {
        this.getCarsByDetail();
      }
    });
  }

  getCarsByDetail(): void {
    this.carDetailDtoService.getCarsByDetail().subscribe((response) => {
      this.cars = response.data;
    });
  }

  getCarsByBrandName(brandName: string): void {
    this.carDetailDtoService
      .getCarsByBrandName(brandName)
      .subscribe((response) => {
        this.cars = response.data;
      });
  }

  addToCart(car: CarDetailDto) {
    this.cartService.addToCart(car);
    this.toastr.success(car.carName, 'Sepete Eklendi!');
  }
}
