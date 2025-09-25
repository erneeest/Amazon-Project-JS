import { updateCartQuantity } from "../../data/cart.js";

export function renderCheckoutHeader(){
    const cartQuantity = updateCartQuantity();
    const HTML = `
        <div class="checkout-header-left-section">
          <a href="amazon.html">
            <img class="amazon-logo" src="images/amazon-logo.png">
            <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
          </a>
        </div>

        <div class="checkout-header-middle-section">
          Checkout (<a class="return-to-home-link"
            href="amazon.html">${cartQuantity}</a>)
        </div>

        <div class="checkout-header-right-section">
          <img src="images/icons/checkout-lock-icon.png">
        </div>`;

        document.querySelector('.js-header-content').innerHTML = HTML;
      }
      
      
// export function updateTotal(){
//   let checkoutTotalItems = document.querySelector('.js-checkout-total');
//   if(updateCartQuantity() > 0){
//     checkoutTotalItems.innerHTML = `${updateCartQuantity()} Items`;
//   }else{
//     checkoutTotalItems.innerHTML = '';
//   }
// }
