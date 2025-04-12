import { Injectable } from '@angular/core';
import { CarDetailDto } from '../models/car-detail-dto';
import { CartItem } from '../models/cartItem';
import { CartItems } from '../models/cartItems';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = [];

  constructor() {}

  addToCart(car: CarDetailDto) {
    let item = this.cartItems.find(
      (c) =>
        c.car.carName === car.carName &&
        c.car.brandName === car.brandName &&
        c.car.colorName === car.colorName &&
        c.car.dailyPrice === car.dailyPrice
    );
    if (item) {
      item.quantity += 1;
    } else {
      let cartItem: CartItem = new CartItem();
      cartItem.car = car;
      cartItem.quantity = 1;
      this.cartItems.push(cartItem);
    }
  }

  list(): CartItem[] {
    return this.cartItems;
  }

  removeFromCart(cartItem: CartItem) {
    let index = this.cartItems.indexOf(cartItem);
    this.cartItems.splice(index, 1);
  }
}
