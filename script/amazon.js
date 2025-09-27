import { addToCart, updateCartQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
// import '../data/cart-oop.js';

document.querySelector('.js-cart-quantity').innerHTML = updateCartQuantity();

let productsHTML = ``;

products.forEach(product => {
    productsHTML += `
            <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `
    // productsHTML += html;
});

let productsGridElement = document.querySelector('.js-products-grid');
productsGridElement.innerHTML = productsHTML;

homepageCartTotal();
//Array of buttons                                     //forEach
document.querySelectorAll('.js-add-to-cart-button').forEach(addToCartButton=> {
  addToCartButton.addEventListener('click', () => {
    const { productId } = addToCartButton.dataset; // data-product-id  ..... dataset.productId

    addToCart(productId);
    homepageCartTotal();
    displayAddedFunction(productId);
    
    
  });
});



const addedMessageTimeout = {}
function displayAddedFunction(productId){
    document.querySelector(`.js-added-to-cart-${productId}`).classList.add('added-to-cart-visible');

      // Check if there's a previous timeout for this
      // product. If there is, we should stop it.
      const previousTimeoutId = addedMessageTimeout[productId];
      if (previousTimeoutId){
        clearTimeout(previousTimeoutId);
      }

      const timeoutId = setTimeout(() => {
        document.querySelector(`.js-added-to-cart-${productId}`).classList.remove('added-to-cart-visible');
      }, 2000);


      // Save the timeoutId for this product
      // so we can stop it later if we need to
      addedMessageTimeout[productId] = timeoutId;
}

function homepageCartTotal(){
  const jsCartQuantityElement = document.querySelector('.js-cart-quantity');
  if(updateCartQuantity()>0){
      jsCartQuantityElement.innerHTML = updateCartQuantity();
    }else{
      jsCartQuantityElement.innerHTML = '';
    }
}