import { cart } from "../../data/cart.js";
import { getDeliveryOptions } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import formatCurrency from "../utils/money.js";

export function renderPaymentSummary(){

    let totalItemsPriceCents = 0;
    let shippingAndHandlingPriceCents = 0;
    
    cart.forEach(cartItem => {
        const { productId } = cartItem;
        const { deliveryOptions } = cartItem;
        totalItemsPriceCents += getProduct(productId).priceCents * cartItem.quantity;        
        shippingAndHandlingPriceCents += getDeliveryOptions(deliveryOptions).priceCents;
    });
    
    const totalBeforeTaxCents = totalItemsPriceCents + shippingAndHandlingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1; // 10% tax

    const totalCents = taxCents + totalBeforeTaxCents;

    const paymentSummaryHTML = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(totalItemsPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingAndHandlingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}