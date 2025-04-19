import { Component, HostListener, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/models/cartItem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  cartItems: CartItem[];
  isCartOpen = false;

  constructor(
    private cartService: CartService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCartList();
  }

  getCartList(): void {
    this.cartItems = this.cartService.list();
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem);
    this.toastrService.info(cartItem.car.carName, 'Sepetten Çıkartıldı');
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  clearCart() {
    this.cartItems = [];
  }

  buyCart() {
    this.toastrService.success('Satın Alma İşlemi başarılı');
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.cart-container')) {
      this.isCartOpen = false;
    }
  }
}
