import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];

  currentBrand: Brand;

  constructor(
    private brandService: BrandService,
    private router:Router) {}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(): void {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  setCurrentBrand(brand: Brand): void {
    this.currentBrand = { id: brand.id, name: brand.name };
    this.routeToBrandCars();
  }

  routeToBrandCars(): void {
    this.router.navigate(['cars/brand/',this.currentBrand.id])
  }

  setClassNameOfCurrentBrand(brand : Brand) : string {
    
    if(this.currentBrand && brand.id === this.currentBrand.id){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }
}
