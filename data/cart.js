export let cart;


loadFromStorage();

export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart'));

    if(!cart){
        cart = [{
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
}

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId){
  const productQuantity = document.querySelector(`.js-quantity-selector-${productId}`); 
  let matchingItem;
  
  cart.forEach((cartItem) => {            //checking if the dataset.productName === cart.name
    if(cartItem.productId === productId){
      matchingItem = cartItem;
    }
  });
  
  if(!matchingItem){
    cart.push({
      productId: productId,
      quantity: Number(productQuantity.value),
      deliveryOptions: '1'
    });
  }else{
    matchingItem.quantity += Number(productQuantity.value);
  }
  saveToStorage();
}

export function removeFromCart(productId){
  let newCart = [];

  cart.forEach((cartItem)=>{
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage();
}

export function updateCartQuantity(){
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  console.log(cart);
  
  return cartQuantity;
}


export function updateFunction(productId, inputElement){
        cart.forEach(cartItem => {
          if(cartItem.productId === productId){
            inputElement.value = cartItem.quantity;
          }
        });
          saveToStorage();
}

export function saveFunction(productId, inputElement){
        cart.forEach(cartItem => {
          if(cartItem.productId === productId){
            cartItem.quantity = Number(inputElement.value);
            document.querySelector(`.js-quantity-label-${productId}`).innerHTML = cartItem.quantity;
          }
        });
          saveToStorage();
}

export function changeDeliveryOption(productId, deliveryOption){
  let matchingItem;
  cart.forEach(cartItem => {
    if(cartItem.productId === productId){
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptions = deliveryOption;

  saveToStorage();
}