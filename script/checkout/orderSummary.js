import { cart, removeFromCart, updateCartQuantity, saveFunction, updateFunction, changeDeliveryOption} from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions, getDeliveryOptions } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';


export function renderOrderSummary(){
  let cartSummaryHTML = '';


  cart.forEach(cartItem => {
      const { productId } = cartItem;

      const matchingItem = getProduct(productId);
  
      if(matchingItem){

          const deliveryOptionId = cartItem.deliveryOptions;
          let deliveryOption = getDeliveryOptions(deliveryOptionId);

          const today = dayjs();
          const deliveryDatee = today.add(deliveryOption.deliveryDays, 'days'); 
          const deliveryDateeFormatted = deliveryDatee.format('dddd, MMMM D');

          cartSummaryHTML += `<div class="cart-item-container js-cart-item-container-${matchingItem.id}">
                <div class="delivery-date">
                  Delivery date: ${deliveryDateeFormatted}
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

    deliveryOptions.forEach(deliveryOption => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');
      
      const priceString = deliveryOption.priceCents === 0 ? 'FREE': `$${formatCurrency(deliveryOption.priceCents)}`; 

      const isChecked = deliveryOption.id === cartItem.deliveryOptions;

      HTML += `<div class="delivery-option js-delivery-option" data-product-id="${matchingItem.id}" data-delivery-option-id="${deliveryOption.id}">
                  <input type="radio" ${isChecked ? 'checked' : ''} 
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                        <div class="delivery-option-date">
                          ${dateString}
                        </div>

                        <div class="delivery-option-price">
                          ${priceString} - Shipping
                        </div>
                  </div>
                </div>
                
        `;

    });
    return HTML;
  }
//========================================================================================== Total Items
  let checkoutTotalItems = document.querySelector('.js-checkout-total');

  function updateTotal(){
    if(updateCartQuantity() > 0){
      checkoutTotalItems.innerHTML = `${updateCartQuantity()} Items`;
    }else{
      checkoutTotalItems.innerHTML = '';
    }
  }

    updateTotal();
  //========================================================================================

  document.querySelector('.order-summary').innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link').forEach((deleteLink) => {
      deleteLink.addEventListener('click', () => {
        const { productId } = deleteLink.dataset;

        removeFromCart(productId);
        console.log(cart);

        // const container = document.querySelector(`.js-cart-item-container-${productId}`);
        // container.remove();
        
        updateTotal();
        renderOrderSummary();
        renderPaymentSummary();
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
          renderPaymentSummary();
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
          renderPaymentSummary();
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

          saveFunction(productId, inputElement, updateTotal);
    
          isUpdating[productId] = false;
  }

  const today = dayjs();
  const deliveryDate = today.add(7, 'days');
  console.log(deliveryDate.format('dddd, MMMM DD'));
  console.log(dayjs('2005-01-09').format('MMMM, D YYYY'));

  hello();

  document.querySelectorAll('.js-delivery-option').forEach(element => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset;    
      changeDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}