import countryData, { CountryData } from './iso-3166-1';

class CodeLengthMismatchError extends Error {
  code: string;

  constructor(message?: string) {
    super(message);
    this.code = 'CODE_LENGTH_MISMATCH';
  }
}

function searchKeyInData(key: keyof CountryData, value: string) {
  for (const data of countryData) {
    if (data[key] === value) {
      return data;
    }
  }
  return undefined;
}

export function getCountry(country: string) {
  let searchKey: keyof CountryData;
  if (country.length === 3) {
    searchKey = 'alpha3';
  } else if (country.length === 2) {
    searchKey = 'alpha2';
  } else {
    searchKey = 'shortNameLowerCase';
  }

  return searchKeyInData(searchKey, country);
}

export function alpha2ToAlpha3(alpha2Code: string) {
  if (alpha2Code.length !== 2) {
    throw new CodeLengthMismatchError();
  }
  const countryData = searchKeyInData('alpha2', alpha2Code);
  if (!countryData) {
    return undefined;
  }

  return countryData.alpha3;
}

export function alpha2ToFullName(alpha2Code: string) {
  if (alpha2Code.length !== 2) {
    throw new CodeLengthMismatchError();
  }
  const countryData = searchKeyInData('alpha2', alpha2Code);
  if (!countryData) {
    return undefined;
  }

  return countryData.shortNameLowerCase;
}

export function alpha3ToAlpha2(alpha3Code: string) {
  if (alpha3Code.length !== 3) {
    throw new CodeLengthMismatchError();
  }
  const countryData = searchKeyInData('alpha3', alpha3Code);
  if (!countryData) {
    return undefined;
  }

  return countryData.alpha2;
}

export function alpha3ToFullName(alpha3Code: string) {
  if (alpha3Code.length !== 3) {
    throw new CodeLengthMismatchError();
  }
  const countryData = searchKeyInData('alpha3', alpha3Code);
  if (!countryData) {
    return undefined;
  }

  return countryData.fullName;
}

export function fullNameToAlpha3(fullName: string) {
  if (fullName.length <= 3) {
    throw new CodeLengthMismatchError();
  }
  const countryData = searchKeyInData('shortNameLowerCase', fullName);
  if (!countryData) {
    return undefined;
  }

  return countryData.alpha3;
}

export function fullNameToAlpha2(fullName: string) {
  if (fullName.length <= 3) {
    throw new CodeLengthMismatchError();
  }
  const countryData = searchKeyInData('shortNameLowerCase', fullName);
  if (!countryData) {
    return undefined;
  }

  return countryData.alpha2;
}
