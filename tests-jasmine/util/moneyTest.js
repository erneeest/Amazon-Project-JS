import formatCurrency from '../../utils/money.js';

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