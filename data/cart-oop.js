


  // import { addToCart } from "./cart";

function Cart(localStorageKey){
  const cart = {
    cartItem: undefined,
  
    loadFromStorage(){
    this.cartItem = JSON.parse(localStorage.getItem('cart-oop'));
  
      if(!this.cartItem){
          this.cartItem = [{
              productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                deliveryOptions: '1'
            },
            {
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                deliveryOptions: '3'
            }
          ];
        };
  },
  
    saveToStorage(){
    localStorage.setItem(localStorageKey, JSON.stringify(this.cartItem));
  },
    
    addToCart(productId){
      const productQuantity = document.querySelector(`.js-quantity-selector-${productId}`); 
      let matchingItem;
      
      this.cartItem.forEach((cartItem) => {            //checking if the dataset.productName === cart.name
        if(cartItem.productId === productId){
          matchingItem = cartItem;
        }
      });
      
          if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      cart.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }
      this.saveToStorage();
    },
  
    removeFromCart(productId){
      let newCart = [];
  
      this.cartItem.forEach((cartItem)=>{
        if(cartItem.productId !== productId){
          newCart.push(cartItem);
        }
      });
  
      this.cartItem = newCart;
      this.saveToStorage();
    },
  
   updateCartQuantity(){
    let cartQuantity = 0;
    this.cartItem.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    console.log(this.cartItem);
    
    return cartQuantity;
  },
  
    updateFunction(productId, inputElement){
          this.cartItem.forEach(cartItem => {
            if(cartItem.productId === productId){
              inputElement.value = cartItem.quantity;
            }
          });
          this.saveToStorage();
  },
  
    saveFunction(productId, inputElement){
          this.cartItem.forEach(cartItem => {
            if(cartItem.productId === productId){
              cartItem.quantity = Number(inputElement.value);
              document.querySelector(`.js-quantity-label-${productId}`).innerHTML = cartItem.quantity;
            }
          });
            this.saveToStorage();
  },
  
    changeDeliveryOption(productId, deliveryOption){
    let matchingItem;
    this.cartItem.forEach(cartItem => {
      if(cartItem.productId === productId){
        matchingItem = cartItem;
      }
    });
  
    matchingItem.deliveryOptions = deliveryOption;
  
    this.saveToStorage();
  }
  
  };
  return cart;
}
const cart = Cart();




cart.loadFromStorage('localStorageKey');

cart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
console.log(cart);











