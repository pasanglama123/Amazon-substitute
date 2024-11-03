import {cart,removeFromCart,updateDeliveryOption} from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; 

import {deliveryOptions} from '../../data/deliveryOptions.js';

import { renderPaymentSummary } from './paymentSummary.js';
 
// hello(); 

// const today = dayjs();
// console.log(dayjs());

// const deliveryDate = today.add(7, 'days');
// console.log(deliveryDate);

// console.log(deliveryDate.format('dddd, MMMM D'));


export function renderOrderSummary() {
  let cartSummeryHTML = '';
  cart.forEach((cartItem) => {
      const productId = cartItem.productId;

      let matchingItem = getProduct(productId);

    //   products.forEach((product)=>{
    //       if (product.id === productId){
    //           matchingItem = product;
    //       }
    //   });

      const deliveryOptionId = cartItem.deliveryOptionId;

      let deliveryOption;

      deliveryOptions.forEach((option)=>{
          if (option.id === deliveryOptionId) {
              deliveryOption = option;
          }
      });

      const today = dayjs();
          
          const deliveryDay = today.add(deliveryOptions.deliveryDays, 'days');
          
          const formDate = deliveryDay.format('dddd, MMMM D');

    cartSummeryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
          <div class="delivery-date">
              Delivery date: ${formDate}
          </div>

          <div class="cart-item-details-grid">
              <img class="product-image"
              src="${matchingItem.image}">

              <div class="cart-item-details">
              <div class="product-name">
                  ${matchingItem.name}
              </div>
              <div class="product-price">
                  $${formatCurrency(matchingItem.priceCents)}
              </div>
              <div class="product-quantity">
                  <span>
                  Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                  Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id= "${matchingItem.id}">
                  Delete
                  </span>
              </div>
              </div>

              <div class="delivery-options">
              <div class="delivery-options-title">
                  Choose a delivery option:
              </div>
              ${deliveryOptionHTML(matchingItem,cartItem)}
              </div>
          </div>
      </div>
  `;
  });



  function deliveryOptionHTML (matchingItem,cartItem) {
      let html = '';

      deliveryOptions.forEach((deliveryOption) => {
          
          const today = dayjs();
          
          const deliveryDay = today.add(deliveryOption.deliveryDays, 'days');
          
          const formDate = deliveryDay.format('dddd, MMMM D');
          
          const priceString = deliveryOption.priceCents === 0 
          ? 'FREE'
          : `${formatCurrency(deliveryOption.priceCents)} - `
          const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

          html += `
          <div class="delivery-option js-delivery-option"
            data-product-id="${matchingItem.id}"
            data-delivery-option-id="${deliveryOption.id}">
            <input type="radio"
              ${isChecked ? 'checked' : ''}
              class="delivery-option-input"
              name="delivery-option-${matchingItem.id}">
            <div>
              <div class="delivery-option-date">
                ${formDate}
              </div>
              <div class="delivery-option-price">
                ${priceString} Shipping
              </div>
            </div>
          </div>
        `
      });
      return html; 
  }

  document.querySelector('.js-order-summary')
  .innerHTML = cartSummeryHTML;

  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click',()=>{
          const productId = link.dataset.productId;
          removeFromCart(productId);
          
          const container = document.querySelector(`.js-cart-item-container-${productId}`);
          
          container.remove(); // this remove the DOM from the  page
          
          renderPaymentSummary 
      });
  });
  document.querySelectorAll('.js-delivery-option')
      .forEach((element) => {
        element.addEventListener('click', () => {
          const {productId, deliveryOptionId} = element.dataset;
          updateDeliveryOption(productId, deliveryOptionId);
          renderOrderSummary();
          renderPaymentSummary();
      
  });
  });
}

renderOrderSummary();