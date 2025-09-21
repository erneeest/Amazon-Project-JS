import { cart, removeFromCart, updateCartQuantity, saveFunction, updateFunction} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions } from '../data/deliveryOptions.js';

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
                            
                            Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id} js-update-container-${matchingItem.id}">${cartItem.quantity}</span>
                            <span class="update-quantity-link link-primary js-update-quantity js-update-container-${matchingItem.id}" data-product-id="${matchingItem.id}">
                              Update
                            </span>
                    
                      
                        
                            <input class="quantity-input js-quantity-input js-quantity-input-${matchingItem.id} editing-quantity-container js-editing-quantity-container-${matchingItem.id}" data-product-id="${matchingItem.id}">
                            <span class="save-quantity-link link-primary js-save-quantity-link editing-quantity-container js-editing-quantity-container-${matchingItem.id}" data-product-id="${matchingItem.id}">Save</span>
                        
                     <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingItem.id}">
                       Delete
                     </span>
                   </div>
                 </div>
   
                 <div class="delivery-options">
                   <div class="delivery-options-title">
                     Choose a delivery option:
                   </div>
                   ${deliveryOptionsHTML(matchingItem, cartItem)}
                 </div>
               </div>
             </div>
       `;
    }
});

function deliveryOptionsHTML(matchingItem, cartItem){
  let HTML = '';
  let today = dayjs();
  
  deliveryOptions.forEach(option => {
    let deliveryDate = today.add(option.deliveryDate, 'days');
    let todayFormatted = deliveryDate.format('dddd, MMMM DD');

    let isChecked = option.id === cartItem.deliveryOption;
    let priceString = option.priceCents === 0 ? 'FREE' : `$${formatCurrency(option.priceCents)}`;    

    HTML += `<div class="delivery-option">
              <input type="radio" ${isChecked ? 'checked' : ''}
                class="delivery-option-input"
                name="delivery-option-${matchingItem.id}">
              <div>
                <div class="delivery-option-date">
                  ${todayFormatted}
                </div>
                <div class="delivery-option-price">
                  ${priceString} Shipping
                </div>
              </div>
            </div>`
  });

  return HTML;
}

let checkoutTotalItems = document.querySelector('.js-checkout-total');

let updateCheckoutTotal = () => {
    if(updateCartQuantity() > 0){
      checkoutTotalItems.innerHTML = `${updateCartQuantity()} Items`;
    }else{
      checkoutTotalItems.innerHTML = '';
    }
  }

  updateCheckoutTotal();
//========================================================================================

document.querySelector('.order-summary').innerHTML += cartSummaryHTML;

document.querySelectorAll('.js-delete-link').forEach((deleteLink) => {
    deleteLink.addEventListener('click', () => {
      const { productId } = deleteLink.dataset;

      removeFromCart(productId);
      console.log(cart);

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();
      updateCheckoutTotal();
    });
});
//========================================================================================
let isUpdating = {};
document.querySelectorAll('.js-update-quantity').forEach((updateLink) => {
  updateLink.addEventListener('click', () => {

    const { productId } = updateLink.dataset;
    const inputElement = document.querySelector(`.js-quantity-input-${productId}`);

    if(!isUpdating[productId]){
      
      let matchingItem;
      
      cart.forEach(cartItem => {
        if(cartItem.productId === productId){
          matchingItem = cartItem;
        }
      });

      if(matchingItem){
        goToSaveSection(productId, inputElement);
      }
    }
  });
});

document.querySelectorAll('.js-save-quantity-link').forEach((saveLink) => {
  saveLink.addEventListener('click', () => {

    const { productId } = saveLink.dataset;
    const inputElement = document.querySelector(`.js-quantity-input-${productId}`);

    if(isUpdating[productId]){

      let matchingItem;

      cart.forEach(cartItem => {
        if(cartItem.productId === productId){
          matchingItem = cartItem;
        }
      });

      if(matchingItem){
         goToUpdateSection(productId, inputElement);
      }
    }
  });
});
//==================================================================== iterate through the inputs and addedEventListener 'keydown', event => {if(event.key === 'Enter')};

document.querySelectorAll('.js-quantity-input').forEach(input => {
    input.addEventListener('keydown', event => {
      const { productId } = input.dataset;
      if(event.key === 'Enter'){

        goToUpdateSection(productId, input);
        console.log('Entered', productId, input);
      }
    });
});

//==================================================================== Goes inside when clicking Update/Save
function goToSaveSection(productId, inputElement){
  document.querySelectorAll(`.js-editing-quantity-container-${productId}`).forEach(editingItem => {
          editingItem.classList.add('is-editing-quantity');
        });

        document.querySelectorAll(`.js-update-container-${productId}`).forEach(savedItem => {
          savedItem.classList.add('update-container-off');
        });
        
        updateFunction(productId, inputElement);

        isUpdating[productId] = true;
}

function goToUpdateSection(productId, inputElement){
      document.querySelectorAll(`.js-editing-quantity-container-${productId}`).forEach(editingItem => {
          editingItem.classList.remove('is-editing-quantity');
        });

        document.querySelectorAll(`.js-update-container-${productId}`).forEach(savedItem => {
          savedItem.classList.remove('update-container-off');
        });

        saveFunction(productId, inputElement, updateCheckoutTotal);
  
        isUpdating[productId] = false;
}

const today = dayjs();
const deliveryDate = today.add(7, 'days');
console.log(deliveryDate.format('dddd, MMMM DD'));
console.log(dayjs('2005-01-09').format('MMMM, D YYYY'));

hello();