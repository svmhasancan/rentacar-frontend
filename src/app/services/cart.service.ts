import { Injectable } from '@angular/core';
import { CarDetailDto } from '../models/car-detail-dto';
import { CartItems } from '../models/cartItems';
import { CartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  addToCart(car: CarDetailDto) {
    let item = CartItems.find(
      (c) =>
        c.car.carName === car.carName ||
        car.brandName === car.brandName ||
        car.colorName === car.colorName ||
        car.dailyPrice === car.dailyPrice
    );

    if (item) {
      item.quantity += 1;
    } else {
      let cartItem = new CartItem();
      cartItem.car = car;
      cartItem.quantity = 1;
      CartItems.push(cartItem);
    }
  }

  list(): CartItem[] {
    return CartItems;
  }

  removeFromCart(car: CarDetailDto) {}
}
