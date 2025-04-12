import { Component, OnInit } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
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

  constructor(
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCartList();
  }

  getCartList(): void {
    this.cartItems = this.cartService.list();
  }

  removeFromCart(cartItem: CartItem): void {
    this.cartService.removeFromCart(cartItem);
    this.toastr.info(cartItem.car.carName, 'Sepetten Kaldırıldı');
  }

  get totalPrice(): number {
    return this.cartItems.reduce(
      (acc, item) => acc + item.car.dailyPrice * item.quantity,
      0
    );
  }
}
