export let cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2
},
{
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1   
}
];

export function addToCart(productId){
  const productQuantity = document.querySelector(`.js-quantity-selector-${productId}`); 
  let matchingItem;
  
  cart.forEach((cartItem) => {            //checking if the dataset.productName === cart.name
    if(cartItem.productId === productId){
      matchingItem = cartItem;
    }
  });
  
  if(matchingItem){
    matchingItem.quantity += Number(productQuantity.value);
  }else{
    cart.push({
      productId: productId,
      quantity: Number(productQuantity.value)
    });
  }
}