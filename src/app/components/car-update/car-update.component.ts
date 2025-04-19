import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: [],
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm: FormGroup;
  carId: number;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.carUpdateForm = this.formBuilder.group({
      carName: ['', Validators.required],
      brandName: ['', Validators.required],
      modelYear: ['', Validators.required],
      colorName: ['', Validators.required],
      dailyPrice: ['', [Validators.required, Validators.min(0)]],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.carId = Number(this.route.snapshot.paramMap.get('id')); // Get car ID from route
    this.loadCarData();
  }

  loadCarData() {
    this.carService.getCarById(this.carId).subscribe((car) => {
      this.carUpdateForm.patchValue({
        carName: car.carName,
        brandName: car.brandName,
        modelYear: car.modelYear,
        colorName: car.colorName,
        dailyPrice: car.dailyPrice,
        description: car.description,
      });
    });
  }

  updateCar() {
    if (this.carUpdateForm.invalid) {
      return;
    }

    const updatedCar = this.carUpdateForm.value;
    this.carService.updateCar(this.carId, updatedCar).subscribe(() => {
      alert('Araç başarıyla güncellendi!');
      this.router.navigate(['/cars']); // Navigate back to car list
    });
  }
}
