import { getProduct } from "../../data/products.js";
import { cart } from "../../data/cart.js";

export function renderPaymentSummary () {
    let productPriceCents = 0;

    cart.forEach((cartItem)=>{
    const product = getProduct(cartItem.productId);

    productPriceCents += product.priceCents * cartItem.quantity;
  });
  console.log(productPriceCents);
console.log('hello');
}