import { getCountry } from './index';

describe('Test country functions', () => {
  describe('Test getCountry', () => {
    it('Works with alpha-2 values', () => {
      const india = getCountry('IN');
      expect(india).toMatchObject({
        alpha2: 'IN',
        alpha3: 'IND',
      });
    });
  });
});
