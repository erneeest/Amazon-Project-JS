//Delivery options for each of the cart item (Added this in codespace just to understand how changing the code in pull request works)

export function getDeliveryOptions(deliveryOptionId){
    let deliveryOption;
              deliveryOptions.forEach(option => {
                if(option.id === deliveryOptionId){
                  deliveryOption = option;
                }
              });
    return deliveryOption || deliveryOptions[0];
}

export function getAvailableDeliveryOptions(date){
  switch(date.format('dddd')){
    case 'Saturday': date.add(2, 'd')
      break;
    case 'Sunday': date.add(1, 'd')
      break;
  }
  return date;
}

export let deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
},{
    id: '2',
    deliveryDays: 3,
    priceCents: 499
},{
    id: '3',
    deliveryDays: 0,
    priceCents: 999
}];