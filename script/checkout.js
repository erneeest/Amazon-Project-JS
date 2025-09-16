import { cart, removeFromCart, updateCartQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';


let cartSummaryHTML = '';

cart.forEach(cartItem => {
    const productId = cartItem.productId;

    let matchingItem;
    products.forEach(productItem => {
        if(productItem.id === productId){
            matchingItem = productItem;
        }
    });

    if(matchingItem){
        cartSummaryHTML += `<div class="cart-item-container js-cart-item-container-${matchingItem.id}">
               <div class="delivery-date">
                 Delivery date: Tuesday, June 21
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
                        <div class="update-container">
                            <span>
                              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                            </span>
                            <span class="update-quantity-link link-primary js-update-quantity">
                              Update
                            </span>
                        </div>
                        <div class="editing-quantity-container">
                            <input class="quantity-input">
                            <span class="save-quantity-link link-primary js-save-quantity-link">Save</span>
                        </div>
                     <span class="delete-quantity-link link-primary js-delete-link" data-link-id="${matchingItem.id}">
                       Delete
                     </span>
                   </div>
                 </div>
   
                 <div class="delivery-options">
                   <div class="delivery-options-title">
                     Choose a delivery option:
                   </div>
                   <div class="delivery-option">
                     <input type="radio" checked
                       class="delivery-option-input"
                       name="delivery-option-${matchingItem.id}">
                     <div>
                       <div class="delivery-option-date">
                         Tuesday, June 21
                       </div>
                       <div class="delivery-option-price">
                         FREE Shipping
                       </div>
                     </div>
                   </div>
                   <div class="delivery-option">
                     <input type="radio"
                       class="delivery-option-input"
                       name="delivery-option-${matchingItem.id}">
                     <div>
                       <div class="delivery-option-date">
                         Wednesday, June 15
                       </div>
                       <div class="delivery-option-price">
                         $4.99 - Shipping
                       </div>
                     </div>
                   </div>
                   <div class="delivery-option">
                     <input type="radio"
                       class="delivery-option-input"
                       name="delivery-option-${matchingItem.id}">
                     <div>
                       <div class="delivery-option-date">
                         Monday, June 13
                       </div>
                       <div class="delivery-option-price">
                         $9.99 - Shipping
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
       `;
    }
});

document.querySelector('.order-summary').innerHTML += cartSummaryHTML;

document.querySelectorAll('.js-delete-link').forEach((deleteLink) => {
    deleteLink.addEventListener('click', () => {
      const productId = deleteLink.dataset.linkId;

      removeFromCart(productId);
      console.log(cart);

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();
      updateCheckoutTotal();
    });
});

let checkoutTotalItems = document.querySelector('.js-checkout-total');
updateCheckoutTotal();

function updateCheckoutTotal(){
    if(updateCartQuantity() > 0){
      checkoutTotalItems.innerHTML = `${updateCartQuantity()} Items`;
    }else{
      checkoutTotalItems.innerHTML = '';
    }
  }
  
let isUpdating = false;
document.querySelectorAll('.js-update-quantity').forEach((updateLink) => {
  updateLink.addEventListener('click', () => {
    if(!isUpdating){
      document.querySelector('.editing-quantity-container').classList.add('is-editing-quantity');
      document.querySelector('.update-container').classList.add('update-container-off');
      isUpdating = !isUpdating;
    }
  });
});

document.querySelectorAll('.js-save-quantity-link').forEach((saveLink) => {
  saveLink.addEventListener('click', () => {

    if(isUpdating){
      document.querySelector('.editing-quantity-container').classList.remove('is-editing-quantity');
      document.querySelector('.update-container').classList.remove('update-container-off');
      // document.querySelector('.js-update-quantity').classList.remove('is-editing-quantity');

      isUpdating = !isUpdating;
    }
  });
});