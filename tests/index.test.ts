import {
  getCountry,
  alpha2ToAlpha3,
  CodeLengthMismatchError,
  alpha2ToFullName,
  alpha3ToAlpha2,
  alpha3ToFullName,
  fullNameToAlpha2,
  fullNameToAlpha3,
} from '../src';

describe('Test country functions', () => {
  const indianObject = {
    alpha2: 'IN',
    fullName: 'India',
    alpha3: 'IND',
    numericCode: '356',
  };
  describe('Test getCountry', () => {
    it('Works with alpha-2 values', () => {
      const india = getCountry('IN');
      expect(india).toMatchObject(indianObject);
    });

    it('Works with alpha-3 values', () => {
      const india = getCountry('IND');
      expect(india).toMatchObject(indianObject);
    });

    it('Works with full name', () => {
      const india = getCountry('India');
      expect(india).toMatchObject(indianObject);
    });

    it('Returns undefined on a miss', () => {
      const returnVal = getCountry('IndiaNot');
      expect(returnVal).toBeUndefined();
    });
  });

  describe('Test alpha2ToAlpha3', () => {
    it('Throws an error if input is not of length 2', () => {
      expect(() => alpha2ToAlpha3('AUS')).toThrowError(CodeLengthMismatchError);
    });

    it('Correctly returns alpha3 values', () => {
      expect(alpha2ToAlpha3('IN')).toBe(indianObject.alpha3);
    });

    it('Returns undefined on a miss', () => {
      expect(alpha2ToAlpha3('XX')).toBeUndefined();
    });
  });

  describe('Test alpha2ToFullName', () => {
    it('Throws an error if input is not of length 2', () => {
      expect(() => alpha2ToFullName('AUS')).toThrowError(CodeLengthMismatchError);
    });

    it('Correctly returns full name', () => {
      expect(alpha2ToFullName('IN')).toBe(indianObject.fullName);
    });

    it('Returns undefined on a miss', () => {
      expect(alpha2ToFullName('XX')).toBeUndefined();
    });
  });

  describe('Test alpha3ToAlpha2', () => {
    it('Throws an error if input is not of length 3', () => {
      expect(() => alpha3ToAlpha2('AU')).toThrowError(CodeLengthMismatchError);
    });

    it('Correctly returns alpha2 values', () => {
      expect(alpha3ToAlpha2('IND')).toBe(indianObject.alpha2);
    });

    it('Returns undefined on a miss', () => {
      expect(alpha3ToAlpha2('XXX')).toBeUndefined();
    });
  });

  describe('Test alpha3ToFullName', () => {
    it('Throws an error if input is not of length 3', () => {
      expect(() => alpha3ToFullName('AU')).toThrowError(CodeLengthMismatchError);
    });

    it('Correctly returns full name', () => {
      expect(alpha3ToFullName('IND')).toBe(indianObject.fullName);
    });

    it('Returns undefined on a miss', () => {
      expect(alpha3ToFullName('XXX')).toBeUndefined();
    });
  });

  describe('Test fullNameToAlpha2', () => {
    it('Throws an error if input is <= length 3', () => {
      expect(() => fullNameToAlpha2('AUS')).toThrowError(CodeLengthMismatchError);
      expect(() => fullNameToAlpha2('AU')).toThrowError(CodeLengthMismatchError);
      expect(() => fullNameToAlpha2('A')).toThrowError(CodeLengthMismatchError);
    });

    it('Correctly returns alpha2 values', () => {
      expect(fullNameToAlpha2('India')).toBe(indianObject.alpha2);
    });

    it('Returns undefined on a miss', () => {
      expect(fullNameToAlpha2('Indian')).toBeUndefined();
    });
  });

  describe('Test fullNameToAlpha3', () => {
    it('Throws an error if input is <= length 3', () => {
      expect(() => fullNameToAlpha3('AUS')).toThrowError(CodeLengthMismatchError);
      expect(() => fullNameToAlpha3('AU')).toThrowError(CodeLengthMismatchError);
      expect(() => fullNameToAlpha3('A')).toThrowError(CodeLengthMismatchError);
    });

    it('Correctly returns alpha3 values', () => {
      expect(fullNameToAlpha3('India')).toBe(indianObject.alpha3);
    });

    it('Returns undefined on a miss', () => {
      expect(fullNameToAlpha3('Indian')).toBeUndefined();
    });
  });
});
