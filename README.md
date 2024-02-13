# i18n-iso-util

> A utility library for ISO-3166 codes

[![npm version](https://img.shields.io/npm/v/i18n-iso-util?style=flat-square)](https://www.npmjs.com/package/i18n-iso-util)
[![npm monthly downloads](https://img.shields.io/npm/dw/i18n-iso-util)](https://www.npmjs.com/package/i18n-iso-util)
[![license](https://img.shields.io/npm/l/i18n-iso-util)](https://www.npmjs.com/package/i18n-iso-util)
[![Build](https://github.com/AdiRishi/i18n-iso-util/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/AdiRishi/i18n-iso-util/actions/workflows/npm-publish.yml)
[![Coverage](https://codecov.io/gh/AdiRishi/i18n-iso-util/branch/master/graph/badge.svg?token=6NO2IVSSO0)](https://codecov.io/gh/AdiRishi/i18n-iso-util)

> [!WARNING]
> This project is temporarily on hold. I plan on re-writing this as a utility package combined with a worker for use within Cloudflare

## Install

```sh
npm install i18n-iso-util # Typescript types are included
```

## Getting Started

The `getCountry` function accepts alpha-2, alpha-3 and full name search input.

```typescript
import { getCountry } from 'i18n-iso-util';

/**
 * Accepts alpha-2, alpha-3 or full name input
 * NOTE: All inputs are compared via a case sensitive exact string match
 */
getCountry('IN'); // => {alpha2: 'IN', alpha3: 'IND', fullName: 'India', numericCode: '356'}
getCountry('IND'); // => {alpha2: 'IN', alpha3: 'IND', fullName: 'India', numericCode: '356'}
getCountry('India'); // => {alpha2: 'IN', alpha3: 'IND', fullName: 'India', numericCode: '356'}
```

For those who want to lookup codes with a specific use-case in mind, the library exposes the following functions.

```typescript
import {
  alpha2ToAlpha3,
  alpha2ToFullName,
  alpha3ToAlpha2,
  alpha3ToFullName,
  fullNameToAlpha2,
  fullNameToAlpha3,
} from 'i18n-iso-util';

// NOTE: All inputs are compared via a case sensitive exact string match

alpha2ToAlpha3('IN'); // => IND
alpha2ToFullName('IN'); // => India
alpha3ToAlpha2('IND'); // => IN
alpha3ToFullName('IND'); // => India
fullNameToAlpha2('India'); // => IN
fullNameToAlpha3('India'); // => IND
```

## Datasources

A core goal of this library is to auto-generate data from the original source for each published ISO standard.
This section aims to establish datasources for each standard in use.

### ISO 3166-1 Country Codes

[ISO-3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) is a standard defining codes for the names of countries.

These codes are maintained by the [International Organisation for Standardization (ISO)](https://www.iso.org/iso-3166-country-codes.htmlhttps://www.iso.org/home.html) on their [online portal](https://www.iso.org/obp/ui).

**NOTE**: ISO does not provide this data for free in any easily readable file format. Therefore, this library creates it's datasources through an automated web-scaper script found in [scripts/extract-iso-3166-1.ts](scripts/extract-iso-3166-1.ts)

## Upcoming Features

- Performance improvements for country lookup
- Fuzzy matching for full country names and case insensitive lookups
- Integrate [ISO-3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) to support country subdivisions
- Integrate [ISO-4217](https://www.iso.org/iso-4217-currency-codes.html) currency codes and suport lookup and standardized currencies by country
- Integrate [IANA time zone database](https://en.wikipedia.org/wiki/Tz_database) by parsing data directly from [the source](https://www.iana.org/time-zones). Support lookup by country code

## Credits

- Created and maintained by [@AdiRishi](https://github.com/AdiRishi/)
- Inspired by various country and currency lookup libraries like [node-i18n-iso-countries](https://github.com/michaelwittig/node-i18n-iso-countries) and [pycountry](https://pypi.org/project/pycountry/)
