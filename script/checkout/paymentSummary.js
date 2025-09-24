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



    console.log(`$${formatCurrency(totalItemsPriceCents)}`);
    console.log(`$${formatCurrency(shippingAndHandlingPriceCents)}`);
    console.log(`$${formatCurrency(totalBeforeTaxCents)}`);
    console.log(`$${formatCurrency(taxCents)}`);
    console.log(`$${formatCurrency(totalCents)}`);



}