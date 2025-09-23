import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import formatCurrency from "../utils/money.js";

export function renderPaymentSummary(){

    let priceCents = 0;

    cart.forEach(cartItem => {
        const { productId } = cartItem;
        priceCents += getProduct(productId).priceCents * cartItem.quantity;        
    });
    
    console.log(`$${formatCurrency(priceCents)}`);
}