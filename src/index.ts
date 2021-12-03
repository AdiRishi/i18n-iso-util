import countryData, { CountryData } from './iso-3166-1';

export function getCountry(country: string) {
  let searchKey: keyof CountryData;
  if (country.length === 3) {
    searchKey = 'alpha3';
  } else if (country.length === 2) {
    searchKey = 'alpha2';
  } else {
    searchKey = 'shortNameLowerCase';
  }

  for (const data of countryData) {
    if (data[searchKey] === country) {
      return data;
    }
  }
  return undefined;
}
