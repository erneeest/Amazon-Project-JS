import { addToCart, cart, loadFromStorage } from '../../data/cart.js';

describe('test suite: addToCart', () => {
    it('adds an existing product to the cart', () => {

    });

    it('add new product to the cart', () => {
        // spyOn(localStorage, 'getItem').and.callFake(() => {
        //     return JSON.stringify([]);
        // });
        // console.log(localStorage.getItem('cart'));
        // loadFromStorage();  
        
        // addToCart('id1');
        // expect(cart.length).toEqual(1);
    });
});


// import formatCurrency from '../../utils/money.js';

// describe('test suite: format currency', () => {
//     it('converts cents into dollars', () => {
//         expect(formatCurrency(2095)).toEqual('20.95');
//     });
//     it('works with 0', () => {
//         expect(formatCurrency(0)).toEqual('0.00');
//     });
//     it('rounding up to nearest cents', () => {
//         expect(formatCurrency(2000.4)).toEqual('20.00');
//     });
// });