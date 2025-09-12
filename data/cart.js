export let cart = [];

export function addToCart(productId){
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
}