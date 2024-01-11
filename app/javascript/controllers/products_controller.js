import { Controller } from '@hotwired/stimulus';

// Connects to data-controller="products"
export default class extends Controller {
  static values = { size: String, product: Object };

  addToCart() {
    // get cart from local storage
    const cart = localStorage.getItem('cart');
    if (cart) {
      // if cart exist in storage
      const cartArray = JSON.parse(cart);
      // check the id and size of product
      const foundIndex = cartArray.findIndex(
        (item) =>
          item.id === this.productValue.id && item.size === this.sizeValue
      );
      if (foundIndex >= 0) {
        // if found increment it
        cartArray[foundIndex].quantity =
          parseInt(cartArray[foundIndex].quantity) + 1;
      } else {
        // if not found add new product to cart
        cartArray.push({
          id: this.productValue.id,
          name: this.productValue.name,
          price: this.productValue.price,
          size: this.sizeValue,
          quantity: 1,
        });
      }
      localStorage.setItem('cart', JSON.stringify(cartArray));
    } else {
      // when product does not exist in cart - local storage. add new product
      const cartArray = [];
      cartArray.push({
        id: this.productValue.id,
        name: this.productValue.name,
        price: this.productValue.price,
        size: this.sizeValue,
        quantity: 1,
      });
      localStorage.setItem('cart', JSON.stringify(cartArray));
    }
  }

  selectSize(e) {
    this.sizeValue = e.target.value;
    const selectedSizeEl = document.getElementById('selected-size');
    selectedSizeEl.innerHTML = `Selected Size: ${this.sizeValue}`;
  }
}
