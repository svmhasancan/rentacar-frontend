import { Component, OnInit } from '@angular/core';
import { CarDetailDto } from 'src/app/models/car-detail-dto';
import { CartItem } from 'src/app/models/cartItem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css'],
})
export class CartSummaryComponent implements OnInit {
  cartItems: CartItem[];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCartList();
  }

  addToCart(car: CarDetailDto): void {
    this.cartService.addToCart(car);
    console.log('cart-summary addToCart');
  }

  getCartList(): void {
    this.cartService.list();
    console.log('cart-summary list');
  }
}
