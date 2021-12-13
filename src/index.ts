import countryData, { RawCountryData } from './iso-3166-1.data';

export class CodeLengthMismatchError extends Error {
  code: string;

  constructor(message?: string) {
    super(message);
    this.code = 'CODE_LENGTH_MISMATCH';
  }
}

export type CountryData = {
  alpha2: string;
  alpha3: string;
  fullName: string;
  numericCode: string;
};

function _searchKeyInData(key: keyof RawCountryData, value: string): RawCountryData | undefined {
  for (const data of countryData) {
    if (data[key] === value) {
      return data;
    }
  }
  return undefined;
}

function _convertRawCountryData(rawData?: RawCountryData): CountryData | undefined {
  if (rawData) {
    return {
      alpha2: rawData.alpha2,
      alpha3: rawData.alpha3,
      fullName: rawData.shortNameLowerCase,
      numericCode: rawData.numericCode,
    };
  }
  return undefined;
}

export function getCountry(country: string): CountryData | undefined {
  let searchKey: keyof RawCountryData;
  if (country.length === 3) {
    searchKey = 'alpha3';
  } else if (country.length === 2) {
    searchKey = 'alpha2';
  } else {
    searchKey = 'shortNameLowerCase';
  }

  return _convertRawCountryData(_searchKeyInData(searchKey, country));
}

export function alpha2ToAlpha3(alpha2Code: string) {
  if (alpha2Code.length !== 2) {
    throw new CodeLengthMismatchError();
  }
  const countryData = _searchKeyInData('alpha2', alpha2Code);
  if (!countryData) {
    return undefined;
  }

  return countryData.alpha3;
}

export function alpha2ToFullName(alpha2Code: string) {
  if (alpha2Code.length !== 2) {
    throw new CodeLengthMismatchError();
  }
  const countryData = _searchKeyInData('alpha2', alpha2Code);
  if (!countryData) {
    return undefined;
  }

  return countryData.shortNameLowerCase;
}

export function alpha3ToAlpha2(alpha3Code: string) {
  if (alpha3Code.length !== 3) {
    throw new CodeLengthMismatchError();
  }
  const countryData = _searchKeyInData('alpha3', alpha3Code);
  if (!countryData) {
    return undefined;
  }

  return countryData.alpha2;
}

export function alpha3ToFullName(alpha3Code: string) {
  if (alpha3Code.length !== 3) {
    throw new CodeLengthMismatchError();
  }
  const countryData = _searchKeyInData('alpha3', alpha3Code);
  if (!countryData) {
    return undefined;
  }

  return countryData.shortNameLowerCase;
}

export function fullNameToAlpha2(fullName: string) {
  if (fullName.length <= 3) {
    throw new CodeLengthMismatchError();
  }
  const countryData = _searchKeyInData('shortNameLowerCase', fullName);
  if (!countryData) {
    return undefined;
  }

  return countryData.alpha2;
}

export function fullNameToAlpha3(fullName: string) {
  if (fullName.length <= 3) {
    throw new CodeLengthMismatchError();
  }
  const countryData = _searchKeyInData('shortNameLowerCase', fullName);
  if (!countryData) {
    return undefined;
  }

  return countryData.alpha3;
}
