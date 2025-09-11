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
            $${(product.priceCents / 100).toFixed(2)}
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


/* We're going to use an object to save the time ids.
The reason we use an object is because each product 
will have its own timeoutId. So and object lets us
save multiple timout ids for different products. 
For example:

{
  'product-id1': 2,
  'product-id2': 5,
  ...
}
  (2 and 5 are ids that are returned when we callsetTimeout)

*/

const addedMessageTimeout = {}

//Array of buttons                                     //forEach
document.querySelectorAll('.js-add-to-cart-button').forEach(addToCartButton=> {
    addToCartButton.addEventListener('click', () => {
      const { productId } = addToCartButton.dataset; // data-product-id  ..... dataset.productId
      const productQuantity = document.querySelector(`.js-quantity-selector-${productId}`); 
      let matchingItem;

      cart.forEach((cartProduct) => {            //checking if the dataset.productName === cart.name
        if(cartProduct.id === productId){
          matchingItem = cartProduct;
        }
      });
      
      if(matchingItem){
        matchingItem.quantity += Number(productQuantity.value);
      }else{
        cart.push({
        id: productId,
        quantity: Number(productQuantity.value)
        });
      }

      let cartQuantity = 0;
      cart.forEach((cartProduct) => {
        cartQuantity += cartProduct.quantity;
      });
      
      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

      console.log(cart);
      
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
      
    });
});